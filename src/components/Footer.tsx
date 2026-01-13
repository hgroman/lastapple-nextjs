'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Social links from WordPress (PLUGIN-INVENTORY.yaml)
const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/LastAppleConsulting', icon: Facebook },
  { name: 'Instagram', href: 'https://www.instagram.com/hank_groman/', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/lastapple', icon: Linkedin },
  { name: 'YouTube', href: 'https://www.youtube.com/@lastappleai', icon: Youtube },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-background" />

      {/* Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Ready to Build Something{' '}
            <span className="gradient-text-accent">Amazing</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Let&apos;s talk about your project. Whether it&apos;s a quick automation or a complete digital transformation, we&apos;re here to help.
          </p>
          <motion.div
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-primary to-primary-glow text-white shadow-lg hover:shadow-primary/30 transition-all"
            >
              Schedule a Call
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="Last Apple Logo"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold">
                Last Apple<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              A digital marketing and systems integration agency building cutting-edge solutions with AI, automation, and modern web technologies.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                hank@lastapple.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                714-813-9973
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                La Palma, CA
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services/wordpress-maintenance" className="hover:text-foreground transition-colors">WordPress Maintenance</Link></li>
              <li><Link href="/services/ai-chatbot" className="hover:text-foreground transition-colors">AI Chatbots</Link></li>
              <li><Link href="/solutions/data-integration" className="hover:text-foreground transition-colors">Data Integration</Link></li>
              <li><Link href="/services" className="hover:text-foreground transition-colors">All Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/stream" className="hover:text-foreground transition-colors">The Stream</Link></li>
              <li><Link href="/solutions" className="hover:text-foreground transition-colors">Solutions</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
            {/* X/Twitter - custom SVG since lucide uses old Twitter icon */}
            <a
              href="https://x.com/lastappledma"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          {/* Copyright and Legal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {currentYear} Last Apple Business Solutions. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
