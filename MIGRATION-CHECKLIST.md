# WordPress to Next.js Migration Checklist

**Project**: lastapple.com
**Status**: Pre-Migration (Foundation Phase)
**Created**: 2026-01-11

---

## The Core Problem

This is a **migration project**, not a greenfield build. Before building any UI components, we must:

1. Understand what exists in WordPress
2. Build the infrastructure to hold that content
3. Migrate and validate the content
4. Then polish the presentation

**Current State**: We have a beautiful homepage shell with no content pipeline behind it.

---

## Phase 0: Foundation (DO THIS FIRST)

These must be complete before building ANY more UI components.

### 0.1 Route Structure

Create the App Router pages that will hold migrated content:

| Route | File | Status |
|-------|------|--------|
| `/` | `src/app/page.tsx` | Exists (but static) |
| `/services` | `src/app/services/page.tsx` | Not built |
| `/services/[slug]` | `src/app/services/[slug]/page.tsx` | Not built |
| `/solutions` | `src/app/solutions/page.tsx` | Not built |
| `/solutions/[slug]` | `src/app/solutions/[slug]/page.tsx` | Not built |
| `/stream` | `src/app/stream/page.tsx` | Not built |
| `/stream/[slug]` | `src/app/stream/[slug]/page.tsx` | Not built |
| `/about` | `src/app/about/page.tsx` | Not built |
| `/contact` | `src/app/contact/page.tsx` | Not built |
| `/partners` | `src/app/partners/page.tsx` | Not built |
| `/privacy` | `src/app/privacy/page.tsx` | Not built |
| `/terms` | `src/app/terms/page.tsx` | Not built |
| `/blog` | `src/app/blog/page.tsx` | Not built |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Not built |

**Task**: Create stub pages for ALL routes before migrating content.

### 0.2 Content Pipeline

| Component | File | Status |
|-----------|------|--------|
| Content loader | `src/lib/content.ts` | Basic - needs expansion |
| ContentGraph class | `src/lib/content-graph.ts` | Not built |
| Metadata factory | `src/lib/metadata.ts` | Not built |
| Content validation | `scripts/validate-content.ts` | Not built |

### 0.3 Schemas

| Schema | File | Status |
|--------|------|--------|
| Service schema | `content/schema/service.ts` | Exists - needs validation |
| Solution schema | `content/schema/solution.ts` | Exists - needs validation |
| Stream schema | `content/schema/stream.ts` | Exists - needs validation |
| Blog post schema | `content/schema/blog.ts` | Not built |
| Page schema | `content/schema/page.ts` | Not built |

---

## Phase 1: WordPress Content Audit

### 1.1 Menu Structure (from menus.json)

```
Navigation (Primary Menu)
├── Home
├── Wordpress Services (parent page ID: 32)
│   ├── WordPress Maintenance
│   ├── Website Renaissance
│   ├── WordPress Performance Optimization
│   └── WordPress Resurrection
├── Augmentive Services (parent page ID: 8937)
│   ├── SEO
│   ├── AI-Powered Chatbot Solutions
│   ├── AI-Powered B2B Email List Services
│   ├── AI-Driven Data Integration
│   ├── HubSpot Integration
│   ├── AI-Powered Content Creation
│   ├── Social Media AI Strategies
│   └── Audio Scapes
└── About (parent page ID: 8940)
    ├── Why Choose Last Apple
    ├── Request Free SEO Audit
    ├── Schedule Audit Review
    ├── Our Partners
    ├── Our Blog
    └── Contact
```

### 1.2 Page Inventory (35 pages)

**High Priority - Large Service Pages**:
| WP ID | Title | Current URL | Target URL | Size |
|-------|-------|-------------|------------|------|
| 4406 | WordPress Maintenance | /wordpress-maintenance/ | /services/wordpress-maintenance | 15.4KB |
| 9046 | Website Renaissance | /website-renaissance-transforming-digital-presence/ | /services/website-renaissance | 12.7KB |
| 8925 | WordPress Performance | /wordpress-performance-optimizatio | /services/wordpress-performance | 7.7KB |
| 8944 | WordPress Resurrection | /wordpress-resurrection-breathing- | /services/wordpress-resurrection | 7.5KB |
| 8954 | AI Content Creation | /ai-powered-content-creation-servi | /solutions/ai-content-creation | 11.2KB |
| 8970 | AI Chatbot Solutions | /ai-powered-chatbot-solutions | /solutions/ai-chatbots | 8.8KB |
| 10833 | B2B Email List | /ai-powered-b2b-email-list-service | /solutions/b2b-email-lists | 9.9KB |
| 9131 | AI Data Integration | /ai-driven-data-integration-and-pr | /solutions/ai-data-integration | 6.4KB |
| 9320 | HubSpot Integration | /unleash-hubspots-full-potential-w | /solutions/hubspot-integration | 8.6KB |
| 10159 | Social Media AI | /elevate-your-social-presence-with | /solutions/social-media-ai | 6.1KB |
| 31 | SEO Guide | /seo-guide-for-solopreneurs | /services/seo | 7.7KB |

