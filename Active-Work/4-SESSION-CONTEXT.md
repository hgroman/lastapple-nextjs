# Session Context & Migration Plan

**Last Updated:** 2026-01-11
**Project:** Last Apple WordPress → Next.js Migration
**Owner:** Hank Groman (hank@lastapple.com)

---

## Quick Resume

```bash
# Read files in order:
cat Active-Work/0-START-HERE.md           # Entry point
cat Active-Work/1-PROGRESS.yaml           # Current status
cat Active-Work/2-BUILD-PLAN.md           # Execution steps
cat Active-Work/3-SITE-ARCHITECTURE.yaml  # Technical blueprint
cat Active-Work/5-CONTENT-INVENTORY.yaml  # WordPress content mapped
```

**GitHub MCP:** ✅ Working. Can create branches, PRs, push directly.
**WordPress CLI:** ✅ SSH access working. See `docs/WORDPRESS-ACCESS.md`

---

## Where We Came From

### WordPress Site (lastapple.com)
- **35 pages** - Services, solutions, about, contact, legal
- **14 blog posts** - AI/SEO content, mostly 2024-2025
- **Elementor** - Page builder (design already ported to React)
- **Forminator** - Contact forms (need to rebuild)
- **SEOPress** - Meta/sitemaps (need Next.js equivalent)
- **301 Redirects** - URL mappings (need in next.config.ts)

### What Was Audited (2026-01-11)
Via WP-CLI we extracted:
- Full plugin list (40+ plugins, identified what needs replication)
- All page/post slugs and IDs
- Menu structure (22 navigation items)
- Categories (AI: 11 posts, SEO: 2 posts)
- Social links (Facebook, LinkedIn, Twitter, YouTube, WhatsApp, Skype)
- Contact info (714-813-9973, hank@lastapple.com)
- SEO metadata patterns

---

## What We Have Now

### Next.js Codebase Status
| Component | Status | Notes |
|-----------|--------|-------|
| Homepage | ✅ Complete | 6 sections, animations, responsive |
| Navigation | ✅ Complete | Mega menu, mobile, magnetic effects |
| Design System | ✅ Complete | Tailwind v4, dark theme, all tokens |
| Content Pipeline | ❌ Broken | Schema files deleted from git |
| Routes | ❌ Missing | Only `/` exists, all others 404 |
| SEO | ⚠️ Minimal | Basic title/description only |
| Forms | ❌ None | No contact form, no API routes |
| Sitemap | ❌ None | Not generated |

### Key Files
```
src/
├── app/
│   ├── page.tsx          # Homepage (COMPLETE)
│   ├── layout.tsx        # Root layout with nav
│   └── globals.css       # Design system (COMPLETE)
├── components/
│   ├── Navigation.tsx    # Mega menu (COMPLETE)
│   ├── JournalHero.tsx   # Hero section
│   ├── SolutionsGrid.tsx # Solutions display
│   ├── PricingSection.tsx
│   ├── ClientsPortfolio.tsx
│   ├── Footer.tsx
│   └── ui/               # shadcn components
└── lib/
    ├── content.ts        # MDX loader (NEEDS SCHEMAS)
    └── utils.ts          # cn() utility

content/                  # EMPTY - needs schemas + MDX files
docs/                     # Reference documentation
Active-Work/              # Current session files ← YOU ARE HERE
```

### Available Tools
| Tool | Access | Use For |
|------|--------|---------|
| GitHub MCP | `mcp__github__*` | Create branches, push, PRs |
| WordPress CLI | SSH to SiteGround | Pull any content on demand |
| Vercel | Auto-deploy | Deploys from main branch |
| Local dev | `npm run dev` | Turbopack, hot reload |

---

## Where We're Going

### Target State
A fully functional Next.js site that:
1. Serves all WordPress content (cleaner, faster, modern)
2. Maintains SEO equity (301 redirects from old URLs)
3. Has working contact form with email delivery
4. Generates sitemap/RSS automatically
5. Uses consistent component library for all content pages
6. Passes the "Red Light Test" (phone → git → live in <2 min)

### URL Structure (New)
```
/                           # Homepage (exists)
/stream                     # Blog archive
/stream/[slug]              # Blog post detail
/services                   # Services overview
/services/[slug]            # Service detail (5 services)
/solutions                  # Solutions overview
/solutions/[slug]           # Solution detail (7 solutions)
/about                      # About page
/contact                    # Contact form
/privacy                    # Privacy policy
/terms                      # Terms of use
/sitemap.xml               # Auto-generated
/feed.xml                  # RSS feed for stream
```

---

## The Execution Plan

### ⚠️ PHASE 0: Component Strategy Decision (BLOCKING)

**This must be decided before building routes.**

How do we render MDX content pages with consistent styling?

#### Option A: Pure MDX Components
Each MDX file imports and uses components directly:
```mdx
import { Hero, FeatureGrid, CTA } from '@/components/content'

<Hero title="WordPress Maintenance" />
<FeatureGrid features={[...]} />
<CTA href="/contact" />
```
- **Pros:** Maximum flexibility per page
- **Cons:** More work, potential inconsistency

