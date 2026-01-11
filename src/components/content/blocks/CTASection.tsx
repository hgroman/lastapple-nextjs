'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CTASectionProps {
  title: string;
  description?: string;
  cta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  /** Visual style */
  variant?: 'default' | 'gradient' | 'bordered' | 'minimal';
}

export function CTASection({
  title,
  description,
  cta,
  secondaryCta,
  variant = 'default',
}: CTASectionProps) {
  const variantStyles = {
    default: 'bg-card/50 border border-border',
    gradient: 'bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20',
    bordered: 'border-2 border-dashed border-border',
    minimal: '',
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`py-16 px-8 rounded-2xl text-center ${variantStyles[variant]}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-3xl font-bold mb-4"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          {description}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <Link
          href={cta.href}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          {cta.text}
          <ArrowRight className="h-4 w-4" />
        </Link>

        {secondaryCta && (
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors"
          >
            {secondaryCta.text}
          </Link>
        )}
      </motion.div>
    </motion.section>
  );
}
