'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { BaseLayout } from './BaseLayout';

interface StreamLayoutProps {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  category?: string;
  readingTime?: string;
  children: ReactNode;
}

export function StreamLayout({
  title,
  description,
  publishedAt,
  updatedAt,
  tags,
  category,
  readingTime = '5 min read',
  children,
}: StreamLayoutProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <BaseLayout maxWidth="md" showGrid>
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Link
          href="/stream"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Stream
        </Link>
      </motion.div>

      {/* Header */}
      <header className="mb-12">
        {/* Category badge */}
        {category && (
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
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground mb-6"
        >
          {description}
        </motion.p>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {readingTime}
          </span>
          {updatedAt && (
            <span className="text-xs">
              Updated: {new Date(updatedAt).toLocaleDateString('en-US')}
            </span>
          )}
        </motion.div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap gap-2 mt-4"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-muted text-muted-foreground"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </header>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-semibold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground
          prose-code:text-accent prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-card prose-pre:border prose-pre:border-border
          prose-blockquote:border-l-primary prose-blockquote:bg-card/50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
          prose-li:text-muted-foreground"
      >
        {children}
      </motion.article>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-16 pt-8 border-t border-border"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Thanks for reading! Have questions? <Link href="/contact" className="text-primary hover:underline">Get in touch</Link>.
          </div>
          <Link
            href="/stream"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            More from the Stream
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </motion.footer>
    </BaseLayout>
  );
}
