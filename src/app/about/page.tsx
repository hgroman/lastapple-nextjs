import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase, Code, Lightbulb, Users } from 'lucide-react';
import { BaseLayout } from '@/components/content/layouts/BaseLayout';

export const metadata: Metadata = {
  title: 'About | Last Apple Business Solutions',
  description: '30+ years of system integration expertise. WordPress maintenance and AI-powered business solutions from La Palma, CA.',
  openGraph: {
    title: 'About | Last Apple Business Solutions',
    description: '30+ years of system integration expertise.',
    type: 'website',
  },
};

const values = [
  {
    icon: Lightbulb,
    title: 'Clarity Over Complexity',
    description: 'We cut through the noise. No jargon, no overengineering—just solutions that work.',
  },
  {
    icon: Code,
    title: 'Technology That Serves',
    description: 'Technology should make your life easier, not harder. We build tools you actually want to use.',
  },
  {
    icon: Users,
    title: 'Partnership, Not Vendorship',
    description: 'We succeed when you succeed. Every recommendation is made with your long-term interest in mind.',
  },
  {
    icon: Briefcase,
    title: 'Experience You Can Trust',
    description: 'Three decades in the trenches. Contact centers, healthcare, payments—we\'ve seen it all.',
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
          Helping businesses work smarter with technology since 1994.
        </p>
      </header>

      {/* Story Section */}
      <section className="mb-20">
        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-6">The Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Last Apple Business Solutions was founded by Hank Groman, a technologist with
              over 30 years of experience in system integration across contact centers,
              healthcare, and payment processing industries.
            </p>
            <p>
              After decades of building enterprise-scale solutions for large organizations,
              Hank recognized that small and mid-sized businesses were being left behind in
              the technology revolution. They needed the same level of expertise but couldn&apos;t
              afford dedicated IT departments or expensive consultants.
            </p>
            <p>
              Today, Last Apple bridges that gap. We bring enterprise-grade thinking to
              businesses of all sizes—whether that&apos;s keeping your WordPress site running
              smoothly or implementing AI solutions that transform how you work.
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
            <p className="text-primary mb-4">Founder & Principal Consultant</p>
            <p className="text-muted-foreground">
              30+ years in system integration. Specializing in contact center technology,
              healthcare systems, and payment processing. Based in La Palma, California.
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
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">What We Believe</h2>
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
          Ready to work together?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Whether you need help with WordPress, want to explore AI solutions,
          or just want to talk technology—I&apos;d love to hear from you.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Get in Touch
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </BaseLayout>
  );
}