**Core Pages**:
| WP ID | Title | Current URL | Target URL |
|-------|-------|-------------|------------|
| 30 | Home | / | / |
| 32 | Services | /services/ | /services |
| 33 | Contact | /contact | /contact |
| 1263 | Partners | /partners | /partners |
| 8964 | Why Choose Us | /why-choose-last-apple-pioneering- | /about |
| 8792 | Blog | /blog | /blog |

**Legal Pages**:
| WP ID | Title | Current URL | Target URL |
|-------|-------|-------------|------------|
| 1040 | Privacy | /privacy | /privacy |
| 1042 | Terms | /terms-use | /terms |

**Can Skip/Defer** (WooCommerce, empty, or minimal):
- page-10777 (Shop) - empty
- page-10778 (Cart) - WooCommerce
- page-10779 (Checkout) - WooCommerce
- page-10780 (My Account) - WooCommerce
- page-8937 (Augmentive Services) - empty container
- page-8940 (About) - empty container

### 1.3 Blog Post Inventory (14 posts)

| WP ID | Title | Target Slug |
|-------|-------|-------------|
| 8805 | Revolutionizing Digital Marketing | revolutionizing-digital-marketing |
| 9336 | From Manual Drudgery to AI-Driven Efficiency | manual-to-ai-efficiency |
| 10849 | Technical Debt in the Age of AI | technical-debt-ai-age |
| 10878 | Why Your Company Needs a Brain | company-needs-brain |
| 10903 | Kickstart Your Productivity | kickstart-productivity |
| 10923 | Context Anchoring in AI Troubleshooting | context-anchoring-ai |
| 10988 | From Sketches to Systems | sketches-to-systems |
| 11066 | The Symphony of AI-Powered Marketing | ai-marketing-symphony |
| 11074 | Orchestrating the AI Ensemble | ai-ensemble |
| 11088 | Beyond the Blueprint | beyond-blueprint |
| 11097 | Building a Brain | building-brain |
| 11129 | Cursor, Claude, and Chaos | cursor-claude-chaos |
| 11189 | From Chaos to Symphony | chaos-to-symphony |
| 11206 | Coffee Shop SEO | coffee-shop-seo |

---

## Phase 2: Build Content Infrastructure

### 2.1 Tasks

- [ ] Create `src/app/services/page.tsx` - service listing
- [ ] Create `src/app/services/[slug]/page.tsx` - service detail
- [ ] Create `src/app/solutions/page.tsx` - solution listing
- [ ] Create `src/app/solutions/[slug]/page.tsx` - solution detail
- [ ] Create `src/app/blog/page.tsx` - blog listing
- [ ] Create `src/app/blog/[slug]/page.tsx` - blog post
- [ ] Create `src/app/about/page.tsx`
- [ ] Create `src/app/contact/page.tsx`
- [ ] Create `src/app/partners/page.tsx`
- [ ] Create `src/app/privacy/page.tsx`
- [ ] Create `src/app/terms/page.tsx`

### 2.2 Content Loaders

- [ ] Expand `src/lib/content.ts` with:
  - `getServices()` - returns all services
  - `getService(slug)` - returns single service
  - `getSolutions()` - returns all solutions
  - `getSolution(slug)` - returns single solution
  - `getBlogPosts()` - returns all blog posts
  - `getBlogPost(slug)` - returns single post
  - `getPage(slug)` - returns static page content

### 2.3 Validation Script

Create `scripts/validate-content.ts`:
```bash
npm run validate:content
```

Should check:
- All MDX files parse correctly
- Frontmatter matches Zod schemas
- Required fields present
- No broken internal links

---

## Phase 3: Content Migration

### 3.1 Migration Script

Create `scripts/migrate-wordpress.ts` to:
1. Read JSON exports from `TRANSFER-TO-LAUNCHPAD/docs/03-reference/wordpress-exports/`
2. Strip Elementor JSON, convert HTML to Markdown
3. Extract frontmatter (title, description, SEO metadata)
4. Output MDX files to `content/` directories

### 3.2 Migration Order

