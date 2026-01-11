'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    name: 'Essential',
    price: 150,
    description: 'Perfect for small businesses needing reliable WordPress care.',
    features: [
      'Weekly core & plugin updates',
      'Daily backups',
      'Uptime monitoring',
      'Security scanning',
      'Monthly performance report',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    price: 299,
    description: 'For growing businesses ready to leverage AI and automation.',
    features: [
      'Everything in Essential',
      'Priority support (< 4hr response)',
      'Custom n8n workflows (2/month)',
      'AI content assistance',
      'Performance optimization',
      'Monthly strategy call',
    ],
    cta: 'Start Growing',
    popular: true,
  },
  {
    name: 'Scale',
    price: 500,
    description: 'Enterprise-grade solutions for serious digital transformation.',
    features: [
      'Everything in Growth',
      'Dedicated account manager',
      'Unlimited automation workflows',
      'Custom AI integrations',
      'Full-stack development hours',
      'Quarterly roadmap planning',
    ],
    cta: "Let's Talk",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-3 block">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Transparent, <span className="gradient-text-accent">Simple</span> Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            No hidden fees. No long-term contracts. Just honest pricing for exceptional work.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative glass rounded-3xl p-8 ${
                tier.popular
                  ? 'border-primary/50 ring-1 ring-primary/20'
                  : 'border-transparent'
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-primary-glow text-white text-xs font-semibold">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Tier Name */}
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold">${tier.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className={`block w-full py-3 rounded-xl font-semibold transition-all text-center ${
                    tier.popular
                      ? 'bg-gradient-to-r from-primary to-primary-glow text-white shadow-lg hover:shadow-primary/30'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          All plans include a 14-day trial. Cancel anytime. Custom enterprise plans available.
        </motion.p>
      </div>
    </section>
  );
}
