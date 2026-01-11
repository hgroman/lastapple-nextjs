import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // WordPress services to new paths
      {
        source: '/wordpress-maintenance',
        destination: '/services/wordpress-maintenance',
        permanent: true,
      },
      {
        source: '/wordpress-maintenance-plans',
        destination: '/services/maintenance-plans',
        permanent: true,
      },
      {
        source: '/wordpress-performance-optimization-seo-services',
        destination: '/services/wordpress-performance',
        permanent: true,
      },
      {
        source: '/wordpress-resurrection-breathing-new-life-into-aging-websites',
        destination: '/services/wordpress-resurrection',
        permanent: true,
      },
      {
        source: '/website-renaissance-transforming-digital-presence',
        destination: '/services/website-renaissance',
        permanent: true,
      },

      // AI solutions
      {
        source: '/ai-powered-chatbot-solutions',
        destination: '/solutions/ai-chatbot-solutions',
        permanent: true,
      },
      {
        source: '/ai-powered-b2b-email-list-services',
        destination: '/solutions/b2b-email-list',
        permanent: true,
      },
      {
        source: '/ai-driven-data-integration-and-process-optimization',
        destination: '/solutions/data-integration',
        permanent: true,
      },
      {
        source: '/unleash-hubspots-full-potential-with-last-apple',
        destination: '/solutions/hubspot-integration',
        permanent: true,
      },
      {
        source: '/ai-powered-content-creation-services-elevate-your-digital-presence',
        destination: '/solutions/content-creation',
        permanent: true,
      },
      {
        source: '/elevate-your-social-presence-with-ai-driven-strategies',
        destination: '/solutions/social-strategies',
        permanent: true,
      },

      // Blog redirects
      {
        source: '/blog',
        destination: '/stream',
        permanent: true,
      },
      {
        source: '/coffee-shop-seo-how-local-businesses-can-brew-better-search-rankings',
        destination: '/stream/coffee-shop-seo',
        permanent: true,
      },

      // Other pages
      {
        source: '/seo-guide-for-solopreneurs',
        destination: '/solutions/seo-guide',
        permanent: true,
      },
      {
        source: '/audio-scapes',
        destination: '/solutions/audio-scapes',
        permanent: true,
      },
      {
        source: '/partners',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/augmentive-services',
        destination: '/solutions',
        permanent: true,
      },

      // Legacy terms URL
      {
        source: '/terms-use',
        destination: '/terms',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
