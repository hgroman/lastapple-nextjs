# Last Apple Digital Platform - Master Specification

**Version**: 2.0
**Date**: January 2025
**Status**: Pre-Implementation (Peer Reviewed)
**Research Sources**: ChatGPT, Gemini, Grok, Perplexity, Claude (x2)

---

## Executive Summary

This document is the authoritative specification for rebuilding lastapple.com as an AI-native, Git-first digital platform. It synthesizes research from five AI systems, incorporates critical peer review feedback, and defines the complete technical architecture, content model, and implementation roadmap.

### The Vision

```
Stopped at a red light.

Open Claude Code on phone.
Say: "Update my pricing by 25% across all tiers."
Claude edits content, commits to Git.

Next red light: Approve the PR.
Next red light: See changes live.

Total time: 90 seconds across 3 red lights.
```

A website as malleable as a conversation. Content as code. Claude as the editor.

### The Paradigm Shift (v2.0)

> "Don't build a website that Claude can edit. Build an **AI agent that generates a website from conversation.**"

The website isn't the product. **The conversation is the product.** The website is just the artifact.

### Why We're Rebuilding

The current WordPress site failed the malleability test. An attempted Git integration (`wp dbvc import`) overwrote the entire database—menus, options, 60,000+ lines of plugin settings. Site broke. Required backup restoration.

**Root cause**: WordPress is database-first. We need file-first.

**Solution**: Modern stack where content IS code, validated at build time, deployed on merge.

---

## Part 1: Technology Stack

### Core Framework

| Layer | Choice | Version | Rationale |
|-------|--------|---------|-----------|
| **Framework** | Next.js | 15+ (App Router) | SSR/SSG/ISR/PPR, Metadata API, Server Actions, Edge Runtime, MCP support |
| **Language** | TypeScript | Strict mode | Type safety, better Claude accuracy, IDE intelligence |
| **Runtime** | Turbopack | Default in 15+ | 53% faster startup, 94% faster HMR, 40% less memory |
| **React** | React 19 | With Compiler | Auto-memoization, no manual useMemo/useCallback |

### Styling & Components

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **CSS** | Tailwind CSS v4+ | Utility-first, CSS-first config, tree-shakes unused |
| **Components** | shadcn/ui | Radix primitives, accessible, we own the code |
| **Animation** | Framer Motion | Production-grade, gesture support, layout animations |
| **Icons** | Lucide React | Consistent, tree-shakeable |

### Content Layer (UPDATED v2.0)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Content Format** | MDX | Markdown + JSX, prose-friendly, Git-native |
| **Content Pipeline** | **Custom (gray-matter + Zod)** | Own the pipeline, no single-maintainer dependency risk |
| **Validation** | Zod | Type-safe schemas, structured error messages |
| **Relationships** | **ContentGraph Class** | First-class query API, auto-generated backlinks |

**Why we ditched Velite**: Single maintainer, 2.8k stars. If they disappear, we're stuck. Own the pipeline with 200 lines of code instead.

### Database Strategy (NEW v2.0)

**Single source of truth**: Supabase for ALL operational data.

| Data Type | Storage | Rationale |
|-----------|---------|-----------|
| Content | Git (MDX files) | Version controlled, Claude-editable |
| Feature Flags | Vercel Edge Config | <1ms reads, instant updates |
| Form Submissions | Supabase | Persistent, queryable |
| Analytics Events | Supabase | Single query interface |
| Vector Embeddings | Supabase pgvector | Same DB, no sprawl |
| User Sessions (future) | Supabase Auth | Ready when needed |

**No more**: Vercel KV + Edge Config + Supabase + separate analytics. One database.

### Infrastructure

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Hosting** | Vercel | Zero-config, ISR, Edge Functions, preview deploys |
| **Edge Config** | Vercel Edge Config | Feature flags ONLY (not data) |
| **Database** | Supabase | Postgres + pgvector + Auth + Realtime |
| **Forms** | Server Actions + React Hook Form | Native Next.js, Zod validation |
| **Email** | Resend | Developer-friendly, good deliverability |

### AI Integration

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **MCP Server** | next-devtools-mcp | Exposes app state to Claude Code |
| **Embeddings** | text-embedding-3-small | Content similarity, RAG context |
| **Vector Store** | Supabase pgvector | Same database as everything else |

### Testing & Quality (UPDATED v2.0)

| Layer | Choice | When |
|-------|--------|------|
| **Visual Regression** | Playwright | **Day 1** - Every PR gets screenshots |
| **Accessibility** | @axe-core/playwright | **Day 1** - Automated WCAG checks |
| **Bot Protection** | Vercel BotID | Critical routes only |
| **Linting** | ESLint + Prettier | **Day 1** - Pre-commit hooks |

