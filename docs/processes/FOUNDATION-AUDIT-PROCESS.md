# Foundation Audit Process for WordPress → Next.js Migration

**Version:** 1.0
**Created:** 2026-01-12
**Purpose:** Repeatable process for auditing and fixing foundation infrastructure
**Usage:** Run this process for each WordPress site migration (10+ sites planned)

---

## Overview

After completing the WordPress audit (SEO, images, plugins), this process identifies and fixes foundation gaps in the Next.js implementation before content migration begins.

**Time estimate:** 2-3 hours per site
**Output:**
- `docs/FOUNDATION-GAPS.yaml` (audit results)
- Working contact form, favicon, 404 page, footer

---

## Prerequisites

Before starting:
- [ ] WordPress audit complete (SEO, images, plugins, internal links)
- [ ] Next.js app deployed to Vercel (or ready to deploy)
- [ ] Access to domain DNS (for email domain verification)
- [ ] Logo assets available

---

## Step 1: Audit Current State

Run these checks against the Next.js implementation:

### 1.1 Email/Contact Form
```bash
# Check if contact API route exists
ls -la src/app/api/contact/

# Check if .env.local exists
ls -la .env.local

# Check .env.example for required vars
cat .env.example | grep -i resend
```

Questions to answer:
- Does contact form exist?
- Is API route implemented?
- Is email service configured?
- Has it been tested?

### 1.2 Favicon & Branding
```bash
# Check for favicon files
ls -la public/favicon* public/apple-touch-icon* public/site.webmanifest

# Check layout.tsx for icon metadata
grep -A 10 "icons:" src/app/layout.tsx
```

Questions to answer:
- Does favicon.ico exist?
- Are all sizes present (16, 32, 180)?
- Is manifest configured?

### 1.3 Error Pages
```bash
# Check for custom error pages
ls -la src/app/not-found.tsx src/app/error.tsx
```

Questions to answer:
- Does custom 404 exist?
- Does error boundary exist?
- Do they match site design?

### 1.4 Footer Component
```bash
# Check footer for common issues
grep -E "href=\"/[^\"]+\"" src/components/Footer.tsx
```

Questions to answer:
- Do all links resolve to real pages?
- Is logo path correct?
- Are social links present?
- Do social links match WordPress data?

### 1.5 Schema/SEO
```bash
# Check JSON-LD
grep -A 30 "jsonLd" src/app/layout.tsx

# Check for OG image
ls -la public/og-image*
```

Questions to answer:
- Is JSON-LD present?
- Do social links match WordPress?
- Is OG image configured?

---

## Step 2: Document Gaps

Create `docs/FOUNDATION-GAPS.yaml` with findings:

```yaml
# Foundation Gaps - [Site Name]
# Generated: [DATE]

critical:  # P0 - Must fix
  email_not_working:
    status: BROKEN|WORKING|NOT_IMPLEMENTED
    issues: []

  favicon_missing:
    status: MISSING|PARTIAL|COMPLETE
    issues: []

  not_found_page_missing:
    status: MISSING|EXISTS
    issues: []

high:  # P1 - Fix before go-live
  footer_broken_links:
    status: BROKEN|OK
    issues: []

  social_links_missing:
    status: MISSING|PARTIAL|COMPLETE
    issues: []

medium:  # P2 - During migration
  og_image_missing:
    status: MISSING|EXISTS
    issues: []

environment_variables:
  # List required env vars and their status
```

---

## Step 3: Fix Email Infrastructure

**See full guide:** `docs/processes/EMAIL-INFRASTRUCTURE-PROCESS.md`

### 3.1 Quick Setup (AWS SES)

1. Create IAM user with `AmazonSESFullAccess` policy
2. Create access keys
3. Check SES status (sandbox vs production)
4. Install `@aws-sdk/client-ses`
5. Create API route with **lazy client initialization**

### 3.2 Configure Environment

```bash
# Create .env.local (never commit this file)
cat << 'EOF' > .env.local
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-west-2
SES_FROM_EMAIL=noreply@yourdomain.com
EOF
```

### 3.3 Deploy to Vercel

**CRITICAL: Use `printf` not `echo` to avoid newline characters!**

```bash
# WRONG - causes "Invalid region" errors
echo "us-west-2" | vercel env add AWS_REGION production

# RIGHT
printf "us-west-2" | vercel env add AWS_REGION production
```

Add all credentials:
```bash
printf "AKIA..." | vercel env add AWS_ACCESS_KEY_ID production
printf "secret..." | vercel env add AWS_SECRET_ACCESS_KEY production
printf "us-west-2" | vercel env add AWS_REGION production
printf "noreply@domain.com" | vercel env add SES_FROM_EMAIL production
```

### 3.4 Domain Verification (Production)

For professional "from" address:
1. In email service dashboard, add domain
2. Add DNS records:
   - TXT record for domain verification
   - CNAME for DKIM signing
3. Wait for verification
4. Update API route from address

### 3.4 Test

```bash
npm run dev
# Navigate to /contact
# Submit test form
# Check inbox (and spam folder)
```

---

## Step 4: Generate Brand Assets

### 4.1 Favicon Suite

**Tool:** https://realfavicongenerator.net

1. Upload logo image (square, high-res)
2. Configure settings:
   - Background color: site background
   - iOS: choose appropriate style
   - Android: configure theme color
3. Download package
4. Extract to `/public/`

**Required files:**
- `favicon.ico` (multi-size)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `site.webmanifest`

### 4.2 Update Layout

Add to `src/app/layout.tsx` metadata:

