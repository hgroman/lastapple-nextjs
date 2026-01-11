'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Boxes, Brain, Cog, Globe, Layers, Zap } from 'lucide-react';
import Link from 'next/link';

const solutions = [
  {
    icon: Globe,
    title: 'WordPress Care',
    description: 'Performance optimization, security hardening, and proactive maintenance for WordPress sites that just work.',
    features: ['Sub-second load times', '24/7 monitoring', 'Weekly updates'],
    color: 'from-blue-500 to-cyan-500',
    link: '/services/wordpress-care',
  },
  {
    icon: Brain,
    title: 'AI-Powered Marketing',
    description: 'From lead enrichment to content generation—AI systems that multiply your marketing impact.',
    features: ['GPT integrations', 'Auto-generated content', 'Smart personalization'],
    color: 'from-violet-500 to-purple-500',
    link: '/services/ai-marketing',
  },
  {
    icon: Cog,
    title: 'System Integration',
    description: 'Connect your tools, automate your workflows, and build data pipelines that scale.',
    features: ['n8n workflows', 'API development', 'Data sync'],
    color: 'from-amber-500 to-orange-500',
    link: '/services/system-integration',
  },
];

const additionalSolutions = [
  { icon: Layers, title: 'Full-Stack Development', description: 'Supabase, React, Next.js' },
  { icon: Boxes, title: 'Database Architecture', description: 'PostgreSQL, SQLAlchemy' },
  { icon: Zap, title: 'Automation Systems', description: 'n8n, Zapier, Make' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export function SolutionsGrid() {
  return (
    <section id="solutions" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

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
            What We Build
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Solutions That <span className="gradient-text">Scale</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three core pillars, infinite possibilities. Each solution is built to integrate
            seamlessly with your existing stack.
          </p>
        </motion.div>

        {/* Main Solutions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Card */}
              <Link href={solution.link} className="block relative h-full glass rounded-3xl p-8 border-transparent hover:border-primary/20 transition-all duration-500 overflow-hidden">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${solution.color} mb-6`}>
                  <solution.icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {solution.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <motion.span
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                >
                  Learn more
                  <ArrowUpRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {additionalSolutions.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-sm">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