---

## Part 2: Architecture Decisions

### 2.1 Rendering Strategy Matrix

```
┌─────────────────┬───────────┬─────────────────┬──────────────────────────┐
│ Content Type    │ Frequency │ Personalization │ Strategy                 │
├─────────────────┼───────────┼─────────────────┼──────────────────────────┤
│ Homepage        │ Hourly    │ YES (Week 1)    │ PPR + Edge Middleware    │
│ Pricing         │ Ad-hoc    │ YES (geo)       │ SSR + Edge Config        │
│ Services        │ Weekly    │ Low             │ ISR (revalidate on push) │
│ Case Studies    │ Monthly   │ None            │ SSG (truly static)       │
│ Stream          │ Daily     │ None            │ ISR (revalidate hourly)  │
│ Legal/About     │ Rarely    │ None            │ SSG                      │
└─────────────────┴───────────┴─────────────────┴──────────────────────────┘
```

### 2.2 Partial Prerendering (PPR)

PPR delivers static shells instantly from the edge while streaming dynamic content:

```typescript
// app/pricing/page.tsx
export const experimental_ppr = true;

export default function PricingPage() {
  return (
    <div>
      <PricingHeader />  {/* Static, pre-rendered at build */}

      <Suspense fallback={<PricingSkeleton />}>
        <PricingTiers />  {/* Dynamic, streamed on request */}
      </Suspense>

      <PricingFAQ />  {/* Static, pre-rendered at build */}
    </div>
  );
}
```

**Rule**: Any component using `cookies()`, `headers()`, or `searchParams` must be wrapped in Suspense. Build fails otherwise.

### 2.3 Streaming Architecture (NEW v2.0)

Beyond basic PPR—real streaming patterns:

```typescript
// Incremental content loading
export default async function HomePage() {
  return (
    <div>
      {/* Above fold: instant */}
      <Hero />

      {/* Below fold: streamed */}
      <Suspense fallback={<ServicesSkeleton />}>
        <Services />
      </Suspense>

      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>
    </div>
  );
}
```

### 2.4 Optimistic UI (NEW v2.0)

Forms show success before server confirms:

```typescript
// app/(marketing)/contact/ContactForm.tsx
'use client';

import { useOptimistic } from 'react';

export function ContactForm() {
  const [optimisticState, setOptimisticState] = useOptimistic(
    { status: 'idle' },
    (state, newStatus) => ({ status: newStatus })
  );

  async function handleSubmit(formData: FormData) {
    setOptimisticState('sending');  // Instant feedback

    const result = await submitContact(formData);  // Actual send

    if (result.error) {
      setOptimisticState('error');
    } else {
      setOptimisticState('sent');
    }
  }

  return (
    <form action={handleSubmit}>
      {optimisticState.status === 'sending' && <p>Sending...</p>}
      {optimisticState.status === 'sent' && <p>Sent!</p>}
      {/* ... */}
    </form>
  );
}
```

### 2.5 View Transitions API (FUTURE v2.0)

Preparing for Next.js 16 / React 19:

```typescript
// This is the future (not yet stable):
<Link
  href="/services/wordpress"
  style={{ viewTransitionName: 'hero' }}
>
  Learn More
</Link>

// Smooth morphing between pages, zero JavaScript needed
```

**Action**: Structure components now to support view transitions later.

---

## Part 3: Content Architecture

### 3.1 Custom Content Pipeline (UPDATED v2.0)

**We own the pipeline. No dependencies to break.**

```typescript
// lib/content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ServiceSchema, type Service } from '@/content/schema/service';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getServices(): Service[] {
  const dir = path.join(CONTENT_DIR, 'services');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

  return files.map(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: body } = matter(content);

    // Zod validates and throws descriptive errors
    const validated = ServiceSchema.parse({
      ...data,
      slug: file.replace('.mdx', ''),
      body,
    });

    return validated;
  });
}

export function getService(slug: string): Service | null {
  const services = getServices();
  return services.find(s => s.slug === slug) || null;
}
```

**200 lines. We own it. No external dependency.**

### 3.2 Directory Structure

```
content/
├── stream/                    # Daily work logs, insights (MDX)
│   ├── 2025-01-10-crm-integration.mdx
│   └── ...
├── services/                  # Service pages (MDX)
│   ├── wordpress-care.mdx
│   ├── ai-marketing.mdx
│   └── system-integration.mdx
├── case-studies/              # Client success stories (MDX)
│   └── client-x.mdx
├── pages/                     # Static pages (MDX)
│   ├── about.mdx
│   └── contact.mdx
└── schema/                    # Zod schemas (TypeScript)
    ├── stream.ts
    ├── service.ts
    └── case-study.ts
```

