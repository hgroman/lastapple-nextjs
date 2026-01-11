# Technical Peer Review Request: Last Apple Digital Platform

## Document Purpose

This is a request for critical peer review of a planned website rebuild. We seek feedback on architectural decisions, identification of blind spots, and insight into cutting-edge approaches we may be missing.

**We are explicitly asking:** What is the absolute best way to build this today? Not "good enough" - the state of the art.

---

## Part 1: The Journey (Context)

### Who We Are
Last Apple Business Solutions is a boutique digital agency specializing in WordPress care, AI-powered marketing systems, and system integration. Owner-operated, high-touch, technical depth.

### The Problem We're Solving
The current WordPress site doesn't reflect what we actually do. More critically, it's not **malleable** - updating content requires logging into wp-admin, navigating menus, editing in a WYSIWYG, and hoping nothing breaks.

### The Vision (The "Red Light Test")
```
Scenario: Driving. Stopped at a red light.

Action 1: Open Claude Code on phone
Action 2: Say "Update my pricing by 25% across all tiers"
Action 3: Claude edits the content, commits to Git

Next red light: Approve the PR
Next red light: See changes live

Total time: 90 seconds across 3 red lights
```

A website as malleable as a conversation. Content as code. AI as the editor.

### What We Tried (And What Failed)
We attempted a WordPress + Git integration using the WP Database Version Control plugin. The goal was to export content as JSON, edit via Git, and sync back.

**It failed catastrophically.** A bulk import command (`wp dbvc import`) overwrote the entire WordPress database - menus, options, 60,000+ lines of plugin settings. The site broke. Required backup restoration.

**Root cause:** WordPress was the wrong tool. It's not designed for Git-native workflows. The plugin was built for database versioning, not surgical content updates.

**Lesson learned:** We need a platform where content IS code - not a CMS with code bolted on.

---

## Part 2: The Pivot

We're rebuilding from scratch on a modern stack designed for:
1. **Git-native content** - Files in a repo, not rows in a database
2. **AI-editable** - Structured content that Claude can modify with confidence
3. **Build-time validation** - If content is malformed, the build fails (site stays safe)
4. **SEO-first** - Server-rendered, fast, crawlable
5. **Production-grade** - Not a prototype, a real business site

---

## Part 3: Current Technical Specification

### Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15+ (App Router) | SSR/SSG, Metadata API, Server Actions, Edge Runtime |
| Language | TypeScript (strict) | Type safety, better Claude accuracy |
| Styling | Tailwind CSS v4+ | Utility-first, tree-shakes, CSS-first config |
| Components | shadcn/ui (Radix + Tailwind) | Accessible primitives, we own the code |
| Content | MDX + Velite | Typed frontmatter, build-time validation, Zod schemas |
| Animation | Framer Motion | Production-grade, gesture support |
| Forms | Server Actions + honeypot | Native Next.js, no third-party dependency |
| Hosting | Vercel | Zero-config, ISR, Edge Functions, preview deploys |

### Content Architecture

```
content/
├── stream/           # Daily work logs, insights (MDX)
│   ├── 2024-01-10-crm-integration.mdx
│   └── ...
├── services/         # Service pages (MDX or structured)
│   ├── wordpress-care.mdx
│   ├── ai-marketing.mdx
│   └── system-integration.mdx
├── case-studies/     # Promoted from stream
└── pages/            # About, contact, etc.
```

### Content Model

**Stream** - High frequency, low friction. Daily work logs, client wins, technical insights. Think "work journal made public."

**Evergreen** - Stable pages. Services, about, contact. Curated, refined.

**Flow:** Real work → Transcript → Claude processes → Stream post → Best content promoted to case studies/service pages

### CI/CD Pipeline

```
PR created
  → ESLint
  → TypeScript check
  → Velite content validation
  → Next.js build
  → Vercel preview deploy

Merge to main
  → Same checks
  → Production deploy
```

Broken content = failed build = site protected.

### SEO Requirements

- Per-page metadata via Next.js Metadata API
- Canonical URLs
- OpenGraph + Twitter Cards
- Auto-generated sitemap.xml
- robots.txt
- Semantic HTML structure
- JSON-LD structured data helpers

### Accessibility Requirements

- Keyboard navigation throughout
- Proper ARIA attributes
- Focus states visible
- Reduced-motion support
- Radix primitives ensure baseline accessibility

### Design System

- CSS variables for all colors (design tokens)
- Light mode default, dark mode wired
- shadcn/ui theming (no hardcoded colors)
- Typography scale
- Spacing scale
- Animation tokens

---

## Part 4: The Frontier Questions

