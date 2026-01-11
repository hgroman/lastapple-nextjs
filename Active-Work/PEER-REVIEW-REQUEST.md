# Peer Review Request: Infrastructure Build

**Project:** Last Apple Business Solutions - WordPress → Next.js Migration
**Date:** 2026-01-11
**Reviewer:** Requesting peer review from another AI assistant
**Author:** Claude Opus 4.5 (via Claude Code CLI)

---

## Executive Summary

I completed 9 infrastructure steps to prepare a Next.js site for content migration from WordPress. The homepage was already built (by Lovable, then ported). My work focused on:

1. Restoring broken content schemas
2. Creating the component library for content pages
3. Building all route pages
4. Adding SEO infrastructure
5. Implementing contact form
6. Configuring redirects
7. Adding analytics

**I am requesting peer review to identify:**
- Architectural blind spots
- Missing infrastructure requirements
- Security vulnerabilities
- Performance concerns
- Accessibility gaps
- Best practice violations

---

## What Was Built

### 1. Content Schemas (Zod Validation)

**Files created:**
- `content/schema/stream.ts` - Blog post schema
- `content/schema/service.ts` - Service page schema
- `content/schema/solution.ts` - Solution page schema

**Purpose:** Validate MDX frontmatter at build time. Catch errors before deployment.

**StreamPostSchema fields:**
```typescript
title: z.string().min(5)
description: z.string().max(160)  // SEO meta description
slug: z.string()
publishedAt: z.string()
updatedAt: z.string().optional()
tags: z.array(z.string()).optional()
category: z.enum(['ai', 'seo', 'wordpress', 'automation']).optional()
featured: z.boolean().default(false)
published: z.boolean().default(true)
image: z.string().optional()
body: z.string()
```

**ServiceSchema fields:**
```typescript
title, description, slug, icon,
category: z.enum(['wordpress', 'ai', 'integration'])
features: z.array(z.string()).min(3)
pricing: z.object({ starting: z.number().optional(), unit: z.string().optional() }).optional()
cta: z.object({ text: z.string(), href: z.string() }).optional()
published, order, body
```

**SolutionSchema fields:**
```typescript
title, description, slug, icon,
category: z.enum(['ai', 'integration', 'automation', 'data'])
outcomes: z.array(z.string()).min(2)
caseStudy: z.object({ client: z.string(), outcome: z.string() }).optional()
published, order, body
```

**REVIEW QUESTION:** Are these schemas sufficient? Am I missing fields that would be needed for a production business site?

---

### 2. Layout Components

**Files created:**
- `src/components/content/layouts/BaseLayout.tsx`
- `src/components/content/layouts/StreamLayout.tsx`
- `src/components/content/layouts/ServiceLayout.tsx`
- `src/components/content/layouts/SolutionLayout.tsx`

**BaseLayout:** Shared wrapper providing:
- Background gradient
- Animated gradient orbs (optional)
- Grid pattern overlay (optional)
- Max-width constraint (sm/md/lg/xl/full)
- Fade-in animation via Framer Motion

**StreamLayout:** For blog posts
- Back link to /stream
- Category badge
- Title, description
- Date, reading time, updated date
- Tags display
- Prose styling for MDX content
- Footer with CTA

**ServiceLayout:** For service pages
- Back link to /services
- Category badge, title, description
- Features grid with checkmarks
- Pricing display (if provided)
- CTA button
- Prose styling for body content
- Footer CTA section

**SolutionLayout:** For solution pages
- Back link to /solutions
- Category badge (accent color instead of primary)
- Title, description
- Numbered outcomes list
- Case study quote block (if provided)
- CTA button
- Prose styling
- Footer CTA section

**REVIEW QUESTION:** Are these layouts flexible enough? Should they accept more customization props?

---

### 3. Block Components

**Files created in `src/components/content/blocks/`:**

| Component | Purpose | Props |
|-----------|---------|-------|
| Hero.tsx | Page hero section | title, subtitle, description, cta, backgroundVariant |
| FeatureGrid.tsx | 3-column feature display | features: {icon, title, description}[], columns |
| PricingTable.tsx | Pricing tiers | tiers: {name, price, period, description, features, cta, highlighted}[] |
| ProcessSteps.tsx | Numbered steps | steps: {title, description}[], variant |
| CTASection.tsx | Call-to-action banner | title, description, primaryCta, secondaryCta, variant |
| CaseStudy.tsx | Client case study | client, challenge, solution, outcome, quote, author |
| FAQ.tsx | Accordion FAQ | items: {question, answer}[], title |

**All blocks feature:**
- Framer Motion animations
- Dark theme styling
- Responsive design
- Consistent spacing with design system

**REVIEW QUESTION:** Are there common content blocks I'm missing that business sites typically need?

---

### 4. Prose Components

**Files created in `src/components/content/prose/`:**

| Component | Purpose |
|-----------|---------|
| Callout.tsx | Info/warning/success callout boxes |
| CodeBlock.tsx | Syntax-highlighted code (basic, no Prism/Shiki yet) |
| Table.tsx | Styled table with responsive wrapper |

