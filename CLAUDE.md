# CLAUDE.md

This is the primary context document for Claude Code sessions. Read this first.

---

## Who We Are

**Last Apple Business Solutions** — Hank Groman, Owner
- 30+ years system integration expertise (contact centers, healthcare, payments)
- WordPress maintenance and AI-powered business services
- La Palma, CA | 714-813-9973 | hank@lastapple.com

---

## The Vision

### The Paradigm Shift
> "Don't build a website that Claude can edit. Build an **AI agent that generates a website from conversation.**"

The website isn't the product. **The conversation is the product.** The website is just the artifact.

### Stream-First Architecture
This is NOT a business site with a blog bolted on. **The Stream IS the site.**

The Stream is daily work logs, experiments, AI discoveries, journey documentation. Services, solutions, and portfolio items flow FROM the stream — they are artifacts of the journey, not the main attraction.

### The "Red Light Test"
Edit content from phone via Claude → commit to Git → live in <2 minutes.

Content as code. Git is truth. No database. No CMS corruption risk.

---

## Why This Stack

We evaluated **4 AI platforms** (Grok, Perplexity, ChatGPT, Gemini) with **100K+ characters of research** before choosing this architecture. The decision is final and researched.

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 16+ (App Router) | PPR, Turbopack (94% faster HMR), MCP integration, edge-native |
| Content | MDX + Zod validation | Type-safe, Git-native, build-time validation catches errors |
| Styling | Tailwind CSS v4 | Utility-first, CSS-first config, all 4 AIs agreed |
| Components | shadcn/ui + Radix | Accessible, tree-shakeable, we own the code |
| Animation | Framer Motion | Gesture support, production-ready |
| Hosting | Vercel | Edge deployment, preview builds, <2 min deploys |

**Origin Story:** Lovable built us a beautiful design prototype (Vite + React SPA). We kept the design but rebuilt on Next.js because SPAs cannot do:
- Server-side rendering (SEO)
- Partial Prerendering (static + dynamic)
- MDX content pipelines with build-time validation
- Edge middleware for personalization
- MCP integration for AI-native development

The design lives. The architecture is correct.

### What NOT To Do
- **Do not suggest alternative frameworks.** This decision is researched and final.
- **Do not simplify the architecture.** The complexity serves the vision.
- **Do not create new patterns.** Follow existing conventions in the codebase.
- **Do not over-engineer.** Make changes that are directly requested.

---

## Current Session

**Check `Active-Work/SESSION-CONTEXT.md` for current mission and next steps.**

---

## Current State

**Deployed:** Vercel, auto-deploys from GitHub main branch

**Homepage Complete:**
- Floating 112px logo with breathing glow
- Magnetic nav items with gradient underlines
- Portfolios mega menu (Services/Solutions/Client Work)
- JournalHero with code preview card
- JournalStream section
- SolutionsGrid with colorful gradient icons
- PricingSection with 3 tiers
- ClientsPortfolio with success stories
- Footer with CTA

**Content Pipeline Ready:** MDX + Zod schemas configured. Needs real content.

**WordPress:** SSH access working. 37 pages, 14 posts available for migration.

---

## Build Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage (Stream-first)
│   ├── layout.tsx         # Root layout with Navigation
│   └── globals.css        # Tailwind + CSS variables (hex colors)
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── Navigation.tsx     # Floating nav with magnetic effects
│   ├── JournalHero.tsx    # Hero with code preview
│   ├── SolutionsGrid.tsx  # Colorful gradient solutions
│   ├── PricingSection.tsx # 3-tier pricing
│   ├── ClientsPortfolio.tsx # Success stories
│   └── Footer.tsx         # CTA footer
└── lib/
    ├── content.ts         # Content pipeline (gray-matter + Zod)
    └── utils.ts           # Tailwind cn() utility

content/
├── stream/                # Daily work logs (MDX) - THE CORE
├── services/              # Service pages (MDX)
├── solutions/             # Solution pages (MDX)
├── clients/               # Client work (MDX)
└── schema/                # Zod schemas for content validation

