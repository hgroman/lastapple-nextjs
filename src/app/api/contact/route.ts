import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { escapeHtml } from '@/lib/sanitize';

// Lazy initialization to avoid build-time errors
let resend: Resend | null = null;

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
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

    // Check if API key is configured
    const resendClient = getResend();
    if (!resendClient) {
      console.error('RESEND_API_KEY is not configured');
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

    // Send email via Resend
    const { data, error } = await resendClient.emails.send({
      from: 'Last Apple Contact <onboarding@resend.dev>',
      to: ['hank@lastapple.com'],
      replyTo: email,
      subject: `New Contact Form Submission from ${safeName}`,
      html: `
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
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

Message:
${message}

---
This message was sent from the contact form at lastapple.com
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
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
