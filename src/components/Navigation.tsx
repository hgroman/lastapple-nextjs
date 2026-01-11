'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const services = [
  { title: 'WordPress Care', href: '/services/wordpress-care', description: 'Maintenance, optimization, and support' },
  { title: 'Performance & SEO', href: '/services/performance-seo', description: 'Speed optimization and search rankings' },
  { title: 'Digital Marketing', href: '/services/digital-marketing', description: 'Content, social, and campaigns' },
];

const solutions = [
  { title: 'ScraperSky', href: '/solutions/scrapersky', description: 'AI-powered data collection' },
  { title: 'AI Chatbots', href: '/solutions/ai-chatbots', description: 'Intelligent customer service' },
  { title: 'Data Integration', href: '/solutions/data-integration', description: 'Connect your systems' },
  { title: 'HubSpot Setup', href: '/solutions/hubspot', description: 'CRM implementation' },
];

const clients = [
  { title: 'Case Studies', href: '/clients', description: 'See our work in action' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container py-4">
        <nav className="glass rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="h-10 w-10 rounded-xl overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Last Apple"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/50 to-accent/50 opacity-0 blur-lg group-hover:opacity-60 transition-opacity" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Last Apple<span className="text-primary">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link href="/stream" legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">
                      Stream
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted/50">
                    Portfolios
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] gap-3 p-6 md:grid-cols-3 bg-card border border-border rounded-xl">
                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-primary">Services</h4>
                        <ul className="space-y-2">
                          {services.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-muted/50"
                              >
                                <div className="text-sm font-medium text-foreground">{item.title}</div>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-accent">Solutions</h4>
                        <ul className="space-y-2">
                          {solutions.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-muted/50"
                              >
                                <div className="text-sm font-medium text-foreground">{item.title}</div>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-foreground">Client Work</h4>
                        <ul className="space-y-2">
                          {clients.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-muted/50"
                              >
                                <div className="text-sm font-medium text-foreground">{item.title}</div>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] text-white shadow-lg hover:shadow-primary/25 transition-shadow"
                >
                  Let&apos;s Talk
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pt-4 border-t border-border overflow-hidden"
              >
                <div className="flex flex-col gap-2">
                  <Link
                    href="/stream"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                  >
                    Stream
                  </Link>
                  <div className="px-4 py-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Services</span>
                    {services.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 pl-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 py-2">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">Solutions</span>
                    {solutions.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 pl-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="mx-4 mt-2 px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] text-white text-center"
                  >
                    Let&apos;s Talk
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </motion.header>
  );
}
