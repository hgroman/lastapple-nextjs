import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StreamCard } from '@/components/StreamCard';
import { getStreamPosts, getServices, getSolutions } from '@/lib/content';

export default function Home() {
  const streamPosts = getStreamPosts();
  const services = getServices();
  const solutions = getSolutions();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Building the future of{' '}
              <span className="text-primary">digital business</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              30 years of system integration expertise. AI-powered solutions.
              WordPress that actually works. Follow the journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/stream">
                  Read the Stream
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Let&apos;s Talk</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Stream - Featured */}
      <section className="py-16 bg-accent/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">The Stream</h2>
              <p className="text-muted-foreground">Daily work, experiments, and discoveries</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/stream">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {streamPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {streamPosts.slice(0, 3).map((post) => (
                <StreamCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>The stream is just beginning. First post coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Services</h2>
              <p className="text-muted-foreground">How we can help your business</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/services">
                All services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {services.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 3).map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group block p-6 rounded-lg border bg-card transition-colors hover:bg-accent/50"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  {service.priceStarting && (
                    <p className="text-sm">
                      Starting at <span className="font-semibold">${service.priceStarting}/mo</span>
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Services coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Solutions Preview */}
      <section className="py-16 bg-accent/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Solutions</h2>
              <p className="text-muted-foreground">AI-powered tools and integrations</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/solutions">
                All solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {solutions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {solutions.slice(0, 4).map((solution) => (
                <Link
                  key={solution.slug}
                  href={`/solutions/${solution.slug}`}
                  className="group block p-6 rounded-lg border bg-card transition-colors hover:bg-accent/50"
                >
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    {solution.category}
                  </span>
                  <h3 className="text-lg font-semibold mt-2 group-hover:text-primary">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">{solution.description}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Solutions coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your business?</h2>
            <p className="text-muted-foreground mb-8">
              Let&apos;s discuss how we can help you leverage AI and modern technology
              to grow your business.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
