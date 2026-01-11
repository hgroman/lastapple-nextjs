'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const navItems = [
  { label: 'Stream', href: '/stream' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
];

// Magnetic effect hook for nav items
function MagneticNavItem({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
    >
      {children}
      {/* Glow underline on hover */}
      <motion.span
        className="absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-primary via-accent to-primary rounded-full"
        initial={{ width: 0, x: '-50%' }}
        whileHover={{ width: '80%' }}
        transition={{ duration: 0.3 }}
      />
      {/* Subtle glow */}
      <span className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
    </motion.a>
  );
}

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Floating Logo - Top Left - BIG and Beautiful */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-6 z-50"
      >
        <Link href="/" className="block group">
          <div className="relative">
            {/* Breathing glow behind logo */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 blur-xl"
            />
            {/* Secondary glow layer */}
            <motion.div
              animate={{
                scale: [1.1, 1.3, 1.1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/30 to-primary/30 blur-2xl"
            />
            {/* Logo container */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-20 w-20 rounded-2xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/20"
            >
              <Image
                src="/logo.jpg"
                alt="Last Apple"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </Link>
      </motion.div>

      {/* Floating Nav Items - Top Right */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-8 right-8 z-50 hidden md:flex items-center gap-2"
      >
        {/* Nav items with magnetic effect */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-full glass border-primary/10">
          {navItems.map((item) => (
            <MagneticNavItem key={item.href} href={item.href}>
              {item.label}
            </MagneticNavItem>
          ))}
        </div>

        {/* CTA - Pulsing glow */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative ml-4"
        >
          {/* Pulse glow */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent blur-md"
          />
          <Link
            href="/contact"
            className="relative px-6 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-primary-glow text-white shadow-lg block"
          >
            Let&apos;s Talk
          </Link>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Trigger - Floating Orb */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-8 right-6 z-50 md:hidden"
      >
        <div className="relative">
          {/* Glow */}
          <motion.div
            animate={{
              scale: menuOpen ? [1, 1.3, 1] : [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute inset-0 rounded-full blur-lg ${
              menuOpen ? 'bg-accent' : 'bg-primary'
            }`}
          />
          <motion.div
            animate={{ rotate: menuOpen ? 180 : 0 }}
            className="relative h-12 w-12 rounded-full glass border-primary/20 flex items-center justify-center"
          >
            <motion.div className="flex flex-col gap-1.5">
              <motion.span
                animate={{
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 5 : 0,
                }}
                className="block w-5 h-0.5 bg-foreground rounded-full"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block w-5 h-0.5 bg-foreground rounded-full"
              />
              <motion.span
                animate={{
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? -5 : 0,
                }}
                className="block w-5 h-0.5 bg-foreground rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.button>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop with blur */}
            <motion.div
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(20px)' }}
              exit={{ backdropFilter: 'blur(0px)' }}
              className="absolute inset-0 bg-background/80"
            />

            {/* Animated gradient background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"
              />
              <motion.div
                animate={{
                  x: [0, -100, 0],
                  y: [0, 50, 0],
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl"
              />
            </div>

            {/* Menu Content */}
            <div className="relative h-full flex flex-col items-center justify-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-4xl font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="px-8 py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-accent text-white shadow-xl"
                >
                  Let&apos;s Talk
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