**MDX Components mapping (`src/lib/mdx-components.tsx`):**
- All heading levels (h1-h6) with proper styling
- Paragraphs, lists (ul, ol, li)
- Links with primary color
- Blockquotes with accent border
- Code (inline and block)
- Tables
- Horizontal rules
- Strong, emphasis
- Custom components: Callout, CodeBlock, Table

**REVIEW QUESTION:** The CodeBlock is basic (just styled `<pre>`). Should I have integrated a proper syntax highlighter like Shiki or Prism? Is this a gap?

---

### 5. Route Pages

**Static pages created:**

| Route | File | Features |
|-------|------|----------|
| /stream | src/app/stream/page.tsx | Archive page, lists all posts, category badges, tags, dates |
| /services | src/app/services/page.tsx | Services grid, category colors, pricing preview, feature list |
| /solutions | src/app/solutions/page.tsx | Solutions grid, numbered cards, outcomes preview, case study teasers |
| /about | src/app/about/page.tsx | Company story, founder section, values grid, CTA |
| /contact | src/app/contact/page.tsx | Contact info, social links, ContactForm component |
| /privacy | src/app/privacy/page.tsx | Privacy policy (static content) |
| /terms | src/app/terms/page.tsx | Terms of service (static content) |

**Dynamic pages created:**

| Route | File | Features |
|-------|------|----------|
| /stream/[slug] | src/app/stream/[slug]/page.tsx | generateStaticParams, generateMetadata, StreamLayout |
| /services/[slug] | src/app/services/[slug]/page.tsx | generateStaticParams, generateMetadata, ServiceLayout |
| /solutions/[slug] | src/app/solutions/[slug]/page.tsx | generateStaticParams, generateMetadata, SolutionLayout |

**All dynamic routes include:**
- `generateStaticParams()` for static generation
- `generateMetadata()` for SEO
- Proper 404 handling with `notFound()`
- Layout wrapper integration

**REVIEW QUESTION:** The dynamic pages use `dangerouslySetInnerHTML` to render the MDX body. This is a placeholder - the actual MDX rendering pipeline may need work. Is this a critical gap?

---

### 6. SEO Infrastructure

**Files created:**

| File | Purpose |
|------|---------|
| src/app/sitemap.ts | Dynamic sitemap with all routes |
| src/app/robots.ts | robots.txt allowing all, blocking /api/ and /_next/ |
| src/app/feed.xml/route.ts | RSS feed for stream posts |

**Sitemap includes:**
- All static pages with priorities
- All stream posts with lastModified dates
- All service pages
- All solution pages
- Change frequencies set appropriately

**Root layout enhancements:**
- metadataBase set to https://lastapple.com
- OpenGraph defaults (type, locale, siteName)
- Twitter card config
- RSS feed alternate link
- JSON-LD structured data:
  - Organization schema (name, logo, contact, social links, founder, address)
  - WebSite schema

**REVIEW QUESTIONS:**
1. Is the JSON-LD complete? Am I missing important structured data types?
2. Should individual pages have their own JSON-LD (Article schema for posts, Service schema for services)?
3. Is the sitemap priority assignment correct?

---

### 7. Contact Form

**Files created:**
- `src/components/ContactForm.tsx` - Client component with form logic
- `src/app/api/contact/route.ts` - API route for form submission

**ContactForm features:**
- Client-side validation (name min 2 chars, valid email, message min 10 chars)
- Loading state with spinner
- Success state with confirmation message
- Error state with error display
- Disabled inputs during submission
- Accessible labels

**API route features:**
- Zod validation (server-side)
- Lazy Resend initialization (avoids build-time errors)
- HTML and plain text email formats
- Error handling with appropriate status codes
- Reply-to set to sender's email

**REVIEW QUESTIONS:**
1. Is there CSRF protection needed?
2. Should there be rate limiting?
3. Is the error handling sufficient?
4. Should I add honeypot fields for spam prevention?

---

### 8. Redirects

**File modified:** `next.config.ts`

**16 permanent redirects configured:**

```
WordPress URL → New URL
───────────────────────────────────────────────────────────────
/wordpress-maintenance → /services/wordpress-maintenance
/wordpress-maintenance-plans → /services/maintenance-plans
/wordpress-performance-optimization-seo-services → /services/wordpress-performance
/wordpress-resurrection-breathing-new-life-into-aging-websites → /services/wordpress-resurrection
/website-renaissance-transforming-digital-presence → /services/website-renaissance
/ai-powered-chatbot-solutions → /solutions/ai-chatbot-solutions
/ai-powered-b2b-email-list-services → /solutions/b2b-email-list
/ai-driven-data-integration-and-process-optimization → /solutions/data-integration
/unleash-hubspots-full-potential-with-last-apple → /solutions/hubspot-integration
/ai-powered-content-creation-services-elevate-your-digital-presence → /solutions/content-creation
/elevate-your-social-presence-with-ai-driven-strategies → /solutions/social-strategies
/blog → /stream
/coffee-shop-seo-how-local-businesses-can-brew-better-search-rankings → /stream/coffee-shop-seo
/seo-guide-for-solopreneurs → /solutions/seo-guide
/audio-scapes → /solutions/audio-scapes
/partners → /about
/augmentive-services → /solutions
/terms-use → /terms
```

