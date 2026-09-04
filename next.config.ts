import type { NextConfig } from "next";

import { SKIES_ARTIFACTS } from "./src/lib/skies-artifacts";

const nextConfig: NextConfig = {
  // Handle trailing slashes - WordPress uses trailing slashes, Next.js doesn't by default
  // This ensures /wordpress-maintenance/ redirects properly
  trailingSlash: false,

  async rewrites() {
    return SKIES_ARTIFACTS.flatMap(({ path, origin }) => [
      { source: path, destination: origin },
      { source: `${path}/:path*`, destination: `${origin}/:path*` },
    ]);
  },

  /**
   * NOTE — there is deliberately NO headers() block adding X-Robots-Tag to the
   * paths above, and it must not be added back.
   *
   * It was tried on 2026-08-26 and it does NOT work: an external rewrite proxies
   * the upstream response verbatim, so the artifact's own Vercel headers win and
   * next.config's headers() never applies. Measured — the proxied response comes
   * back carrying the ORIGIN's `server: Vercel` and `x-vercel-cache`, and no
   * X-Robots-Tag at all. Config that looks like a guard and enforces nothing is
   * worse than no guard, because it stops anyone from looking again.
   *
   * The noindex has to live in the artifact's own HTML (a <meta name="robots">
   * in the sky-publish template), which is also the only thing that can protect
   * the bare *.vercel.app address — measured the same day, both origins serve a
   * 404 for robots.txt and carry no robots meta and no X-Robots-Tag, so they are
   * fully indexable today and are unprotected by anything except the fact that
   * nothing links to them yet. Linking them from /skies removes that accident.
   *
   * robots.txt Disallow is NOT the answer either: it blocks the crawl, and a
   * blocked crawler never reads the noindex, so a linked-but-disallowed URL can
   * still surface as a bare URL entry. Allow the crawl, serve the noindex.
   *
   * DO NOT link an artifact path from a published page until its HTML carries
   * the noindex. That is not left to memory: each entry above declares
   * `noindexVerified`, and scripts/verify-internal-links.mjs treats a false one
   * as NOT a real route — so linking it fails the commit. Flip the flag only
   * after fetching the artifact and seeing the tag with your own eyes.
   */

  async redirects() {
    return [
      // ============================================================
      // HOSTNAME CANONICALISATION — must stay FIRST (Next.js matches in order)
      // ============================================================
      // https://www.lastapple.com served a full 200 copy of the site rather than
      // redirecting, so Google was indexing a second hostname; GSC showed
      // http://www.lastapple.com/ earning its own impressions at position 33.4.
      // The canonical tag already pointed at the apex, which is why this never
      // became a visible duplicate-content problem — but a canonical is a hint
      // and a 308 is not. Measured 2026-09-04.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.lastapple.com' }],
        destination: 'https://lastapple.com/:path*',
        permanent: true,
      },

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
        destination: '/services/wordpress-maintenance#resurrection',
        permanent: true,
      },
      // Post-merge: standalone resurrection page folded into maintenance#resurrection
      {
        source: '/services/wordpress-resurrection',
        destination: '/services/wordpress-maintenance#resurrection',
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
      // SLUG ALIGNMENT — old Next-only paths → renamed canonical paths
      // Added 2026-06-27 (SEO recon WO; destination_gaps fix)
      // ============================================================
      {
        source: '/services/performance-seo',
        destination: '/services/wordpress-performance',
        permanent: true,
      },
      {
        source: '/solutions/b2b-email-lists',
        destination: '/solutions/b2b-email-list',
        permanent: true,
      },
      {
        source: '/solutions/hubspot',
        destination: '/solutions/hubspot-integration',
        permanent: true,
      },
      {
        source: '/solutions/ai-chatbot',
        destination: '/solutions/ai-chatbot-solutions',
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
      // BROKEN INTERNAL LINKS — 2026-08-17
      // GSC "Not found (404)" report: /meeting-demo was linked from the
      // ai-meeting-analysis Stream post (inherited verbatim from the WordPress
      // original). The page never existed on the new site. INTERNAL-LINKS.yaml
      // planned this mapping during migration; it was never applied.
      // /clients was linked from the mobile nav ("Client Work") and never existed.
      // ============================================================
      {
        source: '/meeting-demo/:path*',
        destination: '/contact?type=demo',
        permanent: true,
      },
      {
        source: '/clients/:path*',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/services/ai-chatbot',
        destination: '/solutions/ai-chatbot-solutions',
        permanent: true,
      },

      // ============================================================
      // GSC-SURFACED LEGACY 404s — 2026-08-17
      // Found by live-checking every URL in the GSC "Crawled - currently not
      // indexed" report rather than trusting the "Not found (404)" bucket, which
      // only lists what Google has already RE-crawled since the migration. These
      // three still 404: Google last fetched them while WordPress was serving
      // 200s, so they are queued to become 404 reports on next crawl.
      //
      // /ai-powered-social-media-marketing-services/ was missed by the original
      // migration audit because it was never archived by the Wayback Machine, so
      // no URL-reconstruction sweep could have found it. GSC's own crawl history
      // is the more complete source of legacy URLs.
      // ============================================================
      {
        source: '/ai-powered-social-media-marketing-services/:path*',
        destination: '/solutions/social-strategies',
        permanent: true,
      },
      // WordPress RSS/comment feeds. No feed is served today, so point
      // subscribers and crawlers at the content they were following.
      {
        source: '/feed/:path*',
        destination: '/stream',
        permanent: true,
      },
      {
        source: '/comments/feed/:path*',
        destination: '/stream',
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

      // ============================================================
      // SEO RECON ADDITIONS — 2026-06-27
      // Orphan WordPress paths surfaced by GSC/GA4 cross-reference
      // ============================================================
      {
        source: '/java/:path*',
        destination: '/stream/coffee-shop-seo',
        permanent: true,
      },
      {
        source: '/seo-for-entrepreneurs/:path*',
        destination: '/solutions/seo-guide',
        permanent: true,
      },
      {
        source: '/ai/:path*',
        destination: '/solutions',
        permanent: true,
      },
      {
        source: '/uncategorized/:path*',
        destination: '/stream',
        permanent: true,
      },
      {
        source: '/home-duplicate/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/author/:path*',
        destination: '/about',
        permanent: true,
      },
      // WordPress date-based archives (/YYYY/MM/DD/, /YYYY/MM/, /YYYY/)
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:path*',
        destination: '/stream',
        permanent: true,
      },
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:path*',
        destination: '/stream',
        permanent: true,
      },
      {
        source: '/:year(\\d{4})/:path*',
        destination: '/stream',
        permanent: true,
      },
      // WordPress category/tag archives — defensive sweeps
      {
        source: '/category/:path*',
        destination: '/stream',
        permanent: true,
      },
      {
        source: '/tag/:path*',
        destination: '/stream',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
