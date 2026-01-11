'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BaseLayoutProps {
  children: ReactNode;
  className?: string;
  /** Show animated gradient orbs in background */
  showOrbs?: boolean;
  /** Show subtle grid pattern overlay */
  showGrid?: boolean;
  /** Maximum width variant */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-7xl',
  full: 'max-w-none',
};

export function BaseLayout({
  children,
  className = '',
  showOrbs = true,
  showGrid = false,
  maxWidth = 'xl',
}: BaseLayoutProps) {
  return (
    <div className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />

      {/* Animated Gradient Orbs */}
      {showOrbs && (
        <>
          <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl animate-float" />
          <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl animate-float animation-delay-200" />
        </>
      )}

      {/* Grid Pattern */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`relative z-10 mx-auto px-6 ${maxWidthClasses[maxWidth]} ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