### 3.3 Content Schemas with Zod

```typescript
// content/schema/service.ts
import { z } from 'zod';

export const ServiceSchema = z.object({
  // Identification
  id: z.string(),
  slug: z.string(),

  // SEO
  title: z.string().min(5, {
    message: '❌ Title must be 5+ chars. Used in <title> and OG tags.'
  }),
  description: z.string().max(160, {
    message: '❌ Description max 160 chars for search snippets.'
  }),

  // Content
  icon: z.enum(['wand-2', 'zap', 'link-2'], {
    errorMap: () => ({
      message: '❌ Icon must be: wand-2, zap, or link-2. See icon registry.'
    })
  }),
  features: z.array(z.string()).min(3, {
    message: '❌ Services need 3+ features for credibility.'
  }),

  // Pricing
  priceStarting: z.number().min(0),

  // Relationships (auto-populated by ContentGraph)
  // Don't manually edit these - they're generated

  // Publishing
  published: z.boolean().default(true),
  publishedAt: z.date().optional(),

  // Body content
  body: z.string(),
});

export type Service = z.infer<typeof ServiceSchema>;
```

### 3.4 ContentGraph Class (UPDATED v2.0)

**First-class query API, not just a build script.**

```typescript
// lib/content-graph.ts
import { getServices, getCaseStudies, getStreamPosts } from './content';

interface ContentNode {
  id: string;
  type: 'service' | 'case_study' | 'stream';
  title: string;
  slug: string;
  references: string[];    // IDs this content mentions
  referencedBy: string[];  // IDs that mention this content
}

export class ContentGraph {
  private nodes: Map<string, ContentNode> = new Map();

  constructor() {
    this.build();
  }

  private build() {
    const services = getServices();
    const caseStudies = getCaseStudies();
    const posts = getStreamPosts();

    // Index all content
    for (const service of services) {
      this.nodes.set(service.id, {
        id: service.id,
        type: 'service',
        title: service.title,
        slug: service.slug,
        references: [],
        referencedBy: [],
      });
    }

    // Scan content bodies for references
    for (const cs of caseStudies) {
      const mentionedServices = this.extractReferences(cs.body, services);

      // Forward link
      const node = this.nodes.get(cs.id);
      if (node) node.references = mentionedServices;

      // Backlinks
      for (const serviceId of mentionedServices) {
        const serviceNode = this.nodes.get(serviceId);
        if (serviceNode) {
          serviceNode.referencedBy.push(cs.id);
        }
      }
    }
  }

  private extractReferences(body: string, services: Service[]): string[] {
    // Find service mentions by slug or title
    return services
      .filter(s => body.includes(s.slug) || body.includes(s.title))
      .map(s => s.id);
  }

  // Query API
  related(id: string): ContentNode[] {
    const node = this.nodes.get(id);
    if (!node) return [];

    return [...node.references, ...node.referencedBy]
      .map(refId => this.nodes.get(refId))
      .filter(Boolean) as ContentNode[];
  }

  backlinks(id: string): ContentNode[] {
    const node = this.nodes.get(id);
    if (!node) return [];

    return node.referencedBy
      .map(refId => this.nodes.get(refId))
      .filter(Boolean) as ContentNode[];
  }

  // Validation
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const [id, node] of this.nodes) {
      for (const refId of node.references) {
        if (!this.nodes.has(refId)) {
          errors.push(`❌ ${id} references non-existent content: ${refId}`);
        }
      }
    }

    return { valid: errors.length === 0, errors };
  }
}

// Singleton for use across app
export const contentGraph = new ContentGraph();
```

### 3.5 Metadata Factory (NEW v2.0)

**Centralized metadata generation—no duplication.**

```typescript
// lib/metadata.ts
import { Metadata } from 'next';
import { getService, getCaseStudy, getStreamPost } from './content';

type ContentType = 'service' | 'case_study' | 'stream' | 'page';

interface MetadataOptions {
  type: ContentType;
  slug: string;
}

export async function createMetadata({ type, slug }: MetadataOptions): Promise<Metadata> {
  const baseUrl = 'https://lastapple.com';

  let content: { title: string; description: string; ogImage?: string } | null = null;
  let path = '';

  switch (type) {
    case 'service':
      content = await getService(slug);
      path = `/services/${slug}`;
      break;
    case 'case_study':
      content = await getCaseStudy(slug);
      path = `/case-studies/${slug}`;
      break;
    case 'stream':
      content = await getStreamPost(slug);
      path = `/stream/${slug}`;
      break;
  }

  if (!content) {
    return { title: 'Not Found' };
  }

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      url: `${baseUrl}${path}`,
      images: [content.ogImage || `${baseUrl}/api/og?title=${encodeURIComponent(content.title)}`],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
  };
}

// Usage in pages - ONE LINE
// app/(marketing)/services/[slug]/page.tsx
export async function generateMetadata({ params }) {
  return createMetadata({ type: 'service', slug: params.slug });
}
```

