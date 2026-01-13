import { NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { z } from 'zod';
import { escapeHtml } from '@/lib/sanitize';

// Lazy initialization - create client only when needed with current env vars
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

    // Validate the request body
    const result = ContactFormSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    const { name, email, phone, message, website } = result.data;

    // Honeypot check - if filled, it's likely a bot
    if (website && website.length > 0) {
      // Silently accept but don't send - bot doesn't know it failed
      console.log('Honeypot triggered - likely bot submission');
      return NextResponse.json(
        { success: true },
        { status: 200 }
      );
    }

    // Check if AWS credentials are configured
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.error('AWS credentials are not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Escape all user inputs to prevent HTML injection
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : '';
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    const fromEmail = process.env.SES_FROM_EMAIL || 'noreply@lastapple.com';

    // Send email via AWS SES
    const command = new SendEmailCommand({
      Source: `Last Apple Contact <${fromEmail}>`,
      Destination: {
        ToAddresses: ['hank@lastapple.com'],
      },
      ReplyToAddresses: [email],
      Message: {
        Subject: {
          Data: `New Contact Form Submission from ${safeName}`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ''}
              <hr />
              <h3>Message:</h3>
              <p>${safeMessage}</p>
              <hr />
              <p style="color: #666; font-size: 12px;">
                This message was sent from the contact form at lastapple.com
              </p>
            `,
            Charset: 'UTF-8',
          },
          Text: {
            Data: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

Message:
${message}

---
This message was sent from the contact form at lastapple.com
            `,
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
