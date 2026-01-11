'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { StreamPost } from '../../content/schema/stream';

interface JournalStreamProps {
  posts: StreamPost[];
}

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

export function JournalStream({ posts }: JournalStreamProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <section id="stream" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

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
              From the Lab
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold">The Stream</h2>
          </div>
          <motion.div whileHover={{ x: 5 }}>
            <Link
              href="/stream"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View Archive
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Journal Grid */}
        {posts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {posts.map((post) => (
              <motion.article
                key={post.slug}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative glass rounded-2xl p-6 border-transparent hover:border-primary/20 transition-all duration-300 cursor-pointer"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Link href={`/stream/${post.slug}`} className="relative z-10 block">
                  {/* Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-muted-foreground">
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      5 min read
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-medium rounded-md bg-muted/50 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-primary font-medium">Read more</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">The stream is just beginning...</p>
          </div>
        )}

        {/* Mobile View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 sm:hidden text-center"
        >
          <Link
            href="/stream"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            View Archive
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
