'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Quote } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { BaseLayout } from './BaseLayout';

interface SolutionLayoutProps {
  title: string;
  description: string;
  icon?: string;
  category: string;
  outcomes: string[];
  caseStudy?: {
    client: string;
    outcome: string;
  };
  cta?: {
    text: string;
    href: string;
  };
  children: ReactNode;
}

export function SolutionLayout({
  title,
  description,
  category,
  outcomes,
  caseStudy,
  cta = { text: 'Explore This Solution', href: '/contact' },
  children,
}: SolutionLayoutProps) {
  return (
    <BaseLayout maxWidth="lg" showOrbs>
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Link
          href="/solutions"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All Solutions
        </Link>
      </motion.div>

      {/* Hero Section */}
      <header className="mb-16">
        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-4"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
            {category.toUpperCase()}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-3xl"
        >
          {description}
        </motion.p>
      </header>

      {/* Outcomes Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-16"
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          Expected Outcomes
        </h2>
        <div className="space-y-4">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border group hover:border-accent/30 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-sm">
                {index + 1}
              </div>
              <span className="text-foreground pt-1">{outcome}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Case Study */}
      {caseStudy && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16 p-8 rounded-2xl glass border-accent/20"
        >
          <div className="flex items-start gap-4">
            <Quote className="h-8 w-8 text-accent/40 flex-shrink-0" />
            <div>
              <p className="text-lg text-foreground mb-4 italic">
                &ldquo;{caseStudy.outcome}&rdquo;
              </p>
              <p className="text-sm text-muted-foreground">
                &mdash; {caseStudy.client}
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* CTA */}
      {cta && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mb-16"
        >
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
          >
            {cta.text}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>
      )}

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="prose-content"
      >
        {children}
      </motion.article>

      {/* Footer CTA */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-accent/10 to-primary/10 border border-border text-center"
      >
        <h3 className="text-2xl font-bold mb-2">See it in action</h3>
        <p className="text-muted-foreground mb-6">
          Let&apos;s explore how this solution can transform your business.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
        >
          Schedule a Demo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.footer>
    </BaseLayout>
  );
}
