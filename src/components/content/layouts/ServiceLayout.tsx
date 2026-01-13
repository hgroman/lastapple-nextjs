'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { BaseLayout } from './BaseLayout';

// Image type matching schema
interface ServiceImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

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
  // New image fields
  heroImage?: ServiceImage;
  tierImages?: {
    starter?: ServiceImage;
    growth?: ServiceImage;
    business?: ServiceImage;
  };
  images?: ServiceImage[];
  children: ReactNode;
}

// Pricing tier data for WordPress Maintenance (can be customized per service)
const defaultTiers = [
  {
    name: 'Essentials',
    price: 97,
    description: 'Perfect for small business sites',
    features: ['Weekly updates', 'Security monitoring', 'Monthly backups', 'Email support'],
    imageKey: 'starter' as const,
  },
  {
    name: 'Growth',
    price: 197,
    description: 'For growing businesses',
    features: ['Daily updates', 'Uptime monitoring', 'Weekly backups', 'Priority support', 'Performance optimization'],
    imageKey: 'growth' as const,
    popular: true,
  },
  {
    name: 'Business',
    price: 397,
    description: 'Full-service WordPress care',
    features: ['Real-time updates', '24/7 monitoring', 'Daily backups', 'Dedicated support', 'Monthly strategy calls', 'Content updates included'],
    imageKey: 'business' as const,
  },
];

export function ServiceLayout({
  title,
  description,
  category,
  features,
  pricing,
  cta = { text: 'Get Started', href: '/contact' },
  heroImage,
  tierImages,
  children,
}: ServiceLayoutProps) {
  // Determine if we should show tier pricing (for services with multiple plans)
  const showTierPricing = tierImages && (tierImages.starter || tierImages.growth || tierImages.business);

  return (
    <BaseLayout maxWidth="xl" showOrbs>
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

      {/* Hero Section with Image */}
      <header className="mb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
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
              className="text-xl text-muted-foreground mb-8"
            >
              {description}
            </motion.p>

            {/* Quick CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                {cta.text}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* Hero Image */}
          {heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            </motion.div>
          )}
        </div>
      </header>

      {/* Features Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold mb-8">What&apos;s Included</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35 + index * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pricing Tiers (if tier images provided) */}
      {showTierPricing && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the level of care that fits your business. All plans include our core WordPress expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {defaultTiers.map((tier, index) => {
              const tierImage = tierImages?.[tier.imageKey];
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 + index * 0.1 }}
                  className={`relative p-6 rounded-2xl border ${
                    tier.popular
                      ? 'border-primary bg-gradient-to-b from-primary/10 to-transparent'
                      : 'border-border bg-card/50'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Tier Image */}
                  {tierImage && (
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-6 border border-border/50">
                      <Image
                        src={tierImage.src}
                        alt={tierImage.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${
                      tier.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    Get Started
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* Simple Pricing (if no tiers but has pricing) */}
      {!showTierPricing && pricing?.starting && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16 p-8 rounded-2xl glass border-primary/20"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <span className="text-sm text-muted-foreground">Starting at</span>
              <div className="text-3xl font-bold">
                <span className="gradient-text">${pricing.starting}</span>
                <span className="text-lg text-muted-foreground font-normal">
                  {pricing.unit || '/month'}
                </span>
              </div>
            </div>
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              {cta.text}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.section>
      )}

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="prose-content max-w-4xl"
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