**Round 1 - Test with 5 pages**:
- [ ] page-4406 (WordPress Maintenance) → `content/services/wordpress-maintenance.mdx`
- [ ] page-8970 (AI Chatbots) → `content/solutions/ai-chatbots.mdx`
- [ ] page-33 (Contact) → `content/pages/contact.mdx`
- [ ] post-11129 (Cursor, Claude, Chaos) → `content/blog/cursor-claude-chaos.mdx`
- [ ] page-8964 (Why Choose Us) → `content/pages/about.mdx`

**Round 2 - WordPress Services (4 pages)**:
- [ ] page-9046 → `content/services/website-renaissance.mdx`
- [ ] page-8925 → `content/services/wordpress-performance.mdx`
- [ ] page-8944 → `content/services/wordpress-resurrection.mdx`
- [ ] page-31 → `content/services/seo.mdx`

**Round 3 - AI Solutions (6 pages)**:
- [ ] page-8954 → `content/solutions/ai-content-creation.mdx`
- [ ] page-10833 → `content/solutions/b2b-email-lists.mdx`
- [ ] page-9131 → `content/solutions/ai-data-integration.mdx`
- [ ] page-9320 → `content/solutions/hubspot-integration.mdx`
- [ ] page-10159 → `content/solutions/social-media-ai.mdx`
- [ ] page-396 → `content/solutions/audio-scapes.mdx`

**Round 4 - Blog Posts (14 posts)**:
- [ ] Migrate all posts to `content/blog/`

**Round 5 - Legal & Other**:
- [ ] page-1040 → `content/pages/privacy.mdx`
- [ ] page-1042 → `content/pages/terms.mdx`
- [ ] page-1263 → `content/pages/partners.mdx`

---

## Phase 4: 301 Redirects

Create `next.config.ts` redirects for SEO preservation:

```typescript
// next.config.ts
const redirects = async () => [
  // WordPress Services old URLs → new
  { source: '/wordpress-maintenance/', destination: '/services/wordpress-maintenance', permanent: true },
  { source: '/website-renaissance-transforming-digital-presence/', destination: '/services/website-renaissance', permanent: true },
  { source: '/wordpress-performance-optimizatio/', destination: '/services/wordpress-performance', permanent: true },
  { source: '/wordpress-resurrection-breathing-new-life-into-aging-websites/', destination: '/services/wordpress-resurrection', permanent: true },

  // AI Solutions old URLs → new
  { source: '/ai-powered-content-creation-services/', destination: '/solutions/ai-content-creation', permanent: true },
  { source: '/ai-powered-chatbot-solutions/', destination: '/solutions/ai-chatbots', permanent: true },
  { source: '/ai-powered-b2b-email-list-services/', destination: '/solutions/b2b-email-lists', permanent: true },
  { source: '/ai-driven-data-integration-and-process-optimization/', destination: '/solutions/ai-data-integration', permanent: true },
  { source: '/unleash-hubspots-full-potential-with-last-apple/', destination: '/solutions/hubspot-integration', permanent: true },
  { source: '/elevate-your-social-presence-with-ai-driven-strategies/', destination: '/solutions/social-media-ai', permanent: true },

  // Other
  { source: '/seo-guide-for-solopreneurs/', destination: '/services/seo', permanent: true },
  { source: '/why-choose-last-apple-pioneering-digital-excellence/', destination: '/about', permanent: true },
  { source: '/terms-use/', destination: '/terms', permanent: true },
];
```

---

## Phase 5: Navigation Integration

Only after content exists and routes work:

- [ ] Update `Navigation.tsx` to link to real routes
- [ ] Build mega-menu with actual service/solution data
- [ ] Add breadcrumbs
- [ ] Add footer links

---

## What NOT To Do Yet

Until Phases 1-4 are complete, **do not**:

- Add more animations to the homepage
- Build new UI components
- Polish existing components
- Add dark mode
- Optimize performance
- Set up analytics

These are all Phase 6+ activities.

---

## Success Criteria

Before moving to polish/UI work:

1. [ ] All routes exist and render content from MDX
2. [ ] `npm run validate:content` passes
3. [ ] All 35 pages migrated to MDX
4. [ ] All 14 blog posts migrated
5. [ ] 301 redirects configured
6. [ ] Navigation links to real pages
7. [ ] Build passes (`npm run build`)

---

## Files Reference

**WordPress Exports Location**:
```
TRANSFER-TO-LAUNCHPAD/docs/03-reference/wordpress-exports/
├── menus.json          # Menu structure (912 lines)
├── page/               # 35 page JSON files
└── post/               # 14 post JSON files
```

**Target Content Structure**:
```
content/
├── services/           # WordPress service pages
├── solutions/          # AI solution pages
├── blog/               # Blog posts (Stream content)
├── pages/              # Static pages (about, contact, etc.)
└── schema/             # Zod validation schemas
```
