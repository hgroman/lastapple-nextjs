'use client';

import { motion } from 'framer-motion';
import { Quote, ArrowRight, Building2 } from 'lucide-react';
import Link from 'next/link';

interface CaseStudyProps {
  client: string;
  industry?: string;
  challenge: string;
  solution: string;
  outcome: string;
  quote?: {
    text: string;
    author: string;
    role?: string;
  };
  metrics?: Array<{
    value: string;
    label: string;
  }>;
  link?: {
    text: string;
    href: string;
  };
  /** Visual style */
  variant?: 'card' | 'full' | 'compact';
}

export function CaseStudy({
  client,
  industry,
  challenge,
  solution,
  outcome,
  quote,
  metrics,
  link,
  variant = 'card',
}: CaseStudyProps) {
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-xl bg-card/50 border border-border"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{client}</h3>
            {industry && (
              <p className="text-xs text-muted-foreground mb-2">{industry}</p>
            )}
            <p className="text-sm text-muted-foreground">{outcome}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'full') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{client}</h2>
            {industry && (
              <p className="text-sm text-muted-foreground">{industry}</p>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="p-6 rounded-xl bg-card/50 border border-border">
            <h3 className="text-sm font-medium text-primary mb-2">Challenge</h3>
            <p className="text-muted-foreground">{challenge}</p>
          </div>
          <div className="p-6 rounded-xl bg-card/50 border border-border">
            <h3 className="text-sm font-medium text-accent mb-2">Solution</h3>
            <p className="text-muted-foreground">{solution}</p>
          </div>
          <div className="p-6 rounded-xl bg-card/50 border border-border">
            <h3 className="text-sm font-medium text-green-500 mb-2">Outcome</h3>
            <p className="text-muted-foreground">{outcome}</p>
          </div>
        </div>

        {/* Metrics */}
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center"
              >
                <div className="text-2xl font-bold gradient-text">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quote */}
        {quote && (
          <div className="p-8 rounded-2xl glass border-primary/20 mb-8">
            <Quote className="h-8 w-8 text-primary/30 mb-4" />
            <blockquote className="text-lg italic text-foreground mb-4">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <div className="text-sm text-muted-foreground">
              &mdash; {quote.author}
              {quote.role && <span>, {quote.role}</span>}
            </div>
          </div>
        )}

        {/* Link */}
        {link && (
          <Link
            href={link.href}
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            {link.text}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </motion.section>
    );
  }

  // Default: card variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-2xl glass border-border hover:border-primary/20 transition-colors"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Building2 className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">{client}</h3>
          {industry && (
            <p className="text-sm text-muted-foreground">{industry}</p>
          )}
        </div>
      </div>

      {/* Challenge & Outcome */}
      <div className="space-y-4 mb-6">
        <div>
          <span className="text-xs font-medium text-primary uppercase">Challenge</span>
          <p className="text-sm text-muted-foreground">{challenge}</p>
        </div>
        <div>
          <span className="text-xs font-medium text-green-500 uppercase">Result</span>
          <p className="text-foreground">{outcome}</p>
        </div>
      </div>

      {/* Metrics */}
      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
          {metrics.slice(0, 2).map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-xl font-bold gradient-text">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Link */}
      {link && (
        <div className="mt-6 pt-6 border-t border-border">
          <Link
            href={link.href}
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            {link.text}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </motion.div>
  );
}
