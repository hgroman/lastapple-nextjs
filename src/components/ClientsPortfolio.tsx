'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';

const clients = [
  {
    name: 'TechFlow Solutions',
    industry: 'SaaS',
    logo: 'TF',
    result: '+340% lead conversions',
    description: 'Built automated lead enrichment and scoring system using n8n + Supabase.',
    tags: ['Automation', 'AI'],
  },
  {
    name: 'Green Earth Co.',
    industry: 'E-commerce',
    logo: 'GE',
    result: '0.9s page load time',
    description: 'Complete WordPress performance overhaul and headless migration.',
    tags: ['WordPress', 'Performance'],
  },
  {
    name: 'Nexus Financial',
    industry: 'FinTech',
    logo: 'NF',
    result: '12hr → 15min reports',
    description: 'Automated financial reporting pipeline with AI-powered insights.',
    tags: ['Integration', 'AI'],
  },
  {
    name: 'Bright Academy',
    industry: 'EdTech',
    logo: 'BA',
    result: '50k+ users onboarded',
    description: 'Custom LMS integration with automated student lifecycle management.',
    tags: ['Full-Stack', 'Automation'],
  },
];

export function ClientsPortfolio() {
  return (
    <section id="clients" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

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
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Client <span className="gradient-text">Success</span> Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real results for real businesses. Here&apos;s a glimpse at what we&apos;ve built together.
          </p>
        </motion.div>

        {/* Client Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
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
                    {client.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{client.name}</h3>
                    <span className="text-sm text-muted-foreground">{client.industry}</span>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              {/* Result */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-accent fill-accent" />
                  <span className="text-sm font-medium text-accent">Key Result</span>
                </div>
                <div className="text-2xl font-bold gradient-text">{client.result}</div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">{client.description}</p>

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
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/portfolio"
              className="inline-block px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-primary to-primary-glow text-white shadow-lg hover:shadow-primary/30 transition-all"
            >
              View Full Portfolio
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
