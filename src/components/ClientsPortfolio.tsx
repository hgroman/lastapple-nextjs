'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';
import Link from 'next/link';

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
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-3 block">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Real Clients. <span className="gradient-text">Real Work.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            30+ years of system integration expertise meeting bleeding-edge AI.
            WordPress, automation, data pipelines, and everything in between.
          </p>
        </motion.div>

        {/* Teaser Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/portfolio" className="block group">
            <div className="glass rounded-3xl p-12 border-transparent hover:border-primary/20 transition-all duration-300 text-center">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-accent" />
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                From healthcare platforms to AI-powered marketing engines &mdash;
                explore the sites we build and maintain for real businesses.
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                View Our Portfolio
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
