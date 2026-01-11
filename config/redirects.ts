/**
 * 301 Redirects for WordPress → Next.js Migration
 *
 * These preserve SEO juice from old WordPress URLs to new Next.js routes.
 * Import into next.config.ts
 */

import type { Redirect } from 'next/dist/lib/load-custom-routes'

export const wordpressRedirects: Redirect[] = [
  // ============================================
  // WORDPRESS SERVICES
  // ============================================
  {
    source: '/wordpress-maintenance',
    destination: '/services/wordpress-maintenance',
    permanent: true,
  },
  {
    source: '/website-renaissance-transforming-digital-presence',
    destination: '/services/website-renaissance',
    permanent: true,
  },
  {
    source: '/wordpress-performance-optimizatio',
    destination: '/services/wordpress-performance',
    permanent: true,
  },
  {
    source: '/wordpress-resurrection-breathing-new-life-into-aging-websites',
    destination: '/services/wordpress-resurrection',
    permanent: true,
  },
  {
    source: '/wordpress-maintenance-plans',
    destination: '/services/wordpress-maintenance',
    permanent: true,
  },
  {
    source: '/last-apple-wordpress-maintenance-onboarding',
    destination: '/services/wordpress-maintenance',
    permanent: true,
  },

  // ============================================
  // AI SOLUTIONS / AUGMENTIVE SERVICES
  // ============================================
  {
    source: '/ai-powered-content-creation-services',
    destination: '/solutions/ai-content-creation',
    permanent: true,
  },
  {
    source: '/ai-powered-chatbot-solutions',
    destination: '/solutions/ai-chatbots',
    permanent: true,
  },
  {
    source: '/ai-powered-b2b-email-list-services',
    destination: '/solutions/b2b-email-lists',
    permanent: true,
  },
  {
    source: '/ai-driven-data-integration-and-process-optimization',
    destination: '/solutions/ai-data-integration',
    permanent: true,
  },
  {
    source: '/unleash-hubspots-full-potential-with-last-apple',
    destination: '/solutions/hubspot-integration',
    permanent: true,
  },
  {
    source: '/elevate-your-social-presence-with-ai-driven-strategies',
    destination: '/solutions/social-media-ai',
    permanent: true,
  },
  {
    source: '/audio-scapes',
    destination: '/solutions/audio-scapes',
    permanent: true,
  },

  // ============================================
  // SEO & MARKETING
  // ============================================
  {
    source: '/seo-guide-for-solopreneurs',
    destination: '/services/seo',
    permanent: true,
  },
  {
    source: '/java-seo-technical-audits-coffee-shop-growth',
    destination: '/services/seo-audit',
    permanent: true,
  },
  {
    source: '/schedule-free-seo-report-review',
    destination: '/contact',
    permanent: true,
  },

  // ============================================
  // ABOUT / COMPANY
  // ============================================
  {
    source: '/why-choose-last-apple-pioneering-digital-excellence',
    destination: '/about',
    permanent: true,
  },
  {
    source: '/partners',
    destination: '/about/partners',
    permanent: true,
  },

  // ============================================
  // LEGAL
  // ============================================
  {
    source: '/terms-use',
    destination: '/terms',
    permanent: true,
  },
  {
    source: '/privacy',
    destination: '/privacy',
    permanent: true,
  },

  // ============================================
  // FORMS & CONSULTATIONS
  // ============================================
  {
    source: '/consultation',
    destination: '/contact',
    permanent: true,
  },
  {
    source: '/zoom',
    destination: '/contact',
    permanent: true,
  },
  {
    source: '/maintenance-plan-quote-request',
    destination: '/contact',
    permanent: true,
  },
  {
    source: '/social-media-consultation',
    destination: '/contact',
    permanent: true,
  },
  {
    source: '/wordpress-strategy-consultation',
    destination: '/contact',
    permanent: true,
  },

  // ============================================
  // BLOG (old slugs → new stream/blog)
  // ============================================
  {
    source: '/blog/:slug',
    destination: '/stream/:slug',
    permanent: true,
  },
  {
    source: '/revolutionizing-digital-marketing-with-ai',
    destination: '/stream/revolutionizing-digital-marketing',
    permanent: true,
  },
  {
    source: '/from-manual-drudgery-to-ai-driven-efficiency',
    destination: '/stream/manual-to-ai-efficiency',
    permanent: true,
  },
  {
    source: '/technical-debt-in-the-age-of-ai',
    destination: '/stream/technical-debt-ai-age',
    permanent: true,
  },

  // ============================================
  // CATCH-ALL: Old /services/ prefix
  // ============================================
  {
    source: '/services/:path*',
    destination: '/services/:path*',
    permanent: false, // Not permanent - just ensures /services/ works
  },

  // ============================================
  // WOOCOMMERCE (redirect to home or 404)
  // ============================================
  {
    source: '/shop',
    destination: '/',
    permanent: true,
  },
  {
    source: '/cart',
    destination: '/',
    permanent: true,
  },
  {
    source: '/checkout',
    destination: '/',
    permanent: true,
  },
  {
    source: '/my-account',
    destination: '/',
    permanent: true,
  },
]

