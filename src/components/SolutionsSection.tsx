'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Database, Bot, Workflow, Zap } from 'lucide-react';
import Link from 'next/link';
import type { Solution } from '../../content/schema/solution';

interface SolutionsSectionProps {
  solutions: Solution[];
}

const iconMap: Record<string, React.ReactNode> = {
  database: <Database className="h-6 w-6" />,
  bot: <Bot className="h-6 w-6" />,
  workflow: <Workflow className="h-6 w-6" />,
  zap: <Zap className="h-6 w-6" />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      ease: "easeOut" as const,
    },
  },
};

export function SolutionsSection({ solutions }: SolutionsSectionProps) {
  return (
    <section id="solutions" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />

      <div className="relative z-10 container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider mb-2 block">
              AI-Powered
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold">Solutions</h2>
          </div>
          <motion.div whileHover={{ x: 5 }}>
            <Link
              href="/solutions"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View All Solutions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Solutions Grid */}
        {solutions.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {solutions.map((solution) => (
              <motion.div
                key={solution.slug}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="block h-full glass rounded-2xl p-6 border-transparent hover:border-accent/20 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent/20 transition-colors">
                    {iconMap[solution.icon] || <Zap className="h-6 w-6" />}
                  </div>

                  {/* Category */}
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">
                    {solution.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mt-2 mb-2 group-hover:text-accent transition-colors">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {solution.description}
                  </p>

                  {/* Outcomes Preview */}
                  {solution.outcomes && solution.outcomes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {solution.outcomes[0]}
                      </span>
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Solutions coming soon...</p>
          </div>
        )}
      </div>
    </section>
  );
}
