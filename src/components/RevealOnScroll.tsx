'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Reveals children on scroll without the SSR/hydration flash that
 * Framer Motion's whileInView causes. Cards already visible at mount
 * reveal instantly via getBoundingClientRect short-circuit. Cards below
 * the fold reveal via IntersectionObserver. Initial opacity lives in
 * CSS, not JS, so server HTML and first client paint always agree.
 */
export function RevealOnScroll({ children, delay = 0, className = '' }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Short-circuit: if the element is already in (or above) the viewport
    // at mount, reveal it on the same frame as hydration. No observer needed.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.dataset.revealed = 'true';
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.revealed = 'true';
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
