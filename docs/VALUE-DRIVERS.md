# Value Drivers Guide

This document ensures every Claude session leverages the full potential of this architecture. We fought hard to get here — 100K+ characters of research across 4 AI platforms. Use it.

---

## The Paradigm Shift

> "Don't build a website that Claude can edit. Build an **AI agent that generates a website from conversation.**"

The website isn't the product. **The conversation is the product.** The website is the artifact.

---

## Maximum Value Features

### 1. Partial Prerendering (PPR)
**What:** Static shell renders instantly. Dynamic content streams in.
**Why:** Best of both worlds — static speed + dynamic freshness.
**How to use:**
```tsx
// In any page
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      {/* This is static, renders at build time */}
      <Header />
      <Hero />

      {/* This streams in dynamically */}
      <Suspense fallback={<Skeleton />}>
        <DynamicPricing />
      </Suspense>

      {/* Back to static */}
      <Footer />
    </div>
  )
}
```
**Enable in next.config.ts:**
```ts
experimental: {
  ppr: true
}
```

---

### 2. Server Components (Default)
**What:** Components render on the server. Zero JavaScript shipped for them.
**Why:** Faster loads, better SEO, smaller bundles.
**How to use:** Just write components. They're server components by default.
```tsx
// This runs on the server, ships zero JS
export default async function BlogPost({ slug }) {
  const post = await getPost(slug) // Direct database/API access
  return <article>{post.content}</article>
}
```
**Only add `'use client'` when you need:**
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)
- React state (useState, useEffect)

---

### 3. MDX Content Pipeline
**What:** Markdown + React components, validated at build time.
**Why:** Content as code. Git-native. Type-safe. No database.

**Writing content:**
```mdx
---
title: "AI Chatbot Solutions"
description: "Transform customer engagement with intelligent automation"
price: 3500
tier: "starter"
published: true
---

# AI Chatbot Solutions

Transform your customer engagement with intelligent automation.

<PricingCard tier={frontmatter.tier} price={frontmatter.price} />

## What's Included

- 24/7 automated responses
- Natural language understanding
- CRM integration

<CTAButton href="/contact">Get Started</CTAButton>
```

**Zod validation catches errors at build:**
```ts
// content/schema/service.ts
import { z } from 'zod'

export const ServiceSchema = z.object({
  title: z.string().min(1),
  description: z.string().max(160),
  price: z.number().positive(),
  tier: z.enum(['starter', 'professional', 'enterprise']),
  published: z.boolean()
})
```

**If frontmatter is invalid, build fails.** No broken content in production.

---

### 4. Edge Runtime
**What:** Code runs on Vercel's global edge network (300+ locations).
**Why:** Sub-50ms response times globally.
**How to use:**
```tsx
// Any API route or page
export const runtime = 'edge'

export async function GET() {
  // This runs at the edge, closest to the user
  return Response.json({ fast: true })
}
```

---

### 5. Incremental Static Regeneration (ISR)
**What:** Static pages that refresh in the background.
**Why:** Static speed + fresh content.
**How to use:**
```tsx
// Regenerate every hour
export const revalidate = 3600

export default async function StreamPage() {
  const posts = await getPosts()
  return <Stream posts={posts} />
}
```

---

### 6. Streaming & Suspense
**What:** Stream HTML as it's ready, don't wait for everything.
**Why:** Faster Time to First Byte, progressive loading.
**How to use:**
```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      <InstantHeader />
      <Suspense fallback={<LoadingSpinner />}>
        <SlowDataComponent />
      </Suspense>
    </>
  )
}
```

---

### 7. Turbopack
**What:** Next.js's Rust-based bundler.
**Why:** 94% faster HMR than Webpack. Sub-second refreshes.
**How to use:** Automatic with `npm run dev`. Just enjoy it.

---

### 8. shadcn/ui + Radix
**What:** Accessible, unstyled primitives you own completely.
**Why:** No dependency lock-in. Full control. Accessible by default.
**How to use:**
```bash
npx shadcn@latest add button dialog card
```
Components land in `src/components/ui/`. Modify freely.

---

### 9. Framer Motion
**What:** Production-ready animations and gestures.
**Why:** Magnetic effects, smooth transitions, gesture support.
**How to use:**
```tsx
import { motion } from 'framer-motion'

<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring" }}
>
  Interactive element
</motion.div>
```

---

## The Red Light Test

The ultimate validation: Can you update content from your phone at a red light?

1. Tell Claude: "Update WordPress Essentials to $249"
2. Claude edits `content/services/wordpress-care.mdx`
3. Claude commits and pushes
4. Vercel deploys in <2 minutes
5. Live.

**If any step takes longer than a red light, we've failed.**

---

## What NOT To Do

Based on 100K+ chars of research, these are anti-patterns:

| Anti-Pattern | Why It's Wrong | Do This Instead |
|--------------|----------------|-----------------|
| Database for content | Corruption risk, no version history | MDX in Git |
| `'use client'` everywhere | Kills SSR benefits, bigger bundles | Server components by default |
| Client-side data fetching | Slower, worse SEO | Fetch in Server Components |
| Webpack | Slow HMR | Turbopack (automatic) |
| Custom component library | Maintenance burden | shadcn/ui (owned code) |
| HSL color system | Tailwind v4 issues | Hex colors in CSS variables |
| Alternative frameworks | Research is done | Next.js 16+ is the answer |

---

## Implementation Checklist

Use this to verify maximum leverage:

### Already Implemented
- [x] App Router (`src/app/`)
- [x] Server Components (default)
- [x] Turbopack (`npm run dev`)
- [x] Tailwind v4 with hex colors
- [x] shadcn/ui components
- [x] Framer Motion animations
- [x] Vercel deployment

### Ready to Implement
- [ ] MDX content pipeline (scaffolded, needs content)
- [ ] Zod schemas (need to finalize)
- [ ] PPR configuration
- [ ] Edge runtime for API routes
- [ ] ISR for stream/blog

### Future Enhancements
- [ ] MCP integration for AI-native editing
- [ ] ContentGraph class (per MASTER-SPECIFICATION)
- [ ] Playwright E2E tests
- [ ] OpenTelemetry observability

---

## Key Files

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout, wraps all pages |
| `src/app/page.tsx` | Homepage |
| `src/app/globals.css` | Color system, CSS variables |
| `src/lib/content.ts` | MDX loading + Zod validation |
| `src/components/ui/` | shadcn/ui components |
| `content/` | MDX content files |
| `next.config.ts` | Next.js configuration |

---

## Research That Got Us Here

Before making architectural suggestions, read:

- `docs/MASTER-SPECIFICATION.md` — 1,543 lines, THE blueprint
- `docs/ai-research/ChatGPT.md` — 6-template deep analysis
- `docs/ai-research/Gemini.md` — Turbopack, PPR, MCP patterns
- `docs/ai-research/Grok.md` — Architecture validation
- `docs/ai-research/Perplexity.md` — Content model critique

**The stack decision is final. The research is done. Execute.**

---

*This guide exists to ensure we extract maximum value from an architecture that took significant effort to establish. Every session should reference this.*
