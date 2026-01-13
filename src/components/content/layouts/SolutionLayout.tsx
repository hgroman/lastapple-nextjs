'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Quote, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { BaseLayout } from './BaseLayout';

// Image type matching schema
interface SolutionImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface SolutionLayoutProps {
  title: string;
  description: string;
  icon?: string;
  category: string;
  outcomes: string[];
  caseStudy?: {
    client: string;
    outcome: string;
    image?: SolutionImage;
  };
  cta?: {
    text: string;
    href: string;
  };
  // New image fields
  heroImage?: SolutionImage;
  images?: SolutionImage[];
  // Related solutions for cross-linking
  relatedSolutions?: Array<{
    title: string;
    slug: string;
    description: string;
  }>;
  children: ReactNode;
}

export function SolutionLayout({
  title,
  description,
  category,
  outcomes,
  caseStudy,
  cta = { text: 'Explore This Solution', href: '/contact' },
  heroImage,
  relatedSolutions,
  children,
}: SolutionLayoutProps) {
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
          href="/solutions"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All Solutions
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
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
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
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-accent/10">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20" />
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </motion.div>
          )}
        </div>
      </header>

      {/* Outcomes Section - Enhanced */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-16"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            Expected Outcomes
          </h2>
          <p className="text-muted-foreground">What you&apos;ll achieve with this solution</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.35 + index * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border group hover:border-accent/30 hover:bg-card/80 transition-all"
            >
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-accent" />
              </div>
              <span className="text-foreground">{outcome}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Case Study - Enhanced with Image */}
      {caseStudy && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Case Study Image */}
              {caseStudy.image && (
                <div className="relative w-full lg:w-1/3 aspect-video lg:aspect-square rounded-xl overflow-hidden border border-border/50">
                  <Image
                    src={caseStudy.image.src}
                    alt={caseStudy.image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Case Study Content */}
              <div className={caseStudy.image ? 'lg:w-2/3' : 'w-full'}>
                <div className="flex items-start gap-4">
                  <Quote className="h-10 w-10 text-accent/40 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xl text-foreground mb-6 italic leading-relaxed">
                      &ldquo;{caseStudy.outcome}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-accent font-semibold">
                          {caseStudy.client.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{caseStudy.client}</p>
                        <p className="text-sm text-muted-foreground">Client Success Story</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

      {/* Related Solutions */}
      {relatedSolutions && relatedSolutions.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-16"
        >
          <h3 className="text-xl font-semibold mb-6">Related Solutions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedSolutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="p-5 rounded-xl bg-card/50 border border-border hover:border-accent/30 hover:bg-card/80 transition-all group"
              >
                <h4 className="font-medium text-foreground group-hover:text-accent transition-colors mb-2">
                  {solution.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {solution.description}
                </p>
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* Footer CTA */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-accent/10 to-primary/10 border border-border text-center"
      >
        <h3 className="text-2xl font-bold mb-2">See it in action</h3>
        <p className="text-muted-foreground mb-6">
          Let&apos;s explore how this solution can transform your business.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
        >
          Schedule a Demo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.footer>
    </BaseLayout>
  );
}
