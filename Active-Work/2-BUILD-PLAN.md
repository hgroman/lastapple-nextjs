# Build Plan: Foundational Building Blocks

**This is the step-by-step execution plan.**
**Each step has a deliverable. Each step is tested before moving on.**

---

## Step 1: Fix the Build

**Problem:** Schema files were deleted. Build fails.
**Deliverable:** `npm run build` passes.

### 1.1 Create content/schema/stream.ts
```typescript
import { z } from 'zod';

export const StreamPostSchema = z.object({
  title: z.string().min(5),
  description: z.string().max(160),
  slug: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category: z.enum(['ai', 'seo', 'wordpress', 'automation']).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  image: z.string().optional(),
  body: z.string(),
});

export type StreamPost = z.infer<typeof StreamPostSchema>;
```

### 1.2 Create content/schema/service.ts
```typescript
import { z } from 'zod';

export const ServiceSchema = z.object({
  title: z.string().min(5),
  description: z.string().max(160),
  slug: z.string(),
  icon: z.string(),
  category: z.enum(['wordpress', 'ai', 'integration']),
  features: z.array(z.string()).min(3),
  pricing: z.object({
    starting: z.number().optional(),
    unit: z.string().optional(),
  }).optional(),
  cta: z.object({
    text: z.string(),
    href: z.string(),
  }).optional(),
  published: z.boolean().default(true),
  order: z.number().default(0),
  body: z.string(),
});

export type Service = z.infer<typeof ServiceSchema>;
```

### 1.3 Create content/schema/solution.ts
```typescript
import { z } from 'zod';

export const SolutionSchema = z.object({
  title: z.string().min(5),
  description: z.string().max(160),
  slug: z.string(),
  icon: z.string(),
  category: z.enum(['ai', 'integration', 'automation', 'data']),
  outcomes: z.array(z.string()).min(2),
  caseStudy: z.object({
    client: z.string(),
    outcome: z.string(),
  }).optional(),
  published: z.boolean().default(true),
  order: z.number().default(0),
  body: z.string(),
});

export type Solution = z.infer<typeof SolutionSchema>;
```

### 1.4 Create placeholder content files

**content/stream/placeholder.mdx:**
```mdx
---
title: "Placeholder Post"
description: "This is a placeholder for build testing"
publishedAt: "2026-01-11"
featured: false
published: false
---

Placeholder content.
```

**content/services/placeholder.mdx:**
```mdx
---
title: "Placeholder Service"
description: "This is a placeholder for build testing"
icon: "wrench"
category: "wordpress"
features:
  - Feature one
  - Feature two
  - Feature three
published: false
order: 99
---

Placeholder content.
```

**content/solutions/placeholder.mdx:**
```mdx
---
title: "Placeholder Solution"
description: "This is a placeholder for build testing"
icon: "bot"
category: "ai"
outcomes:
  - Outcome one
  - Outcome two
published: false
order: 99
---

Placeholder content.
```

### 1.5 Test
```bash
npm run build
```
**Pass criteria:** Build completes without errors.

---

## Step 2: Create Base Layout Components

**Problem:** No consistent way to render content pages.
**Deliverable:** Layout wrappers for each content type.

### 2.1 Create src/components/content/layouts/BaseLayout.tsx
```typescript
// Shared layout wrapper with consistent spacing, max-width, etc.
// Takes children, optional hero props
```

### 2.2 Create src/components/content/layouts/StreamLayout.tsx
```typescript
// For blog posts
// - Title
// - Date + reading time
// - Tags
// - Body content
// - Author bio
// - Related posts
```

### 2.3 Create src/components/content/layouts/ServiceLayout.tsx
```typescript
// For service pages
// - Hero with title + description
// - Features grid
// - Pricing (optional)
// - CTA
// - Body content (prose)
```

### 2.4 Create src/components/content/layouts/SolutionLayout.tsx
```typescript
// For solution pages
// - Hero with title + description
// - Outcomes list
// - Case study (optional)
// - CTA
// - Body content (prose)
```

### 2.5 Create src/components/content/index.ts
```typescript
// Export all layouts and components
export * from './layouts/BaseLayout';
export * from './layouts/StreamLayout';
export * from './layouts/ServiceLayout';
export * from './layouts/SolutionLayout';
```

### 2.6 Test
- Import layouts in a test page
- Verify they render without errors
- Check styling matches design system

---

## Step 3: Create Block Components

**Problem:** Need reusable sections for pages.
**Deliverable:** Component library for content blocks.

### 3.1 Create src/components/content/blocks/Hero.tsx
```typescript
// Props: title, subtitle, backgroundVariant, cta
// Matches existing homepage hero styling
```