---

## Part 4: AI-Native Patterns

### 4.1 Edit Modes (UPDATED v2.0)

**Separate context files for different edit types.**

```
.claude/
├── content-edit.md      # Rules for MDX content changes
├── config-edit.md       # Rules for pricing/settings changes
├── code-edit.md         # Rules for component changes
└── migration.md         # Rules for WordPress migration
```

```markdown
# .claude/content-edit.md

## Scope
You are editing MDX content files in /content/.

## Allowed Actions
- Edit frontmatter fields (title, description, features)
- Edit body content (markdown)
- Add new content files

## Forbidden Actions
- Edit files outside /content/
- Change schema definitions
- Add new npm packages

## Before Committing
1. Run: npm run validate:content
2. Run: npm run typecheck
3. Run: npm run build:dry

If any fail, fix the issue. Do not commit broken content.

## Related Files
When editing a service, also check:
- content/case-studies/ for mentions
- app/(marketing)/services/services.config.ts for display order
```

```markdown
# .claude/config-edit.md

## Scope
You are editing config files (pricing, navigation, theme).

## Config File Locations
- Pricing: app/(marketing)/pricing/pricing.config.ts
- Navigation: app/components/navigation.config.ts
- Theme: app/styles/tokens.css

## Allowed Actions
- Change prices (numbers only)
- Change descriptions (strings, max lengths enforced)
- Reorder items

## Forbidden Actions
- Add new tiers without explicit approval
- Change IDs (breaks analytics)
- Change structural types

## Validation
Always run: npm run validate && npm run typecheck
```

### 4.2 Pre-Commit Validation (NEW v2.0)

**Mandatory before every commit.**

```bash
# .husky/pre-commit
#!/bin/sh
npm run validate:content
npm run typecheck
npm run build:dry

# If any fail, commit is rejected
```

```json
// package.json
{
  "scripts": {
    "validate:content": "tsx scripts/validate-content.ts",
    "typecheck": "tsc --noEmit",
    "build:dry": "next build --dry-run",
    "validate": "npm run validate:content && npm run typecheck"
  }
}
```

### 4.3 Claude Context Script (NEW v2.0)

**Assemble context before editing.**

```typescript
// scripts/claude-context.ts
import { contentGraph } from '../lib/content-graph';
import { execSync } from 'child_process';
import fs from 'fs';

const targetFile = process.argv[2];

if (!targetFile) {
  console.error('Usage: tsx scripts/claude-context.ts <file>');
  process.exit(1);
}

// 1. File contents
console.log('=== FILE CONTENTS ===');
console.log(fs.readFileSync(targetFile, 'utf-8'));

// 2. Schema (if content file)
if (targetFile.includes('content/')) {
  const type = targetFile.split('/')[1]; // services, stream, etc.
  const schemaPath = `content/schema/${type.slice(0, -1)}.ts`;
  if (fs.existsSync(schemaPath)) {
    console.log('\n=== SCHEMA ===');
    console.log(fs.readFileSync(schemaPath, 'utf-8'));
  }
}

// 3. Related content
const slug = targetFile.split('/').pop()?.replace('.mdx', '');
if (slug) {
  const related = contentGraph.related(slug);
  if (related.length > 0) {
    console.log('\n=== RELATED CONTENT ===');
    related.forEach(r => console.log(`- ${r.type}: ${r.title} (${r.slug})`));
  }
}

// 4. Recent git history
console.log('\n=== RECENT CHANGES ===');
try {
  const log = execSync(`git log --oneline -5 -- "${targetFile}"`, { encoding: 'utf-8' });
  console.log(log || 'No recent changes');
} catch {
  console.log('No git history');
}

// 5. Import graph (who uses this file)
console.log('\n=== IMPORTED BY ===');
try {
  const grep = execSync(`grep -rl "${slug}" app/ --include="*.tsx" --include="*.ts" 2>/dev/null | head -5`, { encoding: 'utf-8' });
  console.log(grep || 'Not imported anywhere');
} catch {
  console.log('Not imported anywhere');
}
```