```typescript
export const metadata: Metadata = {
  // ... existing
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/site.webmanifest',
};
```

### 4.3 Create OG Image

**Dimensions:** 1200x630px

**Content:**
- Logo
- Site name
- Tagline or value proposition
- Brand colors

**Tools:** Canva, Figma, or image editor

Save as `/public/og-image.png`

---

## Step 5: Create Error Pages

### 5.1 Custom 404 Page

Create `src/app/not-found.tsx`:

```typescript
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl mt-4">Page Not Found</h2>
        <p className="text-muted-foreground mt-2">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-lg"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
```

### 5.2 Error Boundary (Optional)

Create `src/app/error.tsx`:

```typescript
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl">Something went wrong</h2>
        <button onClick={reset} className="mt-4 px-4 py-2 bg-primary text-white rounded">
          Try again
        </button>
      </div>
    </div>
  );
}
```

---

## Step 6: Fix Footer

### 6.1 Correct Broken Links

Map WordPress paths to Next.js paths using `INTERNAL-LINKS.yaml`:

```typescript
// Before
<Link href="/services/wordpress-care">

// After (from url_mapping)
<Link href="/services/wordpress-maintenance">
```

### 6.2 Fix Logo Reference

```typescript
// Check what logo files exist
// Use correct path
<Image src="/logo-small.png" ... />
```

### 6.3 Add Social Links

Use data from `PLUGIN-INVENTORY.yaml`:

```typescript
const socialLinks = [
  { name: 'Facebook', href: '...', icon: Facebook },
  { name: 'Twitter', href: '...', icon: Twitter },
  // etc.
];

// Render in footer
<div className="flex gap-4">
  {socialLinks.map(link => (
    <a key={link.name} href={link.href} target="_blank" rel="noopener">
      <link.icon className="h-5 w-5" />
    </a>
  ))}
</div>
```

---

## Step 7: Update Schema

### 7.1 Sync JSON-LD with WordPress Data

In `src/app/layout.tsx`, update `sameAs` array to match `PLUGIN-INVENTORY.yaml`:

```typescript
sameAs: [
  // Copy from settings.social_accounts in PLUGIN-INVENTORY.yaml
],
```

### 7.2 Add OG Image

```typescript
openGraph: {
  images: [{
    url: '/og-image.png',
    width: 1200,
    height: 630,
    alt: 'Site Name',
  }],
},
```

### 7.3 Validate

Test at: https://search.google.com/test/rich-results

---

## Step 8: Verify Everything

### Verification Checklist

```markdown
## Foundation Verification - [Site Name]

### Email
- [ ] .env.local exists with API key
- [ ] Contact form submits
- [ ] Email received
- [ ] Reply-to works

### Branding
- [ ] Favicon in browser tab
- [ ] Apple touch icon (test iOS)
- [ ] Logo in footer
- [ ] Logo in nav

### Pages
- [ ] 404 shows custom page
- [ ] All footer links work
- [ ] Social links work

### SEO
- [ ] JSON-LD validates
- [ ] OG image in social previews
- [ ] No console errors

### Build
- [ ] npm run build passes
- [ ] npm run lint passes
```

---

## Quick Reference

### Required Files Checklist
```
public/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── site.webmanifest
├── og-image.png
└── logo files...

src/app/
├── not-found.tsx
├── error.tsx (optional)
└── layout.tsx (with icons metadata)

.env.local (not committed)
└── AWS_ACCESS_KEY_ID=...      (for AWS SES)
└── AWS_SECRET_ACCESS_KEY=...
└── AWS_REGION=...
└── SES_FROM_EMAIL=...
# OR
└── RESEND_API_KEY=...         (for Resend)
```

### Common Issues

**Email not sending (AWS SES):**
- Check credentials are correct in .env.local
- Verify SES is in production mode (not sandbox)
- Check domain/email is verified in SES Console
- Check CloudWatch logs for SES errors
- Ensure IAM user has AmazonSESFullAccess

**Email not sending (Resend):**
- Check API key is correct
- Check Resend dashboard for errors
- Verify domain if using custom from address

**Favicon not showing:**
- Hard refresh (Cmd+Shift+R)
- Check file paths in metadata
- Clear browser cache

**404 not custom:**
- File must be named `not-found.tsx` exactly
- Must be in `src/app/` directory
- Rebuild after adding

---

## Checklist for Future Sites

```markdown
## Foundation Audit Checklist - [Site Name]

### Audit
- [ ] Email infrastructure checked
- [ ] Favicon files checked
- [ ] Error pages checked
- [ ] Footer links verified
- [ ] Social links verified
- [ ] Schema checked

### Fixes Applied
- [ ] Email service configured
- [ ] .env.local created
- [ ] Favicon suite generated
- [ ] 404 page created
- [ ] Footer links corrected
- [ ] Social icons added
- [ ] Schema updated
- [ ] OG image created

### Verification
- [ ] Contact form tested
- [ ] All links work
- [ ] Build passes
- [ ] Deployed to Vercel
- [ ] Production tested

### Sign-off
- [ ] Reviewed by: __________
- [ ] Date: __________
```

---

## Related Documents

- `FOUNDATION-GAPS.yaml` - Gap analysis output
- `PLUGIN-INVENTORY.yaml` - Social links source
- `INTERNAL-LINKS.yaml` - URL mappings for footer
- `WORK-ORDER-FOUNDATION.md` - Current site work order

---

*This process was developed during the Last Apple migration and refined for reuse across 10+ planned site migrations.*
