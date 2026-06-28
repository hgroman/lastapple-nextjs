import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase, Code, Lightbulb, Users } from 'lucide-react';
import { BaseLayout } from '@/components/content/layouts/BaseLayout';

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: 'About | Last Apple Business Solutions',
  description: '30+ years of system integration. One operator. 17 AI agents. WordPress maintenance and AI services from La Palma, CA.',
  openGraph: {
    title: 'About | Last Apple Business Solutions',
    description: '30+ years of system integration meets a federated AI operations team.',
    type: 'website',
  },
};

const values = [
  {
    icon: Lightbulb,
    title: 'Disqualify Early',
    description: 'If this is not the right fit, we say so on the first call. Bad-fit engagements waste your money and our time.',
  },
  {
    icon: Code,
    title: 'The Work Is the Proof',
    description: 'No case studies stuffed with invented metrics. The Stream documents the actual work. Read it before you hire us.',
  },
  {
    icon: Users,
    title: 'Operator, Not Account Manager',
    description: 'You talk to Hank. The person doing the work is the person on the call. No layer of project managers translating.',
  },
  {
    icon: Briefcase,
    title: '30 Years of Skepticism',
    description: 'Three decades in contact centers, healthcare, and payments — environments where uptime is not negotiable. That discipline shows up in the work.',
  },
];

export default function AboutPage() {
  return (
    <BaseLayout maxWidth="lg" showGrid>
      {/* Header */}
      <header className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          About Last Apple
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A workshop. One operator with 30+ years of system integration. 17 AI agents doing the work that used to take a team.
        </p>
      </header>

      {/* Story Section */}
      <section className="mb-20">
        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-6">The Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Last Apple is not a marketing agency that bolted on AI. It is a systems integrator
              who now runs a federated team of 17 AI agents alongside him. The difference matters.
            </p>
            <p>
              Hank Groman spent three decades building integrations for contact centers, healthcare,
              and payment processing — environments where data loss, downtime, and silent failures
              have consequences. That background shapes how the work gets done here: every change is
              logged, every claim is verifiable, every report is reproducible.
            </p>
            <p>
              The AI layer is what makes the price point work. A federated team of Claude-driven
              agents handles the repeatable parts — security audits, content drafting, GA4 anomaly
              detection, redirect mapping, indexing API submissions. Hank handles the judgment
              calls. Together, the workshop ships work that previously required a five-person team.
            </p>
            <p>
              The work is documented in <Link href="/stream" className="text-primary hover:text-primary/80 underline underline-offset-4">The Stream</Link> —
              daily work logs, real failures, real fixes, the actual craft. If you want to know what
              hiring this workshop looks like, read The Stream before you book a call.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="mb-20 p-8 rounded-2xl glass">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-white">
            HG
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Hank Groman</h3>
            <p className="text-primary mb-4">Owner &amp; Operator</p>
            <p className="text-muted-foreground">
              30+ years in system integration — contact centers, healthcare, payment processing.
              Now running a 17-agent AI operations team out of a workshop in La Palma, California.
              Reachable by phone (949-529-9017), email, or a 30-minute scoping call.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
              <Link
                href="https://www.linkedin.com/in/hankgroman/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                LinkedIn →
              </Link>
              <Link
                href="mailto:hank@lastapple.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                hank@lastapple.com
              </Link>
              <Link
                href="tel:+19495299017"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                949-529-9017
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">How This Workshop Operates</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="p-6 rounded-xl bg-card/50 border border-border"
            >
              <value.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          One conversation. No sales funnel.
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          A 30-minute call. We look at your site, your analytics, and what you&apos;re trying to do.
          If the work makes sense, we scope it. If it doesn&apos;t, we&apos;ll tell you and point you somewhere better.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Book the Call
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </BaseLayout>
  );
}
