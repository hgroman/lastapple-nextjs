'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { BaseLayout } from './BaseLayout';

// Image type matching schema
interface StreamImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface StreamLayoutProps {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  category?: string;
  readingTime?: string;
  // New image fields
  featuredImage?: StreamImage;
  // Legacy support for simple string path
  image?: string;
  // Related posts for cross-linking
  relatedPosts?: Array<{
    title: string;
    slug: string;
    description: string;
    publishedAt: string;
  }>;
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
  featuredImage,
  image,
  relatedPosts,
  children,
}: StreamLayoutProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Determine which image to use (prefer structured featuredImage)
  const heroImageSrc = featuredImage?.src || image;
  const heroImageAlt = featuredImage?.alt || title;

  return (
    <BaseLayout maxWidth="lg" showGrid>
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
      <header className="mb-8">
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

        {/* Meta info row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
          </div>

          {/* Share actions */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Share post"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Bookmark post"
            >
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
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
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-muted text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </header>

      {/* Featured Image */}
      {heroImageSrc && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mb-12"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/5 rounded-full blur-2xl" />
        </motion.div>
      )}

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="prose-content max-w-3xl mx-auto"
      >
        {children}
      </motion.article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-xl font-semibold mb-6">Continue Reading</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedPosts.slice(0, 4).map((post) => (
              <Link
                key={post.slug}
                href={`/stream/${post.slug}`}
                className="p-5 rounded-xl bg-card/50 border border-border hover:border-primary/30 hover:bg-card/80 transition-all group"
              >
                <div className="text-xs text-muted-foreground mb-2">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.55 }}
        className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-border text-center"
      >
        <h3 className="text-xl font-semibold mb-2">Found this helpful?</h3>
        <p className="text-muted-foreground mb-6">
          Have questions or want to discuss this topic? Let&apos;s connect.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </Link>
          <Link
            href="/stream"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            More from the Stream
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </motion.footer>
    </BaseLayout>
  );
}