#### Option B: Layout Templates
Page types have fixed layouts, frontmatter defines content:
```mdx
---
template: service
hero:
  title: WordPress Maintenance
  subtitle: Premium white-glove service
features:
  - Daily backups
  - Security monitoring
---
Body prose content here...
```
- **Pros:** Consistent, fast to create
- **Cons:** Less flexible for custom layouts

#### Option C: Hybrid (RECOMMENDED)
- Layout templates for common patterns
- MDX components available for custom needs
- Best of both worlds

**Components to build (if Option C):**
```
src/components/content/
├── layouts/
│   ├── ServiceLayout.tsx
│   ├── SolutionLayout.tsx
│   ├── StreamLayout.tsx
│   └── PageLayout.tsx
├── blocks/
│   ├── Hero.tsx
│   ├── FeatureGrid.tsx
│   ├── PricingTable.tsx
│   ├── CaseStudy.tsx
│   ├── ProcessSteps.tsx
│   ├── CTASection.tsx
│   └── FAQ.tsx
└── prose/
    ├── Callout.tsx
    ├── CodeBlock.tsx
    └── Table.tsx
```

**USER DECISION NEEDED:** Which option?

---

### Phase 1: Foundation (Fix Build)

**Goal:** `npm run build` succeeds

| Task | File | Status |
|------|------|--------|
| Restore StreamPostSchema | `content/schema/stream.ts` | ⬜ |
| Restore ServiceSchema | `content/schema/service.ts` | ⬜ |
| Restore SolutionSchema | `content/schema/solution.ts` | ⬜ |
| Create 1 placeholder per type | `content/*/placeholder.mdx` | ⬜ |
| Verify build passes | `npm run build` | ⬜ |

**Time:** ~30 minutes

---

### Phase 2: Route Infrastructure

**Goal:** All URLs render (even with placeholder content)

| Route | File | Status |
|-------|------|--------|
| /stream | `app/stream/page.tsx` | ⬜ |
| /stream/[slug] | `app/stream/[slug]/page.tsx` | ⬜ |
| /services | `app/services/page.tsx` | ⬜ |
| /services/[slug] | `app/services/[slug]/page.tsx` | ⬜ |
| /solutions | `app/solutions/page.tsx` | ⬜ |
| /solutions/[slug] | `app/solutions/[slug]/page.tsx` | ⬜ |
| /about | `app/about/page.tsx` | ⬜ |
| /contact | `app/contact/page.tsx` | ⬜ |
| /privacy | `app/privacy/page.tsx` | ⬜ |
| /terms | `app/terms/page.tsx` | ⬜ |

**Time:** ~2-3 hours

---

### Phase 3: Content Components

**Goal:** Reusable building blocks for all pages

| Component | Purpose | Status |
|-----------|---------|--------|
| ServiceLayout | Wraps service detail pages | ⬜ |
| SolutionLayout | Wraps solution detail pages | ⬜ |
| StreamLayout | Wraps blog post pages | ⬜ |
| Hero | Page header with title/subtitle | ⬜ |
| FeatureGrid | Display features/benefits | ⬜ |
| PricingTable | Display pricing tiers | ⬜ |
| ProcessSteps | Numbered process steps | ⬜ |
| CTASection | Call to action blocks | ⬜ |
| Callout | Info/warning boxes in prose | ⬜ |
| CodeBlock | Syntax highlighted code | ⬜ |

**Time:** ~2-3 hours

---

### Phase 4: SEO Infrastructure

**Goal:** Full SEO parity with WordPress

| Task | Implementation | Status |
|------|----------------|--------|
| Dynamic metadata | `generateMetadata()` per route | ⬜ |
| Sitemap | `app/sitemap.ts` | ⬜ |
| Robots.txt | `app/robots.ts` | ⬜ |
| JSON-LD | Organization + LocalBusiness | ⬜ |
| RSS Feed | `app/feed/route.ts` | ⬜ |
| Open Graph images | Optional - can add later | ⬜ |

**Time:** ~1-2 hours

---

### Phase 5: Contact Form

**Goal:** Working form with email delivery

| Task | Status |
|------|--------|
| ContactForm component with Zod validation | ⬜ |
| API route `app/api/contact/route.ts` | ⬜ |
| Email service (Resend recommended, free tier) | ⬜ |
| Success/error UI states | ⬜ |
| Test end-to-end | ⬜ |

**Time:** ~1-2 hours

---

### Phase 6: Redirects

**Goal:** WordPress URLs → New structure (301s)

All redirects go in `next.config.ts`:
```typescript
redirects: async () => [
  { source: '/wordpress-maintenance', destination: '/services/wordpress-maintenance', permanent: true },
  { source: '/blog', destination: '/stream', permanent: true },
  // ... 40+ more
]
```

Full redirect map is in `SITE-ARCHITECTURE.yaml`.

**Time:** ~1 hour

---

### Phase 7: Analytics

**Goal:** Tracking parity

| Service | Action | Status |
|---------|--------|--------|
| Microsoft Clarity | Get project ID from WP, add script | ⬜ |
| Google Analytics | Get measurement ID, add script | ⬜ |
| Search Console | Verify ownership | ⬜ |

