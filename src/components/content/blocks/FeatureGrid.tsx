'use client';

import { motion } from 'framer-motion';
import { LucideIcon, Shield, Rocket, TrendingUp, Wrench, Bot, Zap, Database, Users } from 'lucide-react';

interface Feature {
  icon?: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  /** Visual style */
  variant?: 'cards' | 'minimal' | 'icons';
}

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  rocket: Rocket,
  trending: TrendingUp,
  wrench: Wrench,
  bot: Bot,
  zap: Zap,
  database: Database,
  users: Users,
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export function FeatureGrid({
  features,
  columns = 3,
  variant = 'cards',
}: FeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="py-16"
    >
      <div className={`grid gap-6 ${gridCols[columns]}`}>
        {features.map((feature, index) => {
          const IconComponent = feature.icon ? iconMap[feature.icon] || Shield : Shield;

          if (variant === 'minimal') {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="space-y-2"
              >
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          }

          if (variant === 'icons') {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            );
          }

          // Default: cards
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <IconComponent className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