### 3.2 Create src/components/content/blocks/FeatureGrid.tsx
```typescript
// Props: features (array of { icon, title, description })
// 2-3 column responsive grid
```

### 3.3 Create src/components/content/blocks/PricingTable.tsx
```typescript
// Props: tiers (array of { name, price, features, cta })
// Reuse/adapt existing PricingSection
```

### 3.4 Create src/components/content/blocks/ProcessSteps.tsx
```typescript
// Props: steps (array of { number, title, description })
// Numbered vertical or horizontal steps
```

### 3.5 Create src/components/content/blocks/CTASection.tsx
```typescript
// Props: title, description, buttonText, buttonHref
// Full-width CTA with background
```

### 3.6 Create src/components/content/blocks/CaseStudy.tsx
```typescript
// Props: client, challenge, solution, outcome, quote
// Card-style case study display
```

### 3.7 Create src/components/content/blocks/FAQ.tsx
```typescript
// Props: items (array of { question, answer })
// Accordion-style FAQ
```

### 3.8 Update src/components/content/index.ts
```typescript
// Add all block exports
export * from './blocks/Hero';
export * from './blocks/FeatureGrid';
// etc.
```

### 3.9 Test
- Create a test page using multiple blocks
- Verify responsive behavior
- Verify dark theme styling

---

## Step 4: Create Prose Components

**Problem:** MDX body content needs styled elements.
**Deliverable:** Components for inline content styling.

### 4.1 Create src/components/content/prose/Callout.tsx
```typescript
// Props: type ('info' | 'warning' | 'success'), title, children
// Styled callout box
```

### 4.2 Create src/components/content/prose/CodeBlock.tsx
```typescript
// Props: language, code
// Syntax highlighted code block
// Use shiki or prism
```

### 4.3 Create src/components/content/prose/Table.tsx
```typescript
// Styled table component
// Responsive, dark theme
```

### 4.4 Create MDX component mapping
```typescript
// src/lib/mdx-components.ts
export const mdxComponents = {
  h1: (props) => <h1 className="..." {...props} />,
  h2: (props) => <h2 className="..." {...props} />,
  p: (props) => <p className="..." {...props} />,
  ul: (props) => <ul className="..." {...props} />,
  ol: (props) => <ol className="..." {...props} />,
  a: (props) => <Link className="..." {...props} />,
  code: CodeBlock,
  table: Table,
  Callout,
  // ... etc
};
```

### 4.5 Test
- Render sample MDX with all element types
- Verify styling consistency

---

## Step 5: Create Route Pages

**Problem:** Only homepage exists. All other URLs 404.
**Deliverable:** All routes render.

### 5.1 Create src/app/stream/page.tsx
```typescript
// Archive page
// - List all published posts
// - Pagination (10 per page)
// - Filter by category (optional)
```

### 5.2 Create src/app/stream/[slug]/page.tsx
```typescript
// Post detail page
// - generateStaticParams() for all posts
// - generateMetadata() for SEO
// - StreamLayout wrapper
// - MDX content rendering
```

### 5.3 Create src/app/services/page.tsx
```typescript
// Services listing
// - Grid of all services
// - Links to detail pages
```

### 5.4 Create src/app/services/[slug]/page.tsx
```typescript
// Service detail page
// - generateStaticParams()
// - generateMetadata()
// - ServiceLayout wrapper
// - MDX content
```

### 5.5 Create src/app/solutions/page.tsx
```typescript
// Solutions listing
// - Grid of all solutions
// - Filter by category
```

### 5.6 Create src/app/solutions/[slug]/page.tsx
```typescript
// Solution detail page
// - generateStaticParams()
// - generateMetadata()
// - SolutionLayout wrapper
// - MDX content
```

### 5.7 Create src/app/about/page.tsx
```typescript
// About page
// - Company story
// - Team (Hank)
// - Values
```

### 5.8 Create src/app/contact/page.tsx
```typescript
// Contact page
// - Contact form (placeholder, functional later)
// - Contact info
// - Map (optional)
```

### 5.9 Create src/app/privacy/page.tsx
```typescript
// Privacy policy
// - Static content
```

### 5.10 Create src/app/terms/page.tsx
```typescript
// Terms of use
// - Static content
```

### 5.11 Test
```bash
npm run dev
# Visit each route, verify no 404s
# Verify layouts render correctly
```

---

## Step 6: SEO Infrastructure

**Problem:** No sitemap, minimal metadata.
**Deliverable:** Full SEO parity with WordPress.

