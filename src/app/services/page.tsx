import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { getServices } from '@/lib/content';
import { BaseLayout } from '@/components/content/layouts/BaseLayout';

export const metadata: Metadata = {
  title: 'Services | Last Apple Business Solutions',
  description: 'WordPress maintenance, AI-powered solutions, and system integration services for growing businesses.',
  openGraph: {
    title: 'Services | Last Apple Business Solutions',
    description: 'WordPress maintenance, AI-powered solutions, and system integration services.',
    type: 'website',
  },
};

const categoryColors: Record<string, string> = {
  wordpress: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  ai: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  integration: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <BaseLayout maxWidth="xl" showOrbs>
      {/* Header */}
      <header className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Our Services
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          From WordPress maintenance to AI-powered automation, we help businesses
          work smarter with technology that actually delivers.
        </p>
      </header>

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            Services coming soon.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <article
              key={service.slug}
              className="group relative flex flex-col bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <Link href={`/services/${service.slug}`} className="absolute inset-0 z-10" />

              {/* Category badge */}
              <span className={`inline-flex self-start items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mb-4 ${categoryColors[service.category] || 'bg-primary/10 text-primary border-primary/20'}`}>
                {service.category.toUpperCase()}
              </span>

              {/* Title */}
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h2>

              {/* Description */}
              <p className="text-muted-foreground mb-6 flex-1">
                {service.description}
              </p>

              {/* Features preview */}
              <ul className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
                {service.features.length > 3 && (
                  <li className="text-sm text-muted-foreground pl-6">
                    +{service.features.length - 3} more
                  </li>
                )}
              </ul>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                {service.pricing?.starting ? (
                  <div>
                    <span className="text-sm text-muted-foreground">From </span>
                    <span className="text-lg font-bold gradient-text">${service.pricing.starting}</span>
                    <span className="text-sm text-muted-foreground">{service.pricing.unit || '/mo'}</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Custom pricing</span>
                )}
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </article>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <section className="mt-20 p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Not sure which service you need?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Let&apos;s talk about your specific challenges. We&apos;ll help you find the right solution.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Schedule a Consultation
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </BaseLayout>
  );
}
