'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface JournalHeroProps {
  latestPost?: {
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    tags?: string[];
  };
}

export function JournalHero({ latestPost }: JournalHeroProps) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />

      {/* Animated Gradient Orbs - Crimson and Teal */}
      <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl animate-float animation-delay-200" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/3 blur-3xl animate-float animation-delay-400" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Journal Entry */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Live Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-sm font-medium text-accent">Live from the Lab</span>
            </motion.div>

            {/* Date & Time */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-4 text-muted-foreground text-sm mb-4"
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                The Journey Continues
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
            >
              {latestPost ? (
                <>
                  {latestPost.title.split(' ').slice(0, 3).join(' ')}{' '}
                  <span className="gradient-text">
                    {latestPost.title.split(' ').slice(3).join(' ')}
                  </span>
                </>
              ) : (
                <>
                  Building the Future of{' '}
                  <span className="gradient-text">Digital Business</span>
                </>
              )}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl"
            >
              {latestPost?.description ||
                "30 years of system integration expertise meets AI-powered solutions. Follow the journey as we build, experiment, and share everything we learn."}
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {(latestPost?.tags || ['AI', 'WordPress', 'Integration', 'Automation']).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={latestPost ? `/stream/${latestPost.slug}` : '/stream'}
                  className="group flex items-center gap-2 px-6 py-3.5 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] text-white shadow-lg hover:shadow-primary/30 transition-all"
                >
                  {latestPost ? "Read Today's Entry" : "Enter the Stream"}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="px-6 py-3.5 text-base font-semibold rounded-xl border border-border hover:bg-muted/50 transition-colors inline-block"
                >
                  Let&apos;s Talk
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Logo Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Card Stack */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-50" />

              {/* Main Card with Logo */}
              <motion.div
                whileHover={{ y: -5, rotateY: 2, rotateX: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative glass rounded-3xl p-8 border-primary/10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Logo Container */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-2xl" />
                    <Image
                      src="/logo.png"
                      alt="Last Apple Logo"
                      width={192}
                      height={192}
                      className="relative z-10 rounded-full"
                      priority
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="pt-6 border-t border-border grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">30+</div>
                    <div className="text-xs text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text-accent">AI</div>
                    <div className="text-xs text-muted-foreground">Powered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">100%</div>
                    <div className="text-xs text-muted-foreground">Committed</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 p-3 glass rounded-xl border-accent/20"
              >
                <Sparkles className="h-6 w-6 text-accent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
