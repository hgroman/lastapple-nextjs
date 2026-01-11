import { Metadata } from 'next';
import { BaseLayout } from '@/components/content/layouts/BaseLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Last Apple Business Solutions',
  description: 'Privacy policy for Last Apple Business Solutions. Learn how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <BaseLayout maxWidth="md" showGrid>
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Last updated: January 11, 2026
        </p>
      </header>

      <article className="prose prose-invert prose-lg max-w-none
        prose-headings:font-semibold
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-li:text-muted-foreground
        prose-strong:text-foreground">

        <h2>Introduction</h2>
        <p>
          Last Apple Business Solutions (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy
          and is committed to protecting your personal information. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when you visit our website
          lastapple.com or use our services.
        </p>

        <h2>Information We Collect</h2>

        <h3>Information You Provide</h3>
        <p>We may collect information you voluntarily provide, including:</p>
        <ul>
          <li>Name and contact information (email, phone number)</li>
          <li>Business information related to services you request</li>
          <li>Communications and correspondence with us</li>
          <li>Any other information you choose to provide</li>
        </ul>

        <h3>Automatically Collected Information</h3>
        <p>When you visit our website, we may automatically collect:</p>
        <ul>
          <li>Device and browser information</li>
          <li>IP address and general location</li>
          <li>Pages visited and time spent on pages</li>
          <li>Referring website or source</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Respond to your inquiries and requests</li>
          <li>Send relevant communications about our services</li>
          <li>Analyze website usage and improve user experience</li>
          <li>Protect against fraud and unauthorized access</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>
          We do not sell, trade, or rent your personal information to third parties.
          We may share information only in the following circumstances:
        </p>
        <ul>
          <li>With service providers who assist in our operations</li>
          <li>When required by law or legal process</li>
          <li>To protect our rights, privacy, safety, or property</li>
          <li>With your consent</li>
        </ul>

        <h2>Analytics</h2>
        <p>
          We use analytics services (such as Google Analytics and Microsoft Clarity) to
          understand how visitors use our website. These services collect information
          about your use of our site and help us improve the user experience.
        </p>

        <h2>Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt out of marketing communications</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement reasonable security measures to protect your information. However,
          no method of transmission over the internet is 100% secure, and we cannot
          guarantee absolute security.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or our privacy practices,
          please contact us at:
        </p>
        <ul>
          <li>Email: hank@lastapple.com</li>
          <li>Phone: 714-813-9973</li>
        </ul>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of
          any changes by posting the new Privacy Policy on this page and updating the
          &ldquo;Last updated&rdquo; date.
        </p>
      </article>
    </BaseLayout>
  );
}