/**
 * Page ID to slug mapping from WordPress exports
 * Useful for migration scripts
 */
export const wordpressPageMap: Record<number, { title: string; newSlug: string; type: string }> = {
  // Core pages
  30: { title: 'Home', newSlug: '/', type: 'page' },
  31: { title: 'SEO Guide', newSlug: '/services/seo', type: 'service' },
  32: { title: 'Services', newSlug: '/services', type: 'page' },
  33: { title: 'Contact', newSlug: '/contact', type: 'page' },

  // WordPress Services
  4406: { title: 'WordPress Maintenance', newSlug: '/services/wordpress-maintenance', type: 'service' },
  8925: { title: 'WordPress Performance', newSlug: '/services/wordpress-performance', type: 'service' },
  8944: { title: 'WordPress Resurrection', newSlug: '/services/wordpress-resurrection', type: 'service' },
  9046: { title: 'Website Renaissance', newSlug: '/services/website-renaissance', type: 'service' },

  // AI Solutions
  8954: { title: 'AI Content Creation', newSlug: '/solutions/ai-content-creation', type: 'solution' },
  8970: { title: 'AI Chatbots', newSlug: '/solutions/ai-chatbots', type: 'solution' },
  9131: { title: 'AI Data Integration', newSlug: '/solutions/ai-data-integration', type: 'solution' },
  9320: { title: 'HubSpot Integration', newSlug: '/solutions/hubspot-integration', type: 'solution' },
  10159: { title: 'Social Media AI', newSlug: '/solutions/social-media-ai', type: 'solution' },
  10833: { title: 'B2B Email Lists', newSlug: '/solutions/b2b-email-lists', type: 'solution' },
  396: { title: 'Audio Scapes', newSlug: '/solutions/audio-scapes', type: 'solution' },

  // About section
  8964: { title: 'Why Choose Us', newSlug: '/about', type: 'page' },
  1263: { title: 'Partners', newSlug: '/about/partners', type: 'page' },
  8792: { title: 'Blog', newSlug: '/stream', type: 'page' },

  // Legal
  1040: { title: 'Privacy', newSlug: '/privacy', type: 'page' },
  1042: { title: 'Terms', newSlug: '/terms', type: 'page' },

  // Forms (all → contact)
  695: { title: 'Consultation', newSlug: '/contact', type: 'redirect' },
  9628: { title: 'SEO Audit', newSlug: '/services/seo-audit', type: 'page' },
  9697: { title: 'Schedule Review', newSlug: '/contact', type: 'redirect' },
  10481: { title: 'Schedule Audit', newSlug: '/contact', type: 'redirect' },
  10494: { title: 'Quote Request', newSlug: '/contact', type: 'redirect' },
  10592: { title: 'Social Consultation', newSlug: '/contact', type: 'redirect' },
  10605: { title: 'WP Consultation', newSlug: '/contact', type: 'redirect' },

  // Skip (WooCommerce/empty)
  8937: { title: 'Augmentive Services', newSlug: '/solutions', type: 'redirect' },
  8940: { title: 'About', newSlug: '/about', type: 'redirect' },
  10777: { title: 'Shop', newSlug: '/', type: 'skip' },
  10778: { title: 'Cart', newSlug: '/', type: 'skip' },
  10779: { title: 'Checkout', newSlug: '/', type: 'skip' },
  10780: { title: 'My Account', newSlug: '/', type: 'skip' },
}

/**
 * Blog post ID to slug mapping
 */
export const wordpressPostMap: Record<number, { title: string; newSlug: string }> = {
  8805: { title: 'Revolutionizing Digital Marketing', newSlug: 'revolutionizing-digital-marketing' },
  9336: { title: 'From Manual Drudgery to AI-Driven Efficiency', newSlug: 'manual-to-ai-efficiency' },
  10849: { title: 'Technical Debt in the Age of AI', newSlug: 'technical-debt-ai-age' },
  10878: { title: 'Why Your Company Needs a Brain', newSlug: 'company-needs-brain' },
  10903: { title: 'Kickstart Your Productivity', newSlug: 'kickstart-productivity' },
  10923: { title: 'Context Anchoring in AI Troubleshooting', newSlug: 'context-anchoring-ai' },
  10988: { title: 'From Sketches to Systems', newSlug: 'sketches-to-systems' },
  11066: { title: 'Symphony of AI-Powered Marketing', newSlug: 'ai-marketing-symphony' },
  11074: { title: 'Orchestrating the AI Ensemble', newSlug: 'ai-ensemble' },
  11088: { title: 'Beyond the Blueprint', newSlug: 'beyond-blueprint' },
  11097: { title: 'Building a Brain', newSlug: 'building-brain' },
  11129: { title: 'Cursor, Claude, and Chaos', newSlug: 'cursor-claude-chaos' },
  11189: { title: 'From Chaos to Symphony', newSlug: 'chaos-to-symphony' },
  11206: { title: 'Coffee Shop SEO', newSlug: 'coffee-shop-seo' },
}
