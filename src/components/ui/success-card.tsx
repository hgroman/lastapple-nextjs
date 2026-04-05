'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';

export interface SuccessCardProps {
  name: string;
  industry: string;
  logo: string;
  result: string;
  description: string;
  tags: string[];
  href?: string;
  index?: number;
}

export function SuccessCard({
  name,
  industry,
  logo,
  result,
  description,
  tags,
  href,
  index = 0,
}: SuccessCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group glass rounded-3xl p-8 border-transparent hover:border-primary/20 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-6">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg font-bold text-primary">
            {logo}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <span className="text-sm text-muted-foreground">{industry}</span>
          </div>
        </div>
        {href && (
          <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </div>

      {/* Result */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-4 w-4 text-accent fill-accent" />
          <span className="text-sm font-medium text-accent">Key Result</span>
        </div>
        <div className="text-2xl font-bold gradient-text">{result}</div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-6">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
