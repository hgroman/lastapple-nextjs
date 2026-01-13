# Email Infrastructure Process for WordPress → Next.js Migration

**Version:** 1.0
**Created:** 2026-01-12
**Purpose:** Complete guide to setting up transactional email for Next.js contact forms
**Usage:** Follow this process for each WordPress site migration

---

## Overview

WordPress sites typically use plugins (Contact Form 7, WPForms, etc.) that handle email via the hosting provider's mail server. Next.js requires explicit email infrastructure setup.

**Recommended Provider:** AWS SES (if you have an AWS account)
- Cost-effective (free tier: 62,000 emails/month from EC2, $0.10/1000 after)
- No additional vendor accounts needed
- Production-ready with verified domains

**Alternative:** Resend, SendGrid, Postmark, Mailgun

---

## Prerequisites

- [ ] AWS account with console access
- [ ] Domain DNS access (for verification if needed)
- [ ] Next.js project with contact form component
- [ ] Vercel CLI installed and linked to project

---

## Step 1: AWS IAM User Setup

### 1.1 Create IAM User

1. Go to AWS Console → IAM → Users → Create user
2. **User name:** `ses-nextjs-[sitename]` (e.g., `ses-nextjs-lastapple`)
3. Click **Next**

### 1.2 Set Permissions

1. Select **Attach policies directly**
2. Search for and select: `AmazonSESFullAccess`
3. Click **Next** → **Create user**

### 1.3 Create Access Keys

1. Click on the newly created user
2. Go to **Security credentials** tab
3. Click **Create access key**
4. Select **Application running outside AWS**
5. Click **Next** → **Create access key**
6. **IMPORTANT:** Copy both values immediately:
   - Access key ID: `AKIA...`
   - Secret access key: `...` (shown only once!)

---

## Step 2: Check SES Account Status

### 2.1 Configure AWS CLI (if not already done)

```bash
# Install AWS CLI if needed
brew install awscli  # macOS

# Configure with the new credentials
aws configure --profile ses-[sitename]
# Enter: Access Key ID, Secret Access Key, Region (us-west-2), Output format (json)
```

### 2.2 Check SES Status

```bash
# Check if SES is in production mode
aws ses get-account-sending-enabled --profile ses-[sitename]
# Returns: {"Enabled": true} = production mode
# Returns: {"Enabled": false} = sandbox mode

# List verified identities (domains/emails)
aws ses list-identities --profile ses-[sitename]
```

### 2.3 If in Sandbox Mode

**Option A: Request Production Access**
1. AWS Console → SES → Account Dashboard
2. Click "Request production access"
3. Fill out use case (contact form, transactional emails)
4. Wait 24-48 hours for approval

**Option B: Verify Specific Emails (for testing)**
```bash
# Verify the recipient email for testing
aws ses verify-email-identity --email-address recipient@example.com --profile ses-[sitename]
# Check email and click verification link
```

### 2.4 Verify Domain (Recommended for Production)

If domain isn't already verified:

```bash
# Check current identities
aws ses list-identities --identity-type Domain --profile ses-[sitename]
```

If domain not listed:
1. AWS Console → SES → Verified identities → Create identity
2. Select "Domain"
3. Enter domain (e.g., `lastapple.com`)
4. Add the provided DNS records (DKIM, verification TXT)
5. Wait for verification (usually minutes to hours)

---

## Step 3: Create API Route

### 3.1 Install AWS SDK

```bash
npm install @aws-sdk/client-ses
```

### 3.2 Create Contact API Route

