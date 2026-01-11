import { Metadata } from 'next';
import Link from 'next/link';
import { BaseLayout } from '@/components/content/layouts/BaseLayout';

export const metadata: Metadata = {
  title: 'Terms of Service | Last Apple Business Solutions',
  description: 'Terms of service for Last Apple Business Solutions. Read our terms and conditions for using our services.',
};

export default function TermsPage() {
  return (
    <BaseLayout maxWidth="md" showGrid>
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
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
        prose-strong:text-foreground
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline">

        <h2>Agreement to Terms</h2>
        <p>
          By accessing or using the services provided by Last Apple Business Solutions
          (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), you agree to be bound by these
          Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>

        <h2>Services</h2>
        <p>
          Last Apple Business Solutions provides technology consulting, WordPress maintenance,
          AI-powered solutions, and system integration services. Specific terms for individual
          services are outlined in separate service agreements.
        </p>

        <h2>Client Responsibilities</h2>
        <p>When engaging our services, you agree to:</p>
        <ul>
          <li>Provide accurate and complete information as requested</li>
          <li>Maintain the confidentiality of any account credentials</li>
          <li>Ensure you have the right to share any materials or access provided</li>
          <li>Pay for services according to agreed-upon terms</li>
          <li>Communicate in a timely manner regarding project requirements</li>
        </ul>

        <h2>Intellectual Property</h2>

        <h3>Our Work Product</h3>
        <p>
          Upon full payment, you own the deliverables we create specifically for you.
          We retain the right to use general techniques, ideas, and methodologies
          developed during our engagement.
        </p>

        <h3>Third-Party Materials</h3>
        <p>
          Some solutions may include third-party software, plugins, or services.
          These are subject to their respective licenses and terms.
        </p>

        <h2>Confidentiality</h2>
        <p>
          We treat all client information as confidential and will not disclose it
          to third parties without your consent, except as required by law or as
          necessary to provide our services.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Last Apple Business Solutions shall
          not be liable for any indirect, incidental, special, consequential, or
          punitive damages, including but not limited to loss of profits, data, or
          business opportunities.
        </p>
        <p>
          Our total liability for any claim arising from our services shall not exceed
          the amount paid by you for the specific service giving rise to the claim.
        </p>

        <h2>Warranties and Disclaimers</h2>
        <p>
          We provide our services on an &ldquo;as is&rdquo; basis. While we strive for excellence,
          we do not guarantee that our services will be error-free or uninterrupted.
        </p>
        <p>
          For WordPress maintenance clients, we are not responsible for issues caused
          by third-party plugins, themes, or hosting providers beyond our control.
        </p>

        <h2>Termination</h2>
        <p>
          Either party may terminate ongoing service agreements with 30 days written notice,
          unless otherwise specified in a service agreement. Upon termination, you remain
          responsible for payment of all services rendered.
        </p>

        <h2>Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws
          of the State of California, without regard to conflict of law principles.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will notify active
          clients of material changes. Continued use of our services after changes
          constitutes acceptance of the modified Terms.
        </p>

        <h2>Contact Information</h2>
        <p>
          For questions about these Terms, please contact us:
        </p>
        <ul>
          <li>Email: hank@lastapple.com</li>
          <li>Phone: 714-813-9973</li>
          <li>
            <Link href="/contact">Contact Page</Link>
          </li>
        </ul>
      </article>
    </BaseLayout>
  );
}