**Usage**: Before Claude edits, run `tsx scripts/claude-context.ts content/services/wordpress-care.mdx` and pipe output into context.

### 4.4 No JSON Schema Generation (UPDATED v2.0)

**Claude understands TypeScript better than JSON Schema. Give Zod directly.**

```typescript
// ❌ OLD: Generate JSON Schema, include in Claude context
// ✅ NEW: Give Claude the Zod schema directly

// content/schema/service.ts
export const ServiceSchema = z.object({
  title: z.string().min(5, 'Title too short'),
  price: z.number().min(0, 'Price must be positive'),
  // ...
});

// Claude reads THIS FILE, not a generated schema
// Zod's error messages are the documentation
```

### 4.5 File Structure for AI Navigability

```
✅ GOOD - Claude knows exactly where to look:

app/
├── (marketing)/
│   ├── pricing/
│   │   ├── page.tsx                 # Route
│   │   ├── pricing.config.ts        # Data (Claude edits this)
│   │   └── components/
│   │       ├── PricingTiers.tsx     # Layout (rarely edit)
│   │       ├── PricingCard.tsx
│   │       └── PricingFAQ.tsx
│   │
│   └── services/
│       ├── page.tsx
│       ├── [slug]/
│       │   └── page.tsx
│       ├── services.config.ts       # Data (Claude edits this)
│       └── components/
│           └── ...
│
├── components/
│   └── ui/                          # shadcn components (don't edit)
│
└── lib/
    ├── content.ts                   # Content pipeline (we own this)
    ├── content-graph.ts             # Relationship queries
    ├── metadata.ts                  # Centralized metadata factory
    └── utils.ts
```

---

## Part 5: Edge-First Architecture (UPDATED v2.0)

### 5.1 Ship Personalization Week 1

**Don't defer. Prove the architecture immediately.**

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US';
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

  // Rewrite to personalized variant
  if (request.nextUrl.pathname === '/pricing') {
    // UK visitors get GBP pricing
    if (country === 'GB') {
      return NextResponse.rewrite(
        new URL('/pricing?variant=uk', request.url)
      );
    }

    // Morning visitors get different CTA
    if (timeOfDay === 'morning') {
      return NextResponse.rewrite(
        new URL('/pricing?variant=morning', request.url)
      );
    }
  }

  // Pass context to all pages
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-country', country);
  requestHeaders.set('x-time-of-day', timeOfDay);
  requestHeaders.set('x-device-type', /mobile/i.test(request.headers.get('user-agent') || '') ? 'mobile' : 'desktop');

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}
```

### 5.2 Edge Config as Single Dynamic Truth

**Everything that changes without a deploy goes here.**

```typescript
// lib/edge-config.ts
import { get } from '@vercel/edge-config';

// Feature flags
export async function getFeatureFlags() {
  return {
    showNewPricing: await get('feature_new_pricing') ?? false,
    enableDarkMode: await get('feature_dark_mode') ?? true,
    maintenanceMode: await get('maintenance_mode') ?? false,
  };
}

// Pricing overrides (emergency changes)
export async function getPricingOverrides() {
  return await get('pricing_overrides') ?? {};
}

// Personalization rules
export async function getPersonalizationRules() {
  return await get('personalization') ?? {
    uk: { currency: 'GBP', multiplier: 0.8 },
    eu: { currency: 'EUR', multiplier: 0.9 },
  };
}
```

### 5.3 Supabase for Everything Else

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Form submissions
export async function saveFormSubmission(data: ContactFormData) {
  return supabase.from('form_submissions').insert(data);
}

// Analytics events
export async function trackEvent(event: AnalyticsEvent) {
  return supabase.from('analytics_events').insert(event);
}

// Vector search for similar content
export async function findSimilarContent(embedding: number[], limit = 5) {
  return supabase.rpc('match_content', {
    query_embedding: embedding,
    match_count: limit,
  });
}
```

---

## Part 6: SEO Architecture

### 6.1 Centralized Metadata (Using Factory)

```typescript
// app/(marketing)/services/[slug]/page.tsx
import { createMetadata } from '@/lib/metadata';
import { getService } from '@/lib/content';

// ONE LINE for metadata
export async function generateMetadata({ params }) {
  return createMetadata({ type: 'service', slug: params.slug });
}

export default async function ServicePage({ params }) {
  const service = await getService(params.slug);
  // ...
}
```

### 6.2 JSON-LD Structured Data

