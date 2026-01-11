'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { BaseLayout } from './BaseLayout';

interface ServiceLayoutProps {
  title: string;
  description: string;
  icon?: string;
  category: string;
  features: string[];
  pricing?: {
    starting?: number;
    unit?: string;
  };
  cta?: {
    text: string;
    href: string;
  };
  children: ReactNode;
}

export function ServiceLayout({
  title,
  description,
  category,
  features,
  pricing,
  cta = { text: 'Get Started', href: '/contact' },
  children,
}: ServiceLayoutProps) {
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
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All Services
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
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
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

      {/* Features Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-16"
      >
        <h2 className="text-xl font-semibold mb-6">What&apos;s Included</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border"
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm text-foreground">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pricing & CTA */}
      {(pricing?.starting || cta) && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16 p-8 rounded-2xl glass border-primary/20"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            {pricing?.starting && (
              <div>
                <span className="text-sm text-muted-foreground">Starting at</span>
                <div className="text-3xl font-bold">
                  <span className="gradient-text">${pricing.starting}</span>
                  <span className="text-lg text-muted-foreground font-normal">
                    {pricing.unit || '/month'}
                  </span>
                </div>
              </div>
            )}
            {cta && (
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                {cta.text}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </motion.section>
      )}

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-semibold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground
          prose-code:text-accent prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-card prose-pre:border prose-pre:border-border
          prose-blockquote:border-l-primary prose-blockquote:bg-card/50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
          prose-li:text-muted-foreground"
      >
        {children}
      </motion.article>

      {/* Footer CTA */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border text-center"
      >
        <h3 className="text-2xl font-bold mb-2">Ready to get started?</h3>
        <p className="text-muted-foreground mb-6">
          Let&apos;s discuss how we can help your business.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Contact Us
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.footer>
    </BaseLayout>
  );
}