Create `src/app/api/contact/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { z } from 'zod';

// IMPORTANT: Lazy initialization for serverless environments
// Module-level initialization happens before env vars are available!
let sesClient: SESClient | null = null;

function getSESClient(): SESClient {
  if (!sesClient) {
    sesClient = new SESClient({
      region: process.env.AWS_REGION || 'us-west-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }
  return sesClient;
}

const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  website: z.string().optional(), // Honeypot field
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate
    const result = ContactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, message, website } = result.data;

    // Honeypot check
    if (website && website.length > 0) {
      console.log('Honeypot triggered - likely bot');
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Check credentials
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.error('AWS credentials not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    const fromEmail = process.env.SES_FROM_EMAIL || 'noreply@yourdomain.com';
    const toEmail = process.env.CONTACT_FORM_TO_EMAIL || 'contact@yourdomain.com';

    const command = new SendEmailCommand({
      Source: `Contact Form <${fromEmail}>`,
      Destination: { ToAddresses: [toEmail] },
      ReplyToAddresses: [email],
      Message: {
        Subject: {
          Data: `New Contact Form Submission from ${name}`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              <hr />
              <h3>Message:</h3>
              <p>${message.replace(/\n/g, '<br />')}</p>
            `,
            Charset: 'UTF-8',
          },
          Text: {
            Data: `Name: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ''}\nMessage:\n${message}`,
            Charset: 'UTF-8',
          },
        },
      },
    });

    const response = await getSESClient().send(command);

    return NextResponse.json(
      { success: true, messageId: response.MessageId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
```

### 3.3 Key Implementation Notes

**CRITICAL: Lazy Client Initialization**
```typescript
// WRONG - Client created at module load, env vars may be empty
const sesClient = new SESClient({ ... });

// RIGHT - Client created on first request when env vars are available
let sesClient: SESClient | null = null;
function getSESClient(): SESClient {
  if (!sesClient) {
    sesClient = new SESClient({ ... });
  }
  return sesClient;
}
```

---

## Step 4: Configure Environment Variables

### 4.1 Create Local Environment File

Create `.env.local` (never commit this file):

```bash
# AWS SES Configuration
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-west-2
SES_FROM_EMAIL=noreply@yourdomain.com
CONTACT_FORM_TO_EMAIL=contact@yourdomain.com
```

### 4.2 Update .env.example

Document required variables in `.env.example` (this IS committed):

```bash
# AWS SES (Email Service)
# Create IAM user with AmazonSESFullAccess policy
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-west-2
SES_FROM_EMAIL=noreply@yourdomain.com
CONTACT_FORM_TO_EMAIL=contact@yourdomain.com
```

### 4.3 Ensure .gitignore Protects Secrets

```gitignore
# env files
.env*
!.env.example
```

---

## Step 5: Test Locally

```bash
# Start dev server
npm run dev

# Test with curl
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "you@example.com", "message": "Test message from local development"}'

# Expected response:
# {"success":true,"messageId":"0101..."}
```

Check your inbox for the test email.

---

## Step 6: Deploy to Vercel

### 6.1 Install and Link Vercel CLI

```bash
# Install
npm install -g vercel

# Login
vercel login

# Link to existing project
vercel link --yes -p [project-name]
```

### 6.2 Add Environment Variables

**CRITICAL: Use `printf` not `echo` to avoid newline characters!**

```bash
# WRONG - echo adds newline, causes "Invalid region" errors
echo "us-west-2" | vercel env add AWS_REGION production

# RIGHT - printf does not add newline
printf "us-west-2" | vercel env add AWS_REGION production
```

Add all required variables:

```bash
printf "AKIA..." | vercel env add AWS_ACCESS_KEY_ID production
printf "your-secret-key" | vercel env add AWS_SECRET_ACCESS_KEY production
printf "us-west-2" | vercel env add AWS_REGION production
printf "noreply@yourdomain.com" | vercel env add SES_FROM_EMAIL production
printf "contact@yourdomain.com" | vercel env add CONTACT_FORM_TO_EMAIL production
```

### 6.3 Verify Variables

```bash
vercel env ls production
```

### 6.4 Deploy to Production

```bash
vercel --prod
```

---

## Step 7: Test Production

```bash
curl -X POST https://yourdomain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "you@example.com", "message": "Test message from production"}'

# Expected: {"success":true,"messageId":"..."}
```

---

## Troubleshooting

### Error: "Region not accepted: region=us-west-2\n"

**Cause:** Environment variable has trailing newline
**Fix:** Remove and re-add using `printf`:
```bash
vercel env rm AWS_REGION production --yes
printf "us-west-2" | vercel env add AWS_REGION production
vercel --prod
```

### Error: "Invalid character in header content [authorization]"

**Cause:** AWS credentials have trailing newlines
**Fix:** Remove and re-add all AWS credentials using `printf`

### Error: "Email service is not configured"

**Cause:** AWS credentials not set or not accessible
**Fix:**
1. Verify env vars exist: `vercel env ls production`
2. Redeploy: `vercel --prod`

### Error: "MessageRejected: Email address is not verified"

**Cause:** SES is in sandbox mode and recipient not verified
**Fix:**
1. Verify recipient email in SES console, OR
2. Request production access for SES account

### Error: "AccessDenied"

**Cause:** IAM user doesn't have SES permissions
**Fix:** Attach `AmazonSESFullAccess` policy to IAM user

### Email not received

1. Check spam folder
2. Verify SES sending is enabled: `aws ses get-account-sending-enabled`
3. Check SES console for bounces/complaints
4. Verify from address domain is verified in SES

---

## Quick Reference

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | IAM user access key | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key | `...` |
| `AWS_REGION` | SES region | `us-west-2` |
| `SES_FROM_EMAIL` | Verified sender address | `noreply@domain.com` |
| `CONTACT_FORM_TO_EMAIL` | Recipient address | `contact@domain.com` |

### Common AWS SES Regions

- `us-east-1` - N. Virginia
- `us-west-2` - Oregon
- `eu-west-1` - Ireland

### Verification Checklist

```markdown
## Email Infrastructure Checklist - [Site Name]

### AWS Setup
- [ ] IAM user created with AmazonSESFullAccess
- [ ] Access keys generated and saved securely
- [ ] SES account in production mode (or recipient verified)
- [ ] Domain verified in SES (for custom from address)

### Code
- [ ] @aws-sdk/client-ses installed
- [ ] API route created with lazy client initialization
- [ ] Zod validation implemented
- [ ] Honeypot field added

### Local Testing
- [ ] .env.local created with credentials
- [ ] Local test successful (messageId received)
- [ ] Email received in inbox

### Production
- [ ] Vercel CLI linked to project
- [ ] Env vars added with printf (NOT echo!)
- [ ] Production deployed
- [ ] Production test successful
- [ ] Email received from production
```

---

## Lessons Learned

1. **Lazy initialization is required** for serverless - module-level AWS client creation fails because env vars aren't available at module load time.

2. **Use `printf` not `echo`** when piping to Vercel CLI - echo adds newlines that corrupt credentials.

3. **Check SES sandbox status first** - sandbox mode only allows sending to verified emails.

4. **Domain verification enables professional from addresses** - without it, you're limited to SES test domains.

---

*This process was developed during the Last Apple migration and refined for reuse across 10+ planned site migrations.*
