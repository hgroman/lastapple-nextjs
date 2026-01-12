# Peer Review Request: WordPress → Next.js Migration Plan

**Date:** 2026-01-11
**Requested By:** Hank Groman + Claude (Session 5)
**Project:** Last Apple Business Solutions website migration
**Repo:** github.com/hgroman/lastapple-nextjs

---

## REQUEST

We are pausing before executing a major phase of our migration. We want an outside perspective to audit our plan and identify gaps, risks, or improvements before we proceed.

**Please provide your feedback as a document:** `Active-Work/PEER-REVIEW-RESPONSE-2026-01-11.md`

Push it to the repo when complete so we can pull and review.

---

## WHAT WE'RE TRYING TO DO

Migrate lastapple.com from WordPress to Next.js while:

1. **Preserving SEO equity** — Rankings, backlinks, search visibility
2. **Maintaining content quality** — Images, headings, structure
3. **Improving performance** — SSR, edge deployment, modern stack
4. **Enabling AI-native editing** — "Red Light Test" (phone → Claude → git → live in <2 min)
5. **Creating a repeatable process** — 10 more sites will follow this template

---

## WHERE WE CAME FROM

### The WordPress Site
- **35 pages** — Services, solutions, about, contact, legal
- **14 blog posts** — AI/SEO content, 2024-2025
- **Elementor** — Page builder (design already ported to React)
- **SEOPress** — Meta titles, descriptions, sitemaps
- **Forminator** — Contact forms
- **40+ plugins** — Various functionality

### The Decision
WordPress failed the malleability test. A Git integration attempt (`wp dbvc import`) overwrote the entire database. Site broke. Required backup restoration.

**Root cause:** WordPress is database-first. We need file-first.

**Solution:** Next.js with MDX content, Zod validation, Git as source of truth.

### Research Done
- 100K+ characters of research across 4 AI platforms (Grok, Perplexity, ChatGPT, Gemini)
- Stack decision is final and researched (see `docs/ai-research/`)
- Design ported from Lovable prototype to Next.js

---

## WHERE WE ARE NOW

### Infrastructure Complete (Steps 1-9)
| Step | Status | What It Does |
|------|--------|--------------|
| 1. Fix Build | ✅ | Zod schemas for content types |
| 2. Layout Components | ✅ | Base, Stream, Service, Solution layouts |
| 3. Block Components | ✅ | Hero, FeatureGrid, PricingTable, etc. |
| 4. Prose Components | ✅ | Callout, CodeBlock, Table, MDX mappings |
| 5. Route Pages | ✅ | All routes exist (/stream, /services, /solutions, etc.) |
| 6. SEO Infrastructure | ✅ | Sitemap, robots, RSS, JSON-LD, generateMetadata |
| 7. Contact Form | ✅ | Resend integration, Zod validation, honeypot |
| 8. Redirects | ✅ | 16 redirects in next.config.ts |
| 9. Analytics | ✅ | GA4 + Clarity scripts ready (need env vars) |

### What's Deployed
- Homepage with 6 animated sections ("2050 AI-infused bliss" aesthetic)
- Navigation with mega menu, magnetic effects
- All routes render (with placeholder/minimal content)
- Auto-deploys from GitHub main branch to Vercel

### What's NOT Done
- **Content migration** — Only 4 P1 pages migrated (and they need re-migration)
- **Rich templates** — Service/solution pages are "boring walls of text"
- **Images** — WordPress images not yet downloaded/organized
- **Full redirect coverage** — Only 16 redirects, but 49 pages exist

### Current Position
**Step 10.0: Complete WordPress Audit** — NOT STARTED

---

## WHERE WE THINK WE'RE GOING

### Step 10: Rich Page Templates (Current)

We realized the migrated pages were "boring" compared to the homepage. Strategic decision: Fix templates BEFORE migrating 30+ more pages.

**Our planned execution order:**

