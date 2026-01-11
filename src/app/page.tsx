import { JournalHero } from '@/components/JournalHero';
import { JournalStream } from '@/components/JournalStream';
import { SolutionsSection } from '@/components/SolutionsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { getStreamPosts, getServices, getSolutions } from '@/lib/content';

export default function Home() {
  const streamPosts = getStreamPosts();
  const services = getServices();
  const solutions = getSolutions();
  const latestPost = streamPosts[0];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero - Journal Style */}
      <JournalHero latestPost={latestPost} />

      {/* The Stream */}
      <JournalStream posts={streamPosts.slice(0, 4)} />

      {/* Solutions */}
      <SolutionsSection solutions={solutions} />

      {/* Services */}
      <ServicesSection services={services} />

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-background to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

        <div className="relative z-10 container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to <span className="gradient-text">transform</span> your business?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Let&apos;s discuss how we can help you leverage AI and modern technology
              to grow your business.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] text-white shadow-lg hover:shadow-primary/30 transition-all"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