```typescript
// lib/structured-data.ts
import { Service, CaseStudy } from '@/content/schema';

export function generateServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Last Apple Business Solutions',
      url: 'https://lastapple.com',
    },
    areaServed: 'US',
    offers: {
      '@type': 'Offer',
      price: service.priceStarting,
      priceCurrency: 'USD',
    },
  };
}

export function generateArticleSchema(post: StreamPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Hank Groman',
    },
  };
}
```

### 6.3 Auto-Generated OG Images

```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Last Apple';
  const type = searchParams.get('type') || 'default';

  return new ImageResponse(
    (
      <div style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        color: '#fff',
        fontFamily: 'Inter',
      }}>
        <div style={{ fontSize: 60, fontWeight: 'bold', maxWidth: '80%', textAlign: 'center' }}>
          {title}
        </div>
        <div style={{ fontSize: 24, opacity: 0.8, marginTop: 20 }}>
          Last Apple Business Solutions
        </div>
        {type === 'service' && (
          <div style={{
            marginTop: 40,
            padding: '10px 20px',
            backgroundColor: '#1a6c7a',
            borderRadius: 8
          }}>
            Service
          </div>
        )}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

---

## Part 7: Forms & Email

### 7.1 Contact Form with Optimistic UI

```typescript
// app/(marketing)/contact/actions.ts
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import { headers } from 'next/headers';

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(formData: FormData) {
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for') || 'unknown';

  // Parse and validate
  const parsed = ContactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return { error: 'Invalid form data.' };
  }

  const data = parsed.data;

  // Save to Supabase
  await supabase.from('form_submissions').insert({
    ...data,
    ip,
    submitted_at: new Date().toISOString(),
  });

  // Send emails
  await Promise.all([
    resend.emails.send({
      from: 'Last Apple <hello@lastapple.com>',
      to: data.email,
      subject: 'Thanks for reaching out!',
      text: `Hi ${data.name}, we'll be in touch soon.`,
    }),
    resend.emails.send({
      from: 'Contact Form <notifications@lastapple.com>',
      to: 'hank@lastapple.com',
      subject: `New contact: ${data.name}`,
      text: `${data.name} (${data.email})\n\n${data.message}`,
    }),
  ]);

  return { success: true };
}
```

---

## Part 8: CI/CD Pipeline (UPDATED v2.0)

### 8.1 GitHub Actions - Day 1

**CI from the first commit, not week 10.**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install

      - name: Lint
        run: pnpm lint

      - name: Type Check
        run: pnpm typecheck

      - name: Validate Content
        run: pnpm validate:content

      - name: Build
        run: pnpm build

  visual-regression:
    runs-on: ubuntu-latest
    needs: validate
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - run: pnpm install

      - name: Install Playwright
        run: pnpm exec playwright install --with-deps

      - name: Wait for Vercel
        uses: patrickedqvist/wait-for-vercel-preview@v1.3.1
        id: vercel
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Visual Regression Tests
        run: pnpm test:visual
        env:
          BASE_URL: ${{ steps.vercel.outputs.url }}

      - name: Upload Screenshots
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: visual-diff
          path: test-results/
```

### 8.2 Content Validation with Graph Check

```typescript
// scripts/validate-content.ts
import { contentGraph } from '../lib/content-graph';
import { getServices, getCaseStudies, getStreamPosts } from '../lib/content';

console.log('Validating content...\n');

// 1. Schema validation (happens during getServices(), throws on error)
let services, caseStudies, posts;
try {
  services = getServices();
  caseStudies = getCaseStudies();
  posts = getStreamPosts();
  console.log(`✅ Loaded ${services.length} services, ${caseStudies.length} case studies, ${posts.length} posts`);
} catch (error) {
  console.error('❌ Schema validation failed:', error.message);
  process.exit(1);
}

// 2. Graph validation (broken references)
const { valid, errors } = contentGraph.validate();
if (!valid) {
  console.error('\n❌ Content graph validation failed:');
  errors.forEach(e => console.error(`  ${e}`));
  process.exit(1);
}
console.log('✅ Content graph valid (no broken references)');

// 3. Orphan detection (warnings, don't fail)
for (const cs of caseStudies) {
  const backlinks = contentGraph.backlinks(cs.id);
  if (backlinks.length === 0) {
    console.warn(`⚠️ Case study "${cs.id}" is not referenced by any service`);
  }
}

console.log('\n✅ All content validations passed');
```

---

## Part 9: Testing Strategy (UPDATED v2.0)

### 9.1 Playwright from Day 1

```typescript
// tests/visual.spec.ts
import { test, expect } from '@playwright/test';

const pages = ['/', '/pricing', '/services/wordpress-care', '/contact'];

for (const path of pages) {
  test(`visual: ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot(`${path.replace(/\//g, '-') || 'home'}.png`, {
      fullPage: true,
      threshold: 0.1,
    });
  });
}
```

### 9.2 Accessibility from Day 1

```typescript
// tests/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = ['/', '/pricing', '/services/wordpress-care', '/contact'];

