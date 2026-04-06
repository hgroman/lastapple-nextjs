import { Metadata } from 'next';
import { BaseLayout } from '@/components/content/layouts/BaseLayout';
import { PortfolioGrid } from '@/components/PortfolioGrid';

export const metadata: Metadata = {
  title: 'Portfolio | Last Apple Business Solutions',
  description: 'WordPress, AI, SaaS, and automation — explore the sites we build and maintain for businesses across industries.',
  openGraph: {
    title: 'Portfolio | Last Apple Business Solutions',
    description: 'WordPress, AI, SaaS, and automation — sites we build and maintain.',
    type: 'website',
  },
};

export default function PortfolioPage() {
  return (
    <BaseLayout maxWidth="lg" showGrid>
      <header className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Our <span className="gradient-text">Portfolio</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          From WordPress builds to AI-powered platforms.
        </p>
      </header>

      <PortfolioGrid />
    </BaseLayout>
  );
}
