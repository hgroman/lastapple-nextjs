import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';
import { BaseLayout } from '@/components/content/layouts/BaseLayout';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | Last Apple Business Solutions',
  description: 'Get in touch with Last Apple Business Solutions. Based in La Palma, CA. Call 714-813-9973 or email hank@lastapple.com.',
  openGraph: {
    title: 'Contact | Last Apple Business Solutions',
    description: 'Get in touch with Last Apple Business Solutions.',
    type: 'website',
  },
};

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hank@lastapple.com',
    href: 'mailto:hank@lastapple.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '714-813-9973',
    href: 'tel:+17148139973',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'La Palma, California',
    href: null,
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hankgroman/',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/LastAppleConsulting',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/hjgroman/',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UC3OPbkyTemkxPwFNvIhHu2g',
  },
];

export default function ContactPage() {
  return (
    <BaseLayout maxWidth="lg" showGrid>
      {/* Header */}
      <header className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Get in Touch
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have a question or want to discuss a project?
          I&apos;d love to hear from you.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-8">Contact Information</h2>

          {/* Contact Methods */}
          <div className="space-y-6 mb-12">
            {contactMethods.map((method) => (
              <div key={method.label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <method.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{method.label}</p>
                  {method.href ? (
                    <Link
                      href={method.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {method.value}
                    </Link>
                  ) : (
                    <p className="text-lg font-medium">{method.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect with me</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8 rounded-2xl bg-card/50 border border-border">
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </BaseLayout>
  );
}