### 6.1 Add generateMetadata to all dynamic routes
```typescript
// Each [slug]/page.tsx gets:
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      // ...
    },
  };
}
```

### 6.2 Create src/app/sitemap.ts
```typescript
import { getStreamPosts, getServices, getSolutions } from '@/lib/content';

export default async function sitemap() {
  const posts = await getStreamPosts();
  const services = await getServices();
  const solutions = await getSolutions();

  return [
    { url: 'https://lastapple.com', lastModified: new Date() },
    { url: 'https://lastapple.com/stream', lastModified: new Date() },
    ...posts.map(post => ({
      url: `https://lastapple.com/stream/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt,
    })),
    // ... services, solutions
  ];
}
```

### 6.3 Create src/app/robots.ts
```typescript
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://lastapple.com/sitemap.xml',
  };
}
```

### 6.4 Add JSON-LD structured data
```typescript
// In layout.tsx or per-page
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Last Apple Business Solutions",
  // ...
})}
</script>
```

### 6.5 Create src/app/feed.xml/route.ts
```typescript
// RSS feed for stream posts
```

### 6.6 Test
- Visit /sitemap.xml
- Visit /robots.txt
- Check meta tags in browser dev tools
- Validate structured data with Google's tool

---

## Step 7: Contact Form

**Problem:** No way for users to contact.
**Deliverable:** Working contact form with email delivery.

### 7.1 Create src/components/ContactForm.tsx
```typescript
// Form fields: name, email, phone (optional), message
// Zod validation
// Submit handler
// Loading/success/error states
```

### 7.2 Create src/app/api/contact/route.ts
```typescript
// POST handler
// Validate input with Zod
// Send email via Resend
// Return success/error
```

### 7.3 Set up Resend
```bash
npm install resend
# Add RESEND_API_KEY to .env.local
```

### 7.4 Integrate form into contact page

### 7.5 Test
- Submit form
- Verify email received at hank@lastapple.com
- Test validation errors
- Test network error handling

---

## Step 8: Redirects

**Problem:** WordPress URLs will break.
**Deliverable:** All old URLs redirect to new structure.

### 8.1 Update next.config.ts
```typescript
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/wordpress-maintenance',
        destination: '/services/wordpress-maintenance',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/stream',
        permanent: true,
      },
      // ... all 40+ redirects from SITE-ARCHITECTURE.yaml
    ];
  },
};
```

### 8.2 Test
```bash
npm run dev
curl -I http://localhost:3000/wordpress-maintenance
# Should return 308 redirect
```

---

## Step 9: Analytics

**Problem:** No tracking.
**Deliverable:** Clarity + GA4 working.

### 9.1 Get IDs from WordPress
```bash
ssh ... "wp option get microsoft_clarity_project_id"
ssh ... "wp option get google_analytics_id"
```

### 9.2 Add scripts to src/app/layout.tsx
```typescript
<Script src="https://www.clarity.ms/tag/PROJECT_ID" />
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
```

### 9.3 Test
- Load site
- Check network tab for tracking calls
- Verify data appears in Clarity/GA dashboards

---

## Execution Order

| Step | Depends On | Time | Deliverable |
|------|------------|------|-------------|
| 1 | Nothing | 30 min | Build passes |
| 2 | Step 1 | 2 hrs | Layout components |
| 3 | Step 2 | 2 hrs | Block components |
| 4 | Step 3 | 1 hr | Prose components |
| 5 | Steps 2-4 | 2 hrs | All routes render |
| 6 | Step 5 | 1 hr | SEO complete |
| 7 | Step 5 | 1 hr | Contact form works |
| 8 | Step 5 | 30 min | Redirects work |
| 9 | Step 5 | 30 min | Analytics work |

**Total infrastructure time: ~10 hours**

---

## After Infrastructure: Content Migration

Only after Steps 1-9 are complete do we start migrating actual WordPress content.

Each page migration follows:
1. Export from WordPress
2. Clean HTML
3. Write MDX with frontmatter
4. Apply appropriate layout
5. Test locally
6. Commit

---

## Current Position

```
Step 1: COMPLETE
Step 2: COMPLETE
Step 3: COMPLETE
Step 4: COMPLETE
Step 5: COMPLETE
Step 6: COMPLETE
Step 7: COMPLETE
Step 8: COMPLETE
Step 9: COMPLETE
Step 10: IN PROGRESS ← CURRENT (Rich Page Templates)
```

**Next action:** Execute Step 10.1 — Download missing WordPress webp images
**Work order:** Active-Work/WORK-ORDER-RICH-TEMPLATES.md
