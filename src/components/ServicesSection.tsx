'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Rocket, TrendingUp, Wrench } from 'lucide-react';
import Link from 'next/link';
import type { Service } from '../../content/schema/service';

interface ServicesSectionProps {
  services: Service[];
}

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-6 w-6" />,
  rocket: <Rocket className="h-6 w-6" />,
  trending: <TrendingUp className="h-6 w-6" />,
  wrench: <Wrench className="h-6 w-6" />,
};

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
      ease: "easeOut" as const,
    },
  },
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

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
            <span className="text-sm font-medium text-primary uppercase tracking-wider mb-2 block">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold">Services</h2>
          </div>
          <motion.div whileHover={{ x: 5 }}>
            <Link
              href="/services"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.slug}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="block h-full glass rounded-2xl p-8 border-transparent hover:border-primary/20 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                    {iconMap[service.icon] || <Shield className="h-7 w-7" />}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features Preview */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Price */}
                  {service.pricing?.starting && (
                    <div className="pt-6 border-t border-border">
                      <span className="text-sm text-muted-foreground">Starting at </span>
                      <span className="text-lg font-bold gradient-text">${service.pricing.starting}</span>
                      <span className="text-sm text-muted-foreground">{service.pricing.unit || '/mo'}</span>
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Services coming soon...</p>
          </div>
        )}
      </div>
    </section>
  );
}
