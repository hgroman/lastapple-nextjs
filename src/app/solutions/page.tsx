import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getSolutions } from '@/lib/content';
import { BaseLayout } from '@/components/content/layouts/BaseLayout';

export const metadata: Metadata = {
  title: 'Solutions | Last Apple Business Solutions',
  description: 'AI-powered solutions for business automation, data integration, and intelligent workflows.',
  openGraph: {
    title: 'Solutions | Last Apple Business Solutions',
    description: 'AI-powered solutions for business automation and intelligent workflows.',
    type: 'website',
  },
};

const categoryColors: Record<string, string> = {
  ai: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  integration: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  automation: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  data: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
};

export default function SolutionsPage() {
  const solutions = getSolutions();

  return (
    <BaseLayout maxWidth="xl" showOrbs>
      {/* Header */}
      <header className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-6">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">AI-Powered Solutions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Transform Your Business
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Custom AI solutions that automate workflows, integrate systems,
          and unlock insights from your data.
        </p>
      </header>

      {/* Solutions Grid */}
      {solutions.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            Solutions coming soon.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <article
              key={solution.slug}
              className="group relative flex flex-col bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 hover:border-accent/50 transition-all duration-300"
            >
              <Link href={`/solutions/${solution.slug}`} className="absolute inset-0 z-10" />

              {/* Number indicator */}
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold">
                {(index + 1).toString().padStart(2, '0')}
              </div>

              {/* Category badge */}
              <span className={`inline-flex self-start items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mb-4 ${categoryColors[solution.category] || 'bg-accent/10 text-accent border-accent/20'}`}>
                {solution.category.toUpperCase()}
              </span>

              {/* Title */}
              <h2 className="text-2xl font-semibold mb-3 group-hover:text-accent transition-colors">
                {solution.title}
              </h2>

              {/* Description */}
              <p className="text-muted-foreground mb-6 flex-1">
                {solution.description}
              </p>

              {/* Outcomes preview */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Key Outcomes
                </h3>
                <ul className="space-y-2">
                  {solution.outcomes.slice(0, 2).map((outcome) => (
                    <li key={outcome} className="text-sm text-muted-foreground pl-4 border-l-2 border-accent/30">
                      {outcome}
                    </li>
                  ))}
                  {solution.outcomes.length > 2 && (
                    <li className="text-sm text-accent">
                      +{solution.outcomes.length - 2} more outcomes
                    </li>
                  )}
                </ul>
              </div>

              {/* Case study teaser */}
              {solution.caseStudy && (
                <div className="p-4 rounded-xl bg-muted/30 border border-border mb-6">
                  <p className="text-sm text-muted-foreground italic line-clamp-2">
                    &ldquo;{solution.caseStudy.outcome}&rdquo;
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    — {solution.caseStudy.client}
                  </p>
                </div>
              )}

              {/* Arrow */}
              <div className="flex items-center justify-end">
                <span className="text-sm font-medium text-accent group-hover:underline">
                  Learn more
                </span>
                <ArrowRight className="h-4 w-4 ml-2 text-accent group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <section className="mt-20 p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-accent/10 to-primary/10 border border-border text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Have a unique challenge?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          We build custom AI solutions tailored to your specific business needs.
          Let&apos;s explore what&apos;s possible.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
        >
          Discuss Your Project
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </BaseLayout>
  );
}
