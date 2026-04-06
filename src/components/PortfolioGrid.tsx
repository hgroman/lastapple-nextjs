'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { clients } from '@/data/clients';

export function PortfolioGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client, i) => (
        <motion.a
          key={client.url}
          href={client.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
          whileHover={{ y: -4 }}
          className="group glass rounded-2xl overflow-hidden border-transparent hover:border-primary/20 transition-all duration-300"
        >
          {/* Screenshot */}
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <Image
              src={client.screenshot}
              alt={`${client.name} website screenshot`}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Info */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">{client.name}</h3>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            {/* Tags */}
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
      ))}
    </div>
  );
}