This is where we need peer review most critically.

### Question 1: Are We at the Cutting Edge?

The spec above is solid, modern, production-ready. But is it **2025 cutting edge** or **2023 best practice**?

What are we missing? What would make this exceptional rather than merely excellent?

### Question 2: Edge-First Architecture

We're intrigued by the possibility of **dynamic, personalized rendering at the edge**. Conceptually:

- **Time-aware content**: Different messaging for morning vs. evening visitors
- **Geo-aware content**: Localized examples, timezone-appropriate CTAs
- **Device-aware content**: Optimized experiences for mobile vs. desktop
- **Audience-aware content**: If we know something about the visitor (returning user, referral source, industry), adapt accordingly
- **Context-aware rendering**: The same content, presented differently based on all available signals

This sounds like science fiction, but the primitives exist:
- Vercel Edge Middleware
- Edge Config
- Geolocation headers (`request.geo`)
- Device detection
- Feature flags (LaunchDarkly, Vercel Edge Config)
- Personalization engines

**Question:** How would a state-of-the-art architecture incorporate edge-first personalization without overengineering for a small business site? What's the right foundation to lay now that enables this later?

### Question 3: Content as Structured Data

We're using MDX + Velite for content. But is there a more powerful paradigm?

- **Headless CMS with Git backend** (Keystatic, Tina, Decap)?
- **Content as a graph** rather than files?
- **Semantic content structures** that enable AI understanding?

What's the most future-proof content architecture for AI-native editing?

### Question 4: AI Integration Hooks

We want Claude to be able to:
1. Read content and understand structure
2. Modify content safely (validated by schemas)
3. Preview changes before commit
4. Understand relationships between content pieces

**Question:** What architectural patterns make a codebase maximally AI-editable? Are there conventions, file structures, or tooling choices that make Claude (or other AI) more effective?

### Question 5: The Rendering Spectrum

Next.js offers multiple rendering strategies:
- **SSG** - Static Site Generation (build time)
- **SSR** - Server-Side Rendering (request time)
- **ISR** - Incremental Static Regeneration (hybrid)
- **PPR** - Partial Prerendering (new in Next.js 14+)
- **Streaming** - Progressive rendering with Suspense
- **Edge SSR** - Server rendering at the edge

**Question:** For a content-heavy business site with personalization aspirations, what's the optimal rendering strategy? Where does each approach belong?

### Question 6: Observability and Intelligence

Beyond basic analytics:
- How do we understand what content performs?
- How do we feed learnings back into content strategy?
- What's the architecture for a site that gets smarter over time?

### Question 7: What Are We Not Seeing?

We've been deep in this problem for days. What blind spots do we have? What questions should we be asking that we're not?

---

## Part 5: Existing Assets

We have a working visual prototype built with Lovable.dev:
- Repository: `github.com/hgroman/ai-lab-launchpad`
- Stack: Vite + React + TypeScript + shadcn/ui + Framer Motion
- Contains: Full homepage with JournalHero, JournalStream, SolutionsGrid, PricingSection, ClientsPortfolio
- Design quality: High - glass morphism, animations, responsive

This can serve as design reference for the Next.js rebuild.

---

## Part 6: Constraints

- **Timeline**: No artificial deadline, but momentum matters
- **Budget**: Bootstrapped, but willing to invest in the right tools
- **Team**: Owner + Claude Code (AI-assisted development)
- **Hosting budget**: Vercel Pro is acceptable if needed

---

## Part 7: Success Criteria

The rebuild is successful if:

1. **The Red Light Test passes** - Content can be edited via Claude Code in under 2 minutes
2. **Build-time safety** - Invalid content fails the build, protecting production
3. **SEO parity or better** - Lighthouse scores 90+ across all categories
4. **Performance** - Sub-second load times
5. **Maintainability** - Clean, documented code that Claude can navigate
6. **Extensibility** - Foundation supports future personalization without rewrite

---

## Request for Feedback

We are requesting peer review on:

1. **Architecture validation** - Is this the right stack? What would you change?
2. **Cutting-edge gaps** - What 2025 capabilities are we missing?
3. **Edge/personalization** - How do we build for this future?
4. **AI-native patterns** - What makes a codebase maximally Claude-editable?
5. **Blind spots** - What are we not considering?
6. **Build order** - What's the right sequence to construct this?

We want critical feedback, not validation. Tell us what's wrong, what's missing, and what could be better.

---

**Prepared by**: Hank Groman, Last Apple Business Solutions
**With**: Claude (Anthropic)
**Date**: January 2025
**Status**: Pre-implementation review