**REVIEW QUESTIONS:**
1. Are there WordPress URLs I might have missed?
2. Should there be trailing slash handling?
3. Are 308 (permanent) redirects the right choice, or should some be 307 (temporary)?

---

### 9. Analytics

**File modified:** `src/app/layout.tsx`

**Added:**
- Google Analytics 4 script (conditional on `NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- Microsoft Clarity script (conditional on `NEXT_PUBLIC_CLARITY_PROJECT_ID`)
- Both use `next/script` with `strategy="afterInteractive"`

**REVIEW QUESTIONS:**
1. Should analytics be in a separate component for cleaner code?
2. Is there a consent management requirement (GDPR, CCPA)?
3. Are there other analytics/tracking tools commonly needed?

---

## What Was NOT Built

### Explicitly deferred:
1. **Actual MDX rendering** - Dynamic routes use `dangerouslySetInnerHTML`. Real MDX compilation with next-mdx-remote or similar is needed.
2. **Image optimization** - No image handling strategy decided. Options: Vercel Image Optimization, WordPress CDN, Cloudinary.
3. **Search functionality** - No site search implemented.
4. **Newsletter signup** - No email capture beyond contact form.
5. **Comments/engagement** - No commenting system.
6. **Authentication** - No admin or protected routes.
7. **Preview mode** - No draft preview functionality.
8. **Internationalization** - English only, no i18n setup.

### Content not migrated:
- 0 of 35 WordPress pages migrated to MDX
- 0 of 14 WordPress posts migrated to MDX
- Placeholder MDX files exist for build testing only

---

## Environment Variables Required

```bash
# Contact form (required for form to work)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Analytics (optional, scripts won't load without these)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxxx
```

**REVIEW QUESTION:** Are there other environment variables I should have anticipated?

---

## Build Verification

```bash
npm run build
# ✓ Compiled successfully
# 15 routes generated (mix of static, SSG, and dynamic)
```

All routes compile without errors. TypeScript passes.

---

## Specific Review Requests

### 1. Security Review
- Is the contact form API secure?
- Are there XSS vulnerabilities in the MDX rendering approach?
- Should I be sanitizing any inputs?

### 2. Performance Review
- Are the Framer Motion animations performant?
- Is the component structure efficient for tree-shaking?
- Should layouts use React Server Components instead of 'use client'?

### 3. Accessibility Review
- Are the form inputs properly labeled?
- Do the components have proper ARIA attributes?
- Is the color contrast sufficient?
- Is keyboard navigation working?

### 4. SEO Review
- Is the metadata complete?
- Are there missing meta tags?
- Is the structured data correct?
- Should canonical URLs be explicitly set?

### 5. Architecture Review
- Is the file structure logical?
- Are there patterns I should have followed?
- Is the component composition correct?
- Should anything be refactored?

### 6. Missing Infrastructure
- What common business site features am I missing?
- Are there Next.js 16 features I should be using?
- Is the content pipeline approach correct?

---

## File Inventory

### Created this session:

```
content/schema/
├── stream.ts
├── service.ts
└── solution.ts

content/
├── stream/placeholder.mdx
├── services/placeholder.mdx
└── solutions/placeholder.mdx

src/components/content/
├── layouts/
│   ├── BaseLayout.tsx
│   ├── StreamLayout.tsx
│   ├── ServiceLayout.tsx
│   └── SolutionLayout.tsx
├── blocks/
│   ├── Hero.tsx
│   ├── FeatureGrid.tsx
│   ├── PricingTable.tsx
│   ├── ProcessSteps.tsx
│   ├── CTASection.tsx
│   ├── CaseStudy.tsx
│   └── FAQ.tsx
├── prose/
│   ├── Callout.tsx
│   ├── CodeBlock.tsx
│   └── Table.tsx
└── index.ts

src/app/
├── stream/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── services/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── solutions/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── about/page.tsx
├── contact/page.tsx
├── privacy/page.tsx
├── terms/page.tsx
├── sitemap.ts
├── robots.ts
├── feed.xml/route.ts
└── api/contact/route.ts

src/components/ContactForm.tsx
src/lib/mdx-components.tsx
```

### Modified this session:

```
src/app/layout.tsx (JSON-LD, analytics)
src/components/ServicesSection.tsx (pricing field fix)
next.config.ts (redirects)
Active-Work/1-PROGRESS.yaml (progress tracking)
```

---

## Conclusion

I believe the infrastructure is complete for the defined 9-step plan. However, I may have blind spots in:

1. **Security** - No formal security review performed
2. **Accessibility** - No a11y audit performed
3. **Performance** - No Lighthouse audit performed
4. **Edge cases** - Limited error handling testing
5. **Real-world usage** - No actual content to test with

**Please review and identify what I missed.**

---

*Document prepared for peer review. Please be direct and critical. The goal is to identify gaps before content migration begins.*