**Time:** ~30 minutes

---

### Phase 8: Content Migration

**Goal:** All 35 pages + 14 posts converted to MDX

#### Priority 1 (Core Business)
| WP ID | Title | Next.js File |
|-------|-------|--------------|
| 4406 | WordPress Maintenance | `content/services/wordpress-maintenance.mdx` |
| 9816 | Maintenance Plans | `content/services/maintenance-plans.mdx` |
| 8970 | AI-Powered Chatbots | `content/solutions/ai-chatbot-solutions.mdx` |
| 10833 | B2B Email List | `content/solutions/b2b-email-list.mdx` |
| 9131 | Data Integration | `content/solutions/data-integration.mdx` |
| 33 | Contact | `app/contact/page.tsx` |

#### Priority 2 (Supporting Services)
| WP ID | Title | Next.js File |
|-------|-------|--------------|
| 8925 | Performance Optimization | `content/services/wordpress-performance.mdx` |
| 8944 | WordPress Resurrection | `content/services/wordpress-resurrection.mdx` |
| 9046 | Website Renaissance | `content/services/website-renaissance.mdx` |
| 9320 | HubSpot Integration | `content/solutions/hubspot-integration.mdx` |
| 8954 | Content Creation | `content/solutions/content-creation.mdx` |
| 10159 | Social Strategies | `content/solutions/social-strategies.mdx` |
| 396 | Audio Scapes | `content/solutions/audio-scapes.mdx` |

#### Priority 3 (Blog Posts - All 14)
See `SITE-ARCHITECTURE.yaml` → migration.posts for complete list.
All go to `content/stream/YYYY-MM-DD-slug.mdx`

#### Priority 4 (Static Pages)
- About page
- Privacy policy
- Terms of use

**Per-page migration process:**
1. `ssh ... wp post get [ID] --format=json` → get content
2. Extract `post_content`, clean HTML artifacts
3. Convert to Markdown
4. Add frontmatter (title, description, dates, etc.)
5. Apply layout components
6. Test locally with `npm run dev`
7. Commit

**Time:** ~4-6 hours total

---

### Phase 9: Launch

| Task | Status |
|------|--------|
| QA all pages and links | ⬜ |
| Mobile responsive check | ⬜ |
| Lighthouse audit (aim for 90+) | ⬜ |
| Test all redirects | ⬜ |
| DNS cutover to Vercel | ⬜ |
| Monitor 404s post-launch | ⬜ |
| Archive WordPress | ⬜ |

---

## Open Decisions

| Question | Options | Decision |
|----------|---------|----------|
| Component strategy | A (pure MDX) / B (templates) / C (hybrid) | **PENDING** |
| Email service | Resend / SendGrid / Nodemailer | Resend (free tier) |
| Image hosting | Vercel / Keep on WP CDN | TBD |
| Launch timeline | ASAP / Specific date | TBD |

---

## How to Continue (Future Sessions)

### Starting Fresh
1. Read `Active-Work/SESSION-CONTEXT.md` (this file)
2. Check `SITE-ARCHITECTURE.yaml` for technical details
3. Run `git status` for uncommitted work
4. Resume from current phase

### Key Commands
```bash
# Development
npm run dev                    # Start local server
npm run build                  # Test production build

# WordPress content (get anything)
ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz \
  "cd /home/customer/www/lastapple.com/public_html && wp post get [ID] --format=json"

# Git
git status
git log --oneline -5
```

### Critical Files
| Need | Location |
|------|----------|
| This plan | `Active-Work/SESSION-CONTEXT.md` |
| Technical architecture | `Active-Work/SITE-ARCHITECTURE.yaml` |
| Content inventory | `Active-Work/content-inventory.yaml` |
| WordPress credentials | `docs/WORDPRESS-ACCESS.md` |
| Project instructions | `CLAUDE.md` |
| Design system | `src/app/globals.css` |

---

## Current Status

```
Decision:  Hybrid component strategy (Option C) ✅
Plan:      Active-Work/BUILD-PLAN.md ← THE EXECUTION PLAN
Position:  Step 10 (Rich Page Templates) - Substep 10.1
Next:      Download missing WordPress webp images (see WORK-ORDER-RICH-TEMPLATES.md)
```

**The BUILD-PLAN.md contains:**
- 10 sequential steps (Steps 1-9 complete, Step 10 in progress)
- Exact code for each file
- Test criteria for each step
- Time estimates (~10 hours total infrastructure)
- Dependency order

---

## The Vision (Why This Matters)

> "Don't build a website that Claude can edit. Build an **AI agent that generates a website from conversation.**"

We're not just migrating WordPress content. We're building:
1. A blazing-fast Next.js site (the artifact)
2. A repeatable migration system (10 sites to migrate)
3. An AI-native content pipeline (MCP → Voice → Agentic)

**The website is the artifact. The conversation is the product.**

The "Red Light Test": Edit content from phone via Claude → commit to Git → live in <2 minutes.

---

*This document is the source of truth for session continuity. Update it as work progresses.*