for (const path of pages) {
  test(`a11y: ${path}`, async ({ page }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
```

---

## Part 10: Migration Strategy

### 10.1 Early Migration (UPDATED v2.0)

**Week 1: Export 5 representative pages to test schema.**

```typescript
// scripts/migrate/export-sample.ts
import WPApi from 'wpapi';
import fs from 'fs';

const wp = new WPApi({ endpoint: 'https://lastapple.com/wp-json' });

async function exportSample() {
  // Get 5 most important pages
  const pages = await wp.pages().slug([
    'wordpress-maintenance',
    'ai-marketing',
    'about',
    'contact',
    'pricing'
  ]);

  fs.writeFileSync('migration/sample-pages.json', JSON.stringify(pages, null, 2));
  console.log(`Exported ${pages.length} sample pages`);
}

exportSample();
```

**Use these to validate schemas before building the full site.**

### 10.2 Full Migration (Week 4)

```typescript
// scripts/migrate/transform-all.ts
import TurndownService from 'turndown';
import matter from 'gray-matter';
import fs from 'fs';

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

const wpPages = JSON.parse(fs.readFileSync('migration/wp-pages.json', 'utf-8'));

for (const page of wpPages) {
  const slug = page.slug;
  const content = turndown.turndown(page.content.rendered);

  const mdx = `---
title: "${page.title.rendered}"
description: "${page.excerpt.rendered.replace(/<[^>]*>/g, '').trim().slice(0, 160)}"
publishedAt: ${page.date}
updatedAt: ${page.modified}
---

${content}
`;

  fs.writeFileSync(`content/pages/${slug}.mdx`, mdx);
  console.log(`✅ ${slug}`);
}
```

---

## Part 11: Build Order (UPDATED v2.0)

**Critical changes from peer review:**
- Content model FIRST (weeks 1-2)
- CI/CD in week 3
- Red Light Test milestone added (week 5)
- Personalization ships week 1

### Week 1: Content Model + Sample Migration

```
□ Export 5 sample WordPress pages
□ Create Zod schemas for all content types
□ Build custom content pipeline (lib/content.ts)
□ Build ContentGraph class
□ Validate sample content against schemas
□ Iterate on schemas based on real content
```

### Week 2: Foundation + CI

```
□ Initialize Next.js 15+ with TypeScript strict mode
□ Install Tailwind CSS v4, shadcn/ui
□ Create .claude/ directory with edit modes
□ Set up ESLint, Prettier, Husky pre-commit hooks
□ Configure GitHub Actions CI (lint, typecheck, build)
□ Install Playwright, create first visual test
□ Deploy empty shell to Vercel
```

### Week 3: Pages + Personalization

```
□ Build homepage with PPR
□ Implement middleware with geo/time/device context
□ Ship basic personalization (pricing variant for UK)
□ Build services listing and detail pages
□ Build pricing page with Edge Config variants
□ Create metadata factory
```

### Week 4: Full Migration + Content

```
□ Export all WordPress content
□ Run full migration script
□ Validate all content against schemas
□ Generate 301 redirect map
□ Build stream (blog) pages
□ Build case study pages
```

### Week 5: Red Light Test

```
□ Set up Claude Code on phone
□ Attempt 10 different content edits
□ Measure time from prompt → live
□ Document every friction point
□ Fix blockers immediately
□ Iterate until <2 minutes consistently
```

### Week 6: Forms + Email

```
□ Implement contact form with optimistic UI
□ Set up Resend for email
□ Set up Supabase for form storage
□ Add rate limiting
□ Test email deliverability
```

### Week 7: SEO + Analytics

```
□ Verify metadata on all pages
□ Add JSON-LD structured data
□ Set up OG image generation
□ Configure sitemap and robots.txt
□ Set up GA4
□ Create analytics tracking in Supabase
```

### Week 8: Polish + Performance

```
□ Lighthouse audit (target 90+ all categories)
□ Implement dark mode
□ Add reduced-motion support
□ Optimize images with next/image
□ Review and optimize bundle size
```

### Week 9: Accessibility

```
□ Full keyboard navigation audit
□ ARIA attributes review
□ Screen reader testing (VoiceOver)
□ Axe automated tests passing
□ Manual testing with real users
```

### Week 10: Content Intelligence

```
□ Set up Supabase pgvector
□ Generate embeddings for all content
□ Create similar content queries
□ Build claude-context.ts script
□ Test RAG context injection
```

### Week 11: Launch Prep

```
□ Final content review
□ DNS cutover planning
□ 301 redirect verification
□ Performance baseline documentation
□ Rollback plan documented
```

### Week 12: Launch

```
□ DNS cutover
□ Monitor errors
□ Monitor 404s
□ Monitor performance
□ Celebrate 🎉
```

---

## Part 12: Success Criteria

### Functional Requirements

| Requirement | Target | Validation |
|-------------|--------|------------|
| Red Light Test | < 2 minutes | End-to-end content edit via Claude |
| Build-time safety | 100% | Invalid content fails build |
| Pre-commit validation | Mandatory | Husky hooks enforce |
| Content relationships | Automatic | ContentGraph generates backlinks |

### Performance Requirements

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Performance | 90+ | Lighthouse CI |
| Lighthouse Accessibility | 90+ | Lighthouse CI |
| Lighthouse SEO | 90+ | Lighthouse CI |
| First Contentful Paint | < 1.5s | Lighthouse |
| Time to Interactive | < 3s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |

### Accessibility Requirements

| Requirement | Standard | Validation |
|-------------|----------|------------|
| WCAG Level | AA | Axe-core |
| Keyboard Navigation | Full | Manual + Playwright |
| Screen Reader | VoiceOver compatible | Manual |
| Reduced Motion | Respected | CSS check |

---

## Part 13: Project Structure (UPDATED v2.0)

```
lastapple.com/
├── .claude/                     # AI edit mode contexts
│   ├── content-edit.md
│   ├── config-edit.md
│   ├── code-edit.md
│   └── migration.md
│
├── .github/
│   └── workflows/
│       └── ci.yml               # CI from day 1
│
├── .husky/
│   └── pre-commit               # Mandatory validation
│
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── pricing/
│   │   ├── services/
│   │   ├── stream/
│   │   ├── about/
│   │   └── contact/
│   │
│   ├── api/
│   │   ├── og/
│   │   └── analytics/
│   │
│   ├── components/
│   │   └── ui/
│   │
│   ├── lib/
│   │   ├── content.ts           # Custom pipeline (we own it)
│   │   ├── content-graph.ts     # Query API
│   │   ├── metadata.ts          # Factory
│   │   ├── supabase.ts          # Single database
│   │   ├── edge-config.ts       # Feature flags only
│   │   └── utils.ts
│   │
│   └── styles/
│
├── content/
│   ├── stream/
│   ├── services/
│   ├── case-studies/
│   ├── pages/
│   └── schema/                  # Zod schemas (give to Claude directly)
│
├── scripts/
│   ├── validate-content.ts
│   ├── claude-context.ts        # Context assembly for Claude
│   └── migrate/
│
├── tests/
│   ├── visual.spec.ts           # Day 1
│   └── a11y.spec.ts             # Day 1
│
├── middleware.ts                # Personalization from week 1
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Appendix A: Key Changes from v1.0

| Area | v1.0 | v2.0 | Reason |
|------|------|------|--------|
| Content Pipeline | Velite | Custom (gray-matter + Zod) | Single-maintainer risk |
| Database | Scattered | Supabase for all | Single source of truth |
| Content Graph | Build script | ContentGraph class | First-class query API |
| Metadata | Per-page | Factory function | No duplication |
| AI Context | Single .claude.md | .claude/ directory | Edit modes |
| Schema | JSON Schema generation | Zod directly | Claude understands TS better |
| Build Order | Foundation first | Content model first | Structure drives architecture |
| CI/CD | Week 10 | Week 2 | From day 1 |
| Red Light Test | Week 11 | Week 5 | Dedicated milestone |
| Personalization | Phase 2-3 | Week 1 | Prove architecture early |
| Testing | Week 9 | Day 1 | Playwright from start |

---

## Appendix B: Research Sources

This specification synthesizes insights from:

1. **ChatGPT**: Template analysis, Velite vs Contentlayer
2. **Gemini**: 2026 architecture (Turbopack, PPR, MCP)
3. **Grok**: Execution blueprint, AI patterns, build order
4. **Perplexity**: Strategic validation, enhancements
5. **Claude (Round 1)**: Integration and synthesis
6. **Claude (Round 2)**: Critical peer review, paradigm shift

Full research documents in `/docs/03-reference/ai-research/`.

---

**Document Status**: Ready for Implementation (Peer Reviewed)
**Version**: 2.0
**Next Step**: Week 1 - Content Model + Sample Migration
**Estimated Timeline**: 12 weeks
**Team**: Hank Groman + Claude Code
