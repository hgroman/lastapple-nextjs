import { JournalHero } from '@/components/JournalHero';
import { JournalStream } from '@/components/JournalStream';
import { SkiesSection } from '@/components/SkiesSection';
import { SolutionsGrid } from '@/components/SolutionsGrid';
import { PricingSection } from '@/components/PricingSection';
import { ClientsPortfolio } from '@/components/ClientsPortfolio';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';
import { getStreamPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: { absolute: "AI-Driven Digital Marketing & System Integration | Last Apple" },
  description: "AI-driven digital marketing backed by 30 years of system integration. Last Apple turns AI into real business results — with WordPress that actually works.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const streamPosts = getStreamPosts();
  const latestPost = streamPosts[0];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero - Journal Style */}
      <JournalHero latestPost={latestPost} />

      {/* The Stream */}
      <JournalStream posts={streamPosts.slice(0, 4)} />

      {/* Live-Scored Skies — the aerial line of business, directly below The
          Stream so the site says out loud that Last Apple does more than code. */}
      <SkiesSection />

      {/* Solutions Portfolio */}
      <SolutionsGrid />

      {/* Pricing */}
      <PricingSection />

      {/* Client Portfolio */}
      <ClientsPortfolio />

      {/* Footer */}
      <Footer />
    </div>
  );
}
