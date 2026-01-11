'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Last Apple</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/stream" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                  Stream
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Portfolios</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[600px] gap-3 p-6 md:grid-cols-3">
                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Services</h4>
                    <ul className="space-y-2">
                      {services.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">{item.title}</div>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Solutions</h4>
                    <ul className="space-y-2">
                      {solutions.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">{item.title}</div>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Client Work</h4>
                    <ul className="space-y-2">
                      {clients.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">{item.title}</div>
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
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex">
          <Button asChild>
            <Link href="/contact">Let&apos;s Talk</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <nav className="flex flex-col space-y-4 mt-8">
              <Link href="/stream" onClick={() => setMobileOpen(false)} className="text-lg font-medium">
                Stream
              </Link>
              <div className="space-y-2">
                <span className="text-sm font-semibold text-muted-foreground">Services</span>
                {services.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block pl-4 py-1">
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                <span className="text-sm font-semibold text-muted-foreground">Solutions</span>
                {solutions.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block pl-4 py-1">
                    {item.title}
                  </Link>
                ))}
              </div>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="text-lg font-medium">
                About
              </Link>
              <Button asChild className="mt-4">
                <Link href="/contact" onClick={() => setMobileOpen(false)}>Let&apos;s Talk</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
