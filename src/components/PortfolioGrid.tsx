'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { clients } from '@/data/clients';

function PortfolioCard({ client, index }: { client: typeof clients[number]; index: number }) {
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
    <motion.a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -4 }}
      className="group glass rounded-2xl overflow-hidden border-transparent hover:border-primary/20 transition-all duration-300"
    >
      <div
        ref={containerRef}
        className="relative aspect-[16/10] overflow-hidden bg-muted"
        style={{ '--card-height': `${cardHeight}px` } as React.CSSProperties}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={client.screenshot}
          alt={`${client.name} website screenshot`}
          className="portfolio-screenshot"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">{client.name}</h3>
          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className="flex flex-wrap gap-2">
          {client.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export function PortfolioGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client, i) => (
        <PortfolioCard key={client.url} client={client} index={i} />
      ))}
    </div>
  );
}
