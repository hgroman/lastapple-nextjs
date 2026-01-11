'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PricingTier {
  name: string;
  price: number | string;
  unit?: string;
  description?: string;
  features: string[];
  cta: {
    text: string;
    href: string;
  };
  highlighted?: boolean;
  badge?: string;
}

interface PricingTableProps {
  tiers: PricingTier[];
  title?: string;
  description?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export function PricingTable({ tiers, title, description }: PricingTableProps) {
  return (
    <section className="py-16">
      {(title || description) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {title && (
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
          )}
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
          )}
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className={`grid gap-6 ${tiers.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : tiers.length === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}
      >
        {tiers.map((tier, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`relative p-8 rounded-2xl border ${
              tier.highlighted
                ? 'bg-gradient-to-b from-primary/10 to-card border-primary/30 shadow-lg shadow-primary/5'
                : 'bg-card/50 border-border'
            }`}
          >
            {/* Badge */}
            {tier.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                  {tier.badge}
                </span>
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
              {tier.description && (
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              )}
            </div>

            {/* Price */}
            <div className="text-center mb-6">
              <span className="text-4xl font-bold">
                {typeof tier.price === 'number' ? `$${tier.price}` : tier.price}
              </span>
              {tier.unit && (
                <span className="text-muted-foreground">/{tier.unit}</span>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {tier.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href={tier.cta.href}
              className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
                tier.highlighted
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {tier.cta.text}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
