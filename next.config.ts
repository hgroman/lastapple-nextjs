import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Handle trailing slashes - WordPress uses trailing slashes, Next.js doesn't by default
  // This ensures /wordpress-maintenance/ redirects properly
  trailingSlash: false,

  async redirects() {
    return [
      // ============================================================
      // WORDPRESS SERVICES → NEW SERVICE PATHS
      // ============================================================
      {
        source: '/wordpress-maintenance/:path*',
        destination: '/services/wordpress-maintenance',
        permanent: true,
      },
      {
        source: '/wordpress-maintenance-plans/:path*',
        destination: '/services/maintenance-plans',
        permanent: true,
      },
      {
        source: '/wordpress-performance-optimization-seo-services/:path*',
        destination: '/services/wordpress-performance',
        permanent: true,
      },
      {
        source: '/wordpress-resurrection-breathing-new-life-into-aging-websites/:path*',
        destination: '/services/wordpress-resurrection',
        permanent: true,
      },
      {
        source: '/website-renaissance-transforming-digital-presence/:path*',
        destination: '/services/website-renaissance',
        permanent: true,
      },
      // Onboarding process page → main service
      {
        source: '/last-apple-wordpress-maintenance-onboarding-process/:path*',
        destination: '/services/wordpress-maintenance',
        permanent: true,
      },

      // ============================================================
      // AI SOLUTIONS → NEW SOLUTION PATHS
      // ============================================================
      {
        source: '/ai-powered-chatbot-solutions/:path*',
        destination: '/solutions/ai-chatbot-solutions',
        permanent: true,
      },
      {
        source: '/ai-powered-b2b-email-list-services/:path*',
        destination: '/solutions/b2b-email-list',
        permanent: true,
      },
      {
        source: '/ai-driven-data-integration-and-process-optimization/:path*',
        destination: '/solutions/data-integration',
        permanent: true,
      },
      {
        source: '/unleash-hubspots-full-potential-with-last-apple/:path*',
        destination: '/solutions/hubspot-integration',
        permanent: true,
      },
      {
        source: '/ai-powered-content-creation-services-elevate-your-digital-presence/:path*',
        destination: '/solutions/content-creation',
        permanent: true,
      },
      {
        source: '/elevate-your-social-presence-with-ai-driven-strategies/:path*',
        destination: '/solutions/social-strategies',
        permanent: true,
      },
      {
        source: '/seo-guide-for-solopreneurs/:path*',
        destination: '/solutions/seo-guide',
        permanent: true,
      },
      {
        source: '/audio-scapes/:path*',
        destination: '/solutions/audio-scapes',
        permanent: true,
      },

      // ============================================================
      // BLOG ARCHIVE AND POSTS
      // ============================================================
      {
        source: '/blog/:path*',
        destination: '/stream',
        permanent: true,
      },
      // Individual blog posts - WordPress slug → /stream/[slug]
      {
        source: '/coffee-shop-seo-how-local-businesses-can-brew-better-search-rankings/:path*',
        destination: '/stream/coffee-shop-seo',
        permanent: true,
      },
      {
        source: '/from-chaos-to-symphony-when-ai-cognitive-overload-led-to-multi-persona-breakthrough/:path*',
        destination: '/stream/from-chaos-to-symphony',
        permanent: true,
      },
      {
        source: '/cursor-claude-and-chaos-building-a-mautic-data-enrichment-tool-with-ai/:path*',
        destination: '/stream/cursor-claude-chaos',
        permanent: true,
      },
      {
        source: '/building-a-brain-not-just-another-marketing-tool/:path*',
        destination: '/stream/building-a-brain',
        permanent: true,
      },
      {
        source: '/beyond-the-blueprint-how-multiple-ais-and-one-vision-drove-our-marketing-automation-success/:path*',
        destination: '/stream/beyond-the-blueprint',
        permanent: true,
      },
      {
        source: '/orchestrating-the-ai-ensemble-a-five-movement-technical-symphony-of-multi-llm-collaboration/:path*',
        destination: '/stream/orchestrating-ai-ensemble',
        permanent: true,
      },
      {
        source: '/the-symphony-of-ai-powered-marketing-automation-gemini-chats-vision-unveiled/:path*',
        destination: '/stream/symphony-ai-marketing',
        permanent: true,
      },
      {
        source: '/from-sketches-to-systems-four-months-of-transformative-marketing-automation/:path*',
        destination: '/stream/from-sketches-to-systems',
        permanent: true,
      },
      {
        source: '/context-anchoring-in-ai-troubleshooting-a-real-world-problem-in-workflow-efficiency/:path*',
        destination: '/stream/context-anchoring-ai',
        permanent: true,
      },
      {
        source: '/ai-for-meeting-analysis-task-management/:path*',
        destination: '/stream/ai-meeting-analysis',
        permanent: true,
      },
      {
        source: '/why-your-company-needs-a-brain-building-an-ai-powered-knowledge-engine/:path*',
        destination: '/stream/company-needs-brain',
        permanent: true,
      },
      {
        source: '/technical-debt-in-the-age-of-ai-a-journey-from-rigid-systems-to-living-knowledge/:path*',
        destination: '/stream/technical-debt-ai',
        permanent: true,
      },
      {
        source: '/from-manual-drudgery-to-ai-driven-efficiency-a-journey-in-data-integration/:path*',
        destination: '/stream/manual-to-ai-efficiency',
        permanent: true,
      },
      {
        source: '/revolutionizing-digital-marketing-the-power-of-ai-in-seo/:path*',
        destination: '/stream/revolutionizing-digital-marketing',
        permanent: true,
      },

      // ============================================================
      // CONSULTATION & CONTACT PAGES
      // ============================================================
      {
        source: '/consultation/:path*',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/zoom/:path*',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/wordpress-strategy-consultation/:path*',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/social-media-consultation/:path*',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/maintenance-plan-quote-request/:path*',
        destination: '/services/maintenance-plans',
        permanent: true,
      },
      {
        source: '/schedule-free-seo-report-review/:path*',
        destination: '/contact',
        permanent: true,
      },
      // Coffee shop landing page → related blog post
      {
        source: '/java-seo-technical-audits-coffee-shops/:path*',
        destination: '/stream/coffee-shop-seo',
        permanent: true,
      },

      // ============================================================
      // OTHER PAGES
      // ============================================================
      {
        source: '/home/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/partners/:path*',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/augmentive-services/:path*',
        destination: '/solutions',
        permanent: true,
      },
      {
        source: '/why-choose-last-apple-pioneering-ai-driven-digital-marketing/:path*',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/terms-use/:path*',
        destination: '/terms',
        permanent: true,
      },

      // ============================================================
      // WOOCOMMERCE PAGES (redirect to relevant pages)
      // ============================================================
      {
        source: '/shop/:path*',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/cart/:path*',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/checkout/:path*',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/my-account/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
