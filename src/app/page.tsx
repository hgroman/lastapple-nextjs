import { JournalHero } from '@/components/JournalHero';
import { JournalStream } from '@/components/JournalStream';
import { SolutionsGrid } from '@/components/SolutionsGrid';
import { PricingSection } from '@/components/PricingSection';
import { ClientsPortfolio } from '@/components/ClientsPortfolio';
import { Footer } from '@/components/Footer';
import { getStreamPosts } from '@/lib/content';

export default function Home() {
  const streamPosts = getStreamPosts();
  const latestPost = streamPosts[0];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero - Journal Style */}
      <JournalHero latestPost={latestPost} />

      {/* The Stream */}
      <JournalStream posts={streamPosts.slice(0, 4)} />

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