```
PHASE A: WORDPRESS AUDIT (Step 10.0)
├── Page inventory (35 pages, 14 posts)
├── SEO metadata (meta titles, descriptions from SEOPress)
├── Images (which pages use which, position, alt text)
├── Heading structure (H1/H2/H3 per page)
├── Internal links (for URL rewriting)
└── Redirect verification (are all URLs covered?)
    ↓
PHASE B: ASSET PREPARATION (Steps 10.1-10.3)
├── Download ALL images
├── Rename semantically (using audit context)
└── Create IMAGE-MANIFEST.md
    ↓
PHASE C: TEMPLATE DEVELOPMENT (Steps 10.4-10.8)
├── Update schemas with image fields
├── Redesign ServiceLayout
├── Redesign SolutionLayout
├── Enhance StreamLayout
└── Create ContentImage component
    ↓
PHASE D: MIGRATION (Steps 10.9-10.10)
├── Re-migrate 4 P1 pages with proper SEO + images
└── Test and verify
```

### After Step 10: Content Migration

| Priority | Content | Count |
|----------|---------|-------|
| P1 | Core services/solutions | 6 pages |
| P2 | Supporting services | 7 pages |
| P3 | Blog posts | 14 posts |
| P4 | Static pages (about, privacy, terms) | 3 pages |

---

## WHAT WE'RE WORRIED ABOUT

### Known Gaps
1. **Redirect coverage** — We have 16 redirects but 49 content items. Are we missing URLs?
2. **SEO data capture** — The 4 migrated pages may have made-up SEO data, not actual WordPress data
3. **Internal link rewriting** — When URLs change, internal links break
4. **Image completeness** — We listed 7 missing images, but there may be more

### Questions for Reviewer
1. **Is our audit checklist complete?** What else should we capture from WordPress before migrating?
2. **Are we missing any SEO preservation steps?** Canonicals, hreflang, structured data, etc.?
3. **What about the WordPress database?** Are there settings, options, or metadata we should extract?
4. **Is our redirect strategy sound?** Should we generate redirects programmatically from the audit?
5. **What could go wrong?** What's the worst case if we proceed with this plan?
6. **What would YOU do differently?** Fresh eyes welcome.

---

## KEY FILES TO REVIEW

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project instructions, stack decisions, culture |
| `Active-Work/1-PROGRESS.yaml` | Current position, all steps, session notes |
| `Active-Work/WORK-ORDER-RICH-TEMPLATES.md` | Step 10 execution plan |
| `Active-Work/4-SESSION-CONTEXT.md` | Migration plan context |
| `Active-Work/5-CONTENT-INVENTORY.yaml` | WordPress content inventory |
| `docs/WORDPRESS-ACCESS.md` | SSH credentials for WordPress CLI |
| `next.config.ts` | Current redirects (16 total) |

---

## HOW TO RESPOND

1. **Create your response as:** `Active-Work/PEER-REVIEW-RESPONSE-2026-01-11.md`
2. **Structure your feedback:**
   - What looks good
   - What's missing or concerning
   - Specific recommendations
   - Priority order for fixes
3. **Push to the repo** when complete
4. **Let us know** what branch/commit to pull

---

## CONTEXT FOR REVIEWER

### The Culture
This project values:
- **Accumulated context** — Session notes, decisions, history have compounding value
- **Surgical edits** — Update means update, not replace
- **Audit before action** — Don't rush into execution without a blueprint
- **Human-AI pairing as art form** — Take pride, push back, don't half-ass it

### What Happened This Session
A previous Claude instance destroyed 458 lines of historical context by using Write instead of Edit. We recovered, codified lessons in CLAUDE.md, and decided to pause for peer review before proceeding.

The lesson: **Think before acting. Audit before migrating. Get outside perspective.**

---

*Thank you for taking the time to review. Your fresh perspective will help us avoid mistakes we can't see.*