docs/                      # Reference documentation
├── MASTER-SPECIFICATION.md   # THE authoritative blueprint (1,543 lines)
├── PEER-REVIEW-REQUEST.md    # The questions that shaped the architecture
├── ai-research/              # 100K+ chars of AI platform research
│   ├── ChatGPT.md
│   ├── Gemini.md
│   ├── Grok.md
│   └── Perplexity.md
├── CONTENT-GUIDE.md          # How to create/migrate content
└── WORDPRESS-ACCESS.md       # Migration reference
```

---

## Content Pipeline

Content is MDX files validated with Zod schemas at build time.

**Adding a Stream post:**
```bash
# Create content/stream/2026-01-11-my-post.mdx
---
title: "Post Title"
description: "Max 160 chars for SEO"
publishedAt: "2026-01-11"
tags: ["ai", "development"]
featured: false
published: true
---

Your content here...
```

**Available schemas:**
- `StreamPostSchema` - Blog/journal posts
- `ServiceSchema` - Service offerings
- `SolutionSchema` - AI solutions

---

## Design System

### Color Palette (from logo)
All colors in `src/app/globals.css` using **hex values** (not HSL — Tailwind v4 had issues):

- Background: `#141010` (warm dark charcoal with burgundy undertone)
- Foreground: `#f5f0e8` (warm cream text)
- Primary: `#a63d3d` (deep crimson red)
- Accent: `#3d9999` (teal/turquoise)
- Card: `#1c1616` (slightly lighter warm dark)
- Muted: `#2a2222` (muted backgrounds)
- Border: `#332a2a` (subtle warm borders)

### Design Language
- **"2050 AI-infused bliss"** — Not generic, not corporate, not constrained
- Elements float freely, breathe, pulse with life
- Respond to interaction (magnetic effects, glows, movement)
- The logo GLOWS and BREATHES — it deserves prominence

---

## Path Aliases

`@/*` maps to `./src/*`

---

## Key Files

| File | Purpose |
|------|---------|
| `src/components/Navigation.tsx` | Floating nav with magnetic effects |
| `src/app/globals.css` | Color system, animations, utilities |
| `src/app/page.tsx` | Homepage with all sections |
| `src/lib/content.ts` | MDX loading + Zod validation |
| `content/schema/*.ts` | Zod schemas for content types |

---

## For Deeper Context

**Read these before making architectural suggestions:**

- **`docs/MASTER-SPECIFICATION.md`** — THE authoritative blueprint (1,543 lines). Contains:
  - Complete tech stack with rationale
  - ContentGraph class implementation
  - CI/CD pipeline YAML
  - Playwright test specs
  - 12-week build order
  - Success criteria with metrics
  - Edge-first architecture patterns
  - AI-native development patterns

- **`docs/PEER-REVIEW-REQUEST.md`** — The 7 frontier questions that drove the research

- **`docs/ai-research/`** — 100K+ characters of research across 4 AI platforms:
  - `ChatGPT.md` — 6-template deep analysis
  - `Gemini.md` — Turbopack, PPR, MCP, agentic patterns
  - `Grok.md` — Architecture validation, edge patterns
  - `Perplexity.md` — Content model critique, schema enforcement

- **`docs/VALUE-DRIVERS.md`** — **READ THIS** to leverage the full stack potential. PPR, Server Components, MDX, Edge Runtime — how to use each feature with code examples.

- **`docs/CONTENT-GUIDE.md`** — How to create and migrate content
- **`docs/WORDPRESS-ACCESS.md`** — SSH credentials, WP-CLI commands, migration workflow

---

## Communication Style

- Be direct. Match Hank's energy — he's blunt, so be blunt back.
- Focus on execution over explanation.
- Show don't tell — just build it, don't over-explain.
- No half-measures — don't create skeletons, create the full vision.

---

## Git Commits

Use this format for commits:

```
type(scope): short description

WHAT CHANGED:
- Bullet points of changes

WHY THIS MATTERS:
Explanation of significance

AFFECTED FILES:
- List of files

Session: YYYY-MM-DD — Context

Co-Authored-By: Claude <noreply@anthropic.com>
```
