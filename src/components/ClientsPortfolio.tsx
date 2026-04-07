'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { clients } from '@/data/clients';
import { RevealOnScroll } from './RevealOnScroll';

const featured = clients.filter((c) => c.featured);

function FeaturedCard({ client, index }: { client: typeof clients[number]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setCardHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <RevealOnScroll delay={index * 80}>
      <a
        href={client.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group glass rounded-2xl overflow-hidden border-transparent hover:border-primary/20 transition-all duration-300 block hover:-translate-y-1"
      >
        <div
          ref={containerRef}
          className="relative aspect-[16/10] overflow-hidden bg-muted"
          style={{ '--card-height': `${cardHeight}px` } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={client.screenshot}
            alt={`${client.name} website`}
            className="portfolio-screenshot"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{client.name}</h3>
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
      </a>
    </RevealOnScroll>
  );
}

export function ClientsPortfolio() {
  return (
    <section id="clients" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-3 block">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Client <span className="gradient-text">Work.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            30+ years of system integration expertise meeting bleeding-edge AI.
            WordPress, automation, data pipelines, and everything in between.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featured.map((client, i) => (
            <FeaturedCard key={client.url} client={client} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View Full Portfolio
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
