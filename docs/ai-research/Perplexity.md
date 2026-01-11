I'm going to give you comprehensive peer review across all your questions. This is high-caliber work with excellent strategic thinking, but there are several critical gaps and opportunities at the edge of current capability.

Let me structure this as: **Validation + Critiques + Opportunities + Blind Spots + Recommended Build Order**.

***

## PART 1: ARCHITECTURE VALIDATION

### The Stack - You Got This Right ✓

Your core stack choices are **genuinely 2025-current**:

- **Next.js 15 App Router**: Correct. ISR, Server Actions, partial prerendering are the right abstractions for this use case.
- **MDX + Velite**: This is the right call over headless CMS for your constraints. Files-in-Git beats database for AI editing. Velite's Zod validation is production-grade.
- **shadcn/ui + Tailwind v4**: Solid. You own the component code, tree-shaking works, accessibility baseline is there.
- **Vercel**: Right platform. Preview deploys + Edge Functions matter for what you'll build next.

**What I wouldn't change here:** The foundation is sound.

***

## PART 2: CRITICAL GAPS (The Hard Truths)

### Gap 1: Your Content Model Is Underbaked

**Problem**: Your content architecture (Stream → Evergreen flow) sounds good conceptually but lacks:

1. **Relationship metadata** - How do stream posts link to services? How do case studies reference services? Your current MDX model treats each file as isolated.

2. **Query capability** - You'll want to ask: "Show me all stream posts tagged 'AI integration'" or "Which services are mentioned in this case study?" MDX + Velite doesn't give you a query layer.

3. **Content versioning** - Git versioning is great for code. For content, you might want to understand *which services this case study showcases* or *when this pricing page last changed context*.

**What's missing:**

```typescript
// You have this (files)
// You need this (relationships)

interface ServiceReference {
  serviceId: string;
  context: "featured_in" | "mentioned_in" | "prerequisite_for";
  relevanceScore?: number;
}

interface ContentNode {
  id: string;
  type: "stream" | "service" | "case_study";
  frontmatter: Record<string, any>;
  relatedContent: ContentNode[];  // ← You don't have this
  backlinks: ContentNode[];        // ← Or this
}
```

**Recommendation**: Before you build, add a **content graph layer** on top of Velite:

```typescript
// velite.config.ts - pseudocode
const defineCollection = (name: string) => {
  return {
    loader: globSource(),
    schema: z.object({
      // frontmatter
      relatedServices: z.array(z.string()).optional(),  // Service IDs
      tags: z.array(z.string()),
      // ...
    }),
  };
};

// Then post-build, generate a graph
// build/content-graph.json
{
  "services": { "wordpress-care": {...}, ... },
  "caseStudies": {
    "client-x": {
      "referencedServices": ["wordpress-care"],
      "relatedPosts": ["2024-01-10-..."]
    }
  }
}
```

This doesn't add complexity at edit time (Claude still edits files), but gives you query power later.

### Gap 2: AI Editing Without Structure Constraints

**Problem**: You can tell Claude "update pricing by 25%" but what prevents Claude from:
- Changing the pricing *structure* (e.g., swapping tier names)?
- Accidentally breaking frontmatter?
- Creating inconsistent units or formats?

**Current protection**: Velite validation at build time. That's good but *reactive*. By the time the build fails, Claude has already pushed a PR with broken content.

**What's missing**: **AI-specific schema enforcement** before commit.

```typescript
// services/wordpress-care.mdx
---
pricing:
  tiers:
    - name: "Starter"
      price: 299
      price_currency: "USD"  // ← Fixed, not free text
      description: "For small sites"
      features: ["24/7 monitoring", "security updates"]
---

// ↓ This schema tells Claude EXACTLY what's editable
interface PricingTier {
  name: Enum<"Starter" | "Growth" | "Enterprise">;  // ← Only these
  price: number;  // ← Numeric only
  price_currency: Literal<"USD">;  // ← Locked
  description: string;  // ← Free text OK here
  features: Array<PricingFeature>;  // ← Enum of valid features
}
```

**Recommendation**:

1. Generate a **JSON Schema** from your Zod schemas
2. Version it in the repo: `schema/pricing-schema.json`
3. In your Claude context/system prompt, include the schema
4. Claude knows: "prices can only be numbers, currency is locked to USD, feature list is predefined"

This is **pre-emptive validation** instead of reactive.

### Gap 3: The Rendering Strategy Is Too Simplistic

**Problem**: You're thinking SSG (all pages pre-rendered at build time). This works for *static* content but breaks for:

- Personalization (geo-aware content requires request-time decisions)
- Dynamic data (e.g., latest client testimonials from external CMS)
- Real-time updates (pricing changes should go live immediately, not wait for rebuild)

**What's missing**: A **tiered rendering strategy**:

```
─────────────────────────────────────────────────────────
Content Type          │ Rendering Strategy
─────────────────────────────────────────────────────────
Homepage              │ PPR + Edge Revalidation
Pricing page          │ SSR (request-time personalization)
Service pages         │ ISR (revalidate on content commit)
Case studies          │ SSG (truly static)
Stream posts          │ ISR (revalidate hourly)
─────────────────────────────────────────────────────────
```

**The gap**: You haven't specified *which strategy for which content*. If you want edge-first personalization, pricing can't be pure SSG.

### Gap 4: Form Handling Is Incomplete

**Current spec**: "Server Actions + honeypot"

**Missing**:
- Email service integration (Resend, SendGrid)
- Form submission validation and storage (where do submissions live?)
- Rate limiting on the Server Action
- Spam detection beyond honeypot
- Email templating (confirmation, admin notification)

This isn't sexy, but it's 30% of your "contact me" user experience.

***

## PART 3: CUTTING-EDGE OPPORTUNITIES (2025 Capabilities)

### Opportunity 1: Next.js Partial Prerendering (PPR)

**What it is**: PPR (introduced Next.js 14, improved in 15) lets you pre-render the *static shell* of a page at build time, then stream dynamic content on request.

**Example for your use case:**

```typescript
// app/pricing/page.tsx
export const experimental_ppr = true;  // ← Enable PPR

export default function PricingPage() {
  return (
    <div>
      <PricingHeader />  {/* Static, pre-rendered */}

      <Suspense fallback={<PricingSkeleton />}>
        <PricingTiers />  {/* Dynamic, rendered on request */}
      </Suspense>

      <PricingFAQ />  {/* Static, pre-rendered */}
    </div>
  );
}
```

**Why this matters for your goals**:
- Homepage renders instantly (pre-rendered shell)
- Personalization layer streams in (geo-aware pricing, user-specific CTAs)
- No full SSR latency
- Combines SSG speed + SSR flexibility

**Status**: Still experimental, but Vercel is moving this toward stable. If you're building for 2025+, this is the pattern to bake in from day one.

### Opportunity 2: Edge Config for Zero-Latency Feature Flags

**Current approach**: You'd need to hardcode decisions about personalization, or use LaunchDarkly (adds latency + cost).

**Better approach**: Vercel Edge Config

```typescript
// vercel.json
{
  "edgeConfig": [
    {
      "key": "pricingMultiplier",
      "value": 1.0
    },
    {
      "key": "geoTargeting",
      "value": {
        "us-east": { "cta": "Get Started", "pricing_variant": "standard" },
        "eu": { "cta": "Commencer", "pricing_variant": "eur" }
      }
    }
  ]
}
```

**In middleware:**

```typescript
// middleware.ts
import { get } from '@vercel/edge-config';

export async function middleware(request: NextRequest) {
  const geo = request.geo?.country;
  const pricingConfig = await get('geoTargeting');

  const userConfig = pricingConfig[geo] || pricingConfig['default'];

  request.nextUrl.searchParams.set('variant', userConfig.pricing_variant);
  return NextResponse.next();
}
```

**Why this for you**:
- Changes live immediately (no rebuild)
- Zero latency (Edge config is globally distributed)
- Claude can update feature flags without touching code
- Perfect for the "red light test" - you change pricing, it's live in seconds

### Opportunity 3: Semantic Content and RAG

**What you're missing**: Right now, Claude edits files blindly. But you could give Claude *understanding* of your content structure.

**State-of-the-art approach**:

1. At build time, generate **embeddings** for all your content
2. Store embeddings in a vector DB (Supabase pgvector, Pinecone, local SQLite with vector support)
3. When Claude is about to edit, query similar content: "Here are related services and case studies"

```typescript
// build/generate-embeddings.ts (runs at build time)
import { embed } from '@ai-sdk/anthropic';
import * as fs from 'fs';

for (const service of services) {
  const embedding = await embed({
    model: 'text-embedding-3-small',
    value: service.content,
  });

  vectorDb.upsert({
    id: service.id,
    vector: embedding.embedding,
    meta { type: 'service', slug: service.slug },
  });
}

// app/api/ai/context.ts
export async function POST(req: Request) {
  const { query } = await req.json();

  const similar = await vectorDb.search(query, { limit: 5 });

  return Response.json({
    context: similar,  // Claude gets related content automatically
  });
}
```

**Why this matters**: When Claude is editing a case study, you can auto-inject context: "This case study mentions these services. Here's related stream content. Keep naming consistent."

### Opportunity 4: Real-Time Collaboration with MDX

**Current workflow**: Claude commits → You review → Merge

**Better workflow**: Claude commits → Automatic preview → You review live site → Approve

Vercel already does this with preview deploys. But you could add:

```typescript
// next.config.js
module.exports = {
  // ... config
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,  // Keep preview for 60s
    pagesBufferLength: 5,
  },
};
```

This is already in your stack. The gap: **automated validation reporting**.

```typescript
// vercel.json - add pre-flight checks
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node",
      "config": {
        "zeroConfig": true
      }
    }
  ],
  "env": {
    "CONTENT_VALIDATION": "strict"
  }
}
```

And a GitHub Action that comments on every PR:

```yaml
# .github/workflows/content-check.yml
- name: Content Validation
  run: |
    npm run validate:content
    npm run lighthouse

    # Comment on PR with results
```

This means: **Every PR to your content automatically gets a validation report** without you lifting a finger.

***

## PART 4: EDGE-FIRST PERSONALIZATION - THE ARCHITECTURE

You asked: "How do we build edge-first personalization without overengineering?"

**Answer**: You don't need to decide now. Build the foundation to enable it later.

### Three-Phase Approach

**Phase 1 (Now): Foundation**
- Static content in Git (you're doing this)
- Vercel Edge Config for simple flags
- Server-side geolocation awareness (request.geo)
- Design system supports dark/light, reduces motion

```typescript
// app/middleware.ts - Phase 1
export async function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US';

  // Add geo context to request
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-geo', country);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
```

**Phase 2 (Month 2): Intelligence Layer**
- Add vector embeddings (as described above)
- Track which content resonates (basic analytics hook)
- Edge Config expands to include content variants

```typescript
// app/api/analytics/track.ts
export async function POST(req: Request) {
  const { page, country, device, timeOfDay } = await req.json();

  // Store in analytics DB - later you'll query patterns
  await analyticsDb.log({
    page,
    country,
    device,
    timeOfDay,
    timestamp: new Date(),
  });
}

// Later: "What content performs best for EU visitors on mobile?"
```

**Phase 3 (Quarter 2): Personalization Engine**
- Real-time content variants based on analytics
- A/B testing framework
- Audience segments (returning visitors, referral source, etc.)

```typescript
// app/services/[slug]/page.tsx - Phase 3
export default async function ServicePage({ params }: Props) {
  const country = headers().get('x-user-geo');
  const variant = await getContentVariant({
    slug: params.slug,
    country,
    device: await detectDevice(),
  });

  return <ServiceContent variant={variant} />;
}
```

### The Right Foundation Now

To enable all this later without rewrite:

1. **Store geo context in middleware** (you'll use it)
2. **Add analytics tracking endpoints** (you'll need the data)
3. **Build Edge Config into your workflow** (free, zero latency)
4. **Structure content for variants** (extra field in frontmatter: `variants: { eu: {...}, us: {...} }`)
5. **Create a feature flag system** (even if unused initially)

**Do NOT do now**:
- Don't add personalization logic to rendering
- Don't build A/B testing infrastructure
- Don't implement audience segmentation

You're building **optionality**, not implementation.

***

## PART 5: AI-NATIVE PATTERNS - MAKING CODE CLAUDEABLE

This is critical for your "red light test."

### Pattern 1: File Structure That Tells a Story

**Bad for Claude** (currently how most sites are structured):
```
app/
  components/
    Header.tsx       ← Where? In app? Layout?
    PricingCard.tsx  ← 2000-line component
    Form.tsx
  pages/
    pricing.tsx      ← Layout? Route?
  lib/
    utils.ts         ← 3000 lines of utils
```

Claude gets lost. "Where do I edit pricing? Is it in components/PricingCard, or is there a config file?"

**Good for Claude** (what you should build):
```
app/
  (marketing)/
    pricing/
      page.tsx                  ← Only this file
      pricing.config.ts         ← Pricing data (importable)
      components/
        PricingTiers.tsx         ← Only pricing-related components
        PricingFAQ.tsx
        PricingHero.tsx

  (admin)/
    content-editor/             ← If you add this later
      page.tsx

components/
  design-system/                ← Reusable UI primitives
    Button.tsx
    Card.tsx
    Typography.tsx
```

**Rule**: Every file is small, focused, and has **one reason to change**.

### Pattern 2: Content Extraction to Config Files

```typescript
// ❌ BAD - pricing hardcoded in component
export function PricingTiers() {
  return (
    <div>
      <div className="tier">
        <h3>Starter</h3>
        <p>$299/month</p>
        <ul>
          <li>24/7 monitoring</li>
          <li>security updates</li>
        </ul>
      </div>
    </div>
  );
}

// ✅ GOOD - pricing in config, component is layout-only
// app/pricing/pricing.config.ts
export const PRICING_TIERS = [
  {
    name: "Starter",
    price: 299,
    description: "For small sites",
    features: ["24/7 monitoring", "security updates"],
  },
  // ...
] as const;

// app/pricing/components/PricingTiers.tsx
import { PRICING_TIERS } from '../pricing.config';

export function PricingTiers() {
  return (
    <div className="space-y-6">
      {PRICING_TIERS.map((tier) => (
        <PricingCard key={tier.name} tier={tier} />
      ))}
    </div>
  );
}
```

**Why**: Claude can edit `pricing.config.ts` without touching React code. Safer, faster, less risky.

### Pattern 3: Type-Driven Content

```typescript
// app/services/services.config.ts
import { z } from 'zod';

export const ServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.enum(['wand-2', 'zap', 'link-2']),  // ← Locked enum
  features: z.array(z.string()),
  priceStarting: z.number().min(0),
  caseStudies: z.array(z.string()).optional(),  // ← IDs that reference case studies
});

export const SERVICES = [
  {
    id: 'wordpress-care',
    name: 'WordPress Care',
    description: 'Proactive maintenance, security, optimization.',
    icon: 'wand-2',
    features: [
      'Daily backups',
      'Security monitoring',
      'Performance optimization',
    ],
    priceStarting: 299,
    caseStudies: ['case-study-1', 'case-study-2'],
  },
  // ...
] as const satisfies z.infer<typeof ServiceSchema>[];
```

**Why**:
- Zod validates at build time
- TypeScript gives Claude IDE-level hints
- Icons are locked to valid set (can't add typo)
- Claude knows `caseStudies` must reference real case study IDs

### Pattern 4: Claude-Aware Comments

```typescript
// app/pricing/pricing.config.ts

// IMPORTANT FOR CLAUDE:
// ────────────────────────────────────────────────
// When updating prices, remember:
// 1. All prices are in USD and must be numbers
// 2. The email address below is static, don't change
// 3. Feature descriptions max 60 characters
// 4. If you add a new tier, update the PRICING_TIERS array AND HomePageTiers array
// 5. Annually pricing is always PRICE * 10 (not flexible)
//
// Related files:
// - app/(marketing)/page.tsx (uses PRICING_TIERS)
// - app/(admin)/dashboard/pricing.tsx (displays config)
// ────────────────────────────────────────────────

export const SUPPORT_EMAIL = 'support@lastapple.com';  // ← Static, don't change

export const PRICING_TIERS = [
  {
    name: 'Starter',
    priceMonthly: 299,
    priceAnnually: 2990,  // Locked to monthly * 10
    features: [
      '24/7 monitoring',          // Max 60 chars
      'Weekly backups',
      'Basic optimization',
    ],
  },
  // ...
];

// Related: Check HomePageTiers in app/(marketing)/page.tsx
```

**Why**: These aren't just comments for humans. When Claude has your full repo as context, these comments become **guardrails**.

### Pattern 5: Structured Error Messages

```typescript
// velite.config.ts
export default defineConfig({
  collections: {
    services: defineCollection({
      loader: glob('./content/services/**/*.mdx'),
      schema: z.object({
        title: z.string().min(5, {
          message: '❌ Service title must be at least 5 characters. Used in page headings and SEO.'
        }),
        icon: z.enum(['wand-2', 'zap', 'link-2'], {
          errorMap: () => ({
            message: '❌ Icon must be one of: wand-2, zap, link-2. See app/services/services.config.ts for icon registry.'
          })
        }),
        features: z.array(z.string()).min(3, {
          message: '❌ Services must have at least 3 features (shows credibility).'
        }),
        caseStudies: z.array(z.string()).refine(
          async (ids) => {
            const exists = await checkCaseStudyIds(ids);
            return exists;
          },
          {
            message: '❌ One or more case study IDs don\'t exist. Run "npm run list:case-studies" to see valid IDs.'
          }
        ),
      }),
    }),
  },
});
```

**Why**: When Claude breaks something, the error message tells them:
- What went wrong (not generic "invalid string")
- Why it matters (credibility, SEO, etc.)
- How to fix it (see this file, run this command)

***

## PART 6: BLIND SPOTS YOU'RE NOT SEEING

### Blind Spot 1: Your Content Model Assumes Fresh Starts

**Reality**: You have 60+ case studies, testimonials, and assets in your current WordPress site.

**What you're missing**: A **migration strategy**.

Current plan: "Rebuild from scratch, rebuild content"
Better plan:
1. Export WordPress content to JSON
2. Transform to MDX frontmatter
3. One-time import script
4. Spot-check, iterate, deploy

You need:
```typescript
// scripts/migrate/wordpress-to-mdx.ts
import { parseWordPressExport } from '@/lib/wp-parser';
import { transformToMDX } from '@/lib/transform';
import * as fs from 'fs';

async function migrate() {
  const wpExport = await parseWordPressExport('./wp-export.xml');

  for (const post of wpExport.posts) {
    const mdx = transformToMDX(post);
    const slug = generateSlug(post.title);

    fs.writeFileSync(
      `content/stream/${slug}.mdx`,
      mdx
    );
  }

  console.log(`✅ Migrated ${wpExport.posts.length} posts`);
}

migrate();
```

**This is non-trivial**, and you haven't mentioned it. If you rebuild without content, you're launching an empty site.

### Blind Spot 2: SEO Migration Risk

**Current**: WordPress site with existing rankings, backlinks, domain authority.

**Risk**: Rebuild changes URL structure → 404s → SEO penalty.

**What's missing**:
1. URL structure mapping (old → new)
2. 301 redirect strategy
3. Sitemap migration
4. Analytics continuity

```typescript
// public/redirects.json (Vercel Edge Middleware reads this)
[
  {
    "source": "/blog/wordpress-best-practices",
    "destination": "/stream/wordpress-best-practices",
    "statusCode": 301
  },
  // ...
]

// middleware.ts
export async function middleware(request: NextRequest) {
  const redirects = await fetch('/redirects.json').then(r => r.json());
  const match = redirects.find(r => request.nextUrl.pathname === r.source);

  if (match) {
    return NextResponse.redirect(match.destination, match.statusCode);
  }
}
```

### Blind Spot 3: Analytics Continuity

**What you're missing**:
- How do you track the rebuild's impact?
- Which old pages should map to new ones?
- How do you preserve Google Analytics history?

**What to do**:
1. Set up Google Analytics 4 (GA4) *before* rebuild
2. Create a cross-domain tracking setup
3. Set up conversion goals aligned with old site

### Blind Spot 4: The "Red Light Test" Assumes Git Access

**Reality**: You're driving. Phone has limited Git tools.

**What works**:
- Claude Code on phone (GitHub web UI + mobile browser)
- Mobile-friendly commit flow

**What doesn't work**:
- Terminal commands on phone
- Running build checks locally
- Previewing changes before commit

**What's missing**: A **mobile-friendly content editor** for the red light test.

```typescript
// app/(admin)/mobile-editor/page.tsx
export default function MobileEditor() {
  return (
    <div className="max-w-sm mx-auto p-4">
      <ContentSelector />
      <InlineEditor />
      <PreviewToggle />
      <CommitButton />
    </div>
  );
}
```

This is:
- Stripped-down UI
- Live preview (no build needed)
- One-click commit to git

You won't use this for major changes, but for "update pricing," it's perfect.

### Blind Spot 5: The Persona of "Content Edited by Claude"

**What you're assuming**: Claude will edit content intelligently and safely.

**Reality**: Claude is stateless. Every edit is a fresh context.

**What's missing**: Persistent context about your brand voice, guidelines, and constraints.

**Solution**: Add a `.claude.md` file to the repo root:

```markdown
# Last Apple - Content & Code Guidelines

## Brand Voice
- Direct, no fluff
- Technical depth for engineers
- Approachable for non-technical buyers
- Emphasis on results, not features

## Content Rules
- All prices in USD
- All services have 3+ benefits
- Case studies minimum 300 words
- Email addresses are lowercase

## Code Rules
- TypeScript strict mode
- All colors via CSS variables
- Components max 300 lines
- Server Actions for forms

## Before Editing
1. Review SERVICES array in app/services/services.config.ts
2. Check pricing.config.ts for current prices
3. Run `npm run validate:content` after changes
4. Preview at http://localhost:3000 before commit

## When in Doubt
- Err toward conservative changes
- Don't refactor code structure
- Don't add new npm packages
- Ask for clarification in PR comments
```

Claude reads this from the repo. Suddenly, the context is persistent.

***

## PART 7: BUILD ORDER & RECOMMENDATIONS

### Recommended Sequence (8-12 weeks, solo + Claude)

**Week 1-2: Foundation**
- [ ] Create Next.js 15 project with App Router
- [ ] Set up TypeScript strict mode
- [ ] Integrate shadcn/ui + Tailwind v4
- [ ] Create `.claude.md` and `schema/` directory
- [ ] Create design system config (colors, spacing, typography)

**Week 3: Content Layer**
- [ ] Set up Velite + MDX
- [ ] Create Zod schemas for content (services, stream, case studies)
- [ ] Create config files: `services.config.ts`, `pricing.config.ts`, etc.
- [ ] Build content validation pipeline

**Week 4: Migration (Parallel)**
- [ ] Export WordPress content
- [ ] Build WordPress-to-MDX transformer script
- [ ] Run initial migration
- [ ] Spot-check and clean up content

**Week 5: Pages & Routing**
- [ ] Build homepage (use Lovable prototype as reference)
- [ ] Build services listing + individual service pages
- [ ] Build pricing page
- [ ] Build about/contact pages

**Week 6: Forms & Edge Stuff**
- [ ] Implement contact form with Server Actions
- [ ] Set up email integration (Resend)
- [ ] Add middleware for geolocation context
- [ ] Set up Vercel Edge Config basics

**Week 7: SEO & Analytics**
- [ ] Next.js Metadata API for all pages
- [ ] Sitemap generation
- [ ] robots.txt
- [ ] JSON-LD structured data helpers
- [ ] GA4 integration + event tracking

**Week 8: Polish & Performance**
- [ ] Lighthouse audit (target 90+ all categories)
- [ ] Dark mode implementation
- [ ] Reduced-motion support
- [ ] Image optimization (next/image)
- [ ] Font optimization

**Week 9: Accessibility & Testing**
- [ ] Keyboard navigation audit
- [ ] ARIA attributes throughout
- [ ] Focus state testing
- [ ] Lighthouse accessibility check
- [ ] Screen reader testing (VoiceOver, NVDA)

**Week 10: CI/CD & Deployment**
- [ ] GitHub Actions for linting + validation + build checks
- [ ] Vercel deployment with preview deploys
- [ ] Automated Lighthouse reports on PRs
- [ ] Set up automated backups

**Week 11: Content Graph & Mobile Editor (Optional Phase 2)**
- [ ] Build content relationship graph
- [ ] Implement vector embeddings (optional, Phase 2)
- [ ] Mobile editor interface (optional, for red light test)

**Week 12: Red Light Test & Refinement**
- [ ] Test Claude Code workflow
- [ ] Refinements based on real usage
- [ ] Performance tuning
- [ ] Launch prep

### Immediate Next Steps (This Week)

1. **Create the repo structure** - Don't overthink this, but get the file hierarchy right for Claude
2. **Write `.claude.md`** - Make it clear what Claude should and shouldn't do
3. **Build schema files** - Services, pricing, content all have Zod schemas in advance
4. **Set up Lovable → Next.js bridge** - Export components from Lovable prototype, adapt to Next.js
5. **Plan content migration** - How does WordPress content become MDX?

***

## PART 8: THE HARD QUESTIONS - MY ANSWERS

### Q1: Are we at the cutting edge?

**Answer**: You're in the **95th percentile of 2025 web development**, but you're missing the bleeding edge.

**Standard 2025**: Next.js + Tailwind + headless CMS → What you're building
**Bleeding edge 2025**:
- Partial Prerendering (PPR) for hybrid static/dynamic
- Edge-first everything (middleware, functions, config)
- Vector embeddings for content intelligence
- AI-native workflows (Claude editing code/content safely)

You can get to bleeding edge by adding:
1. PPR adoption
2. Vector embeddings for content relationships
3. Edge Config for feature flags
4. Structured schemas Claude can rely on

**Timeline**: 2-3 weeks additional work after core rebuild.

### Q2: Edge-first architecture?

**Answer**: Don't optimize for personalization yet. Build the *foundation* that makes it trivial later.

**Do now:**
- Middleware captures geo/device/time context
- Edge Config for simple flags
- Analytics tracking endpoints

**Do later (Month 2+):**
- Vector search over content
- A/B testing framework
- Audience segments

**Do much later (Quarter 2+):**
- Real personalization rendering
- ML-based content recommendations

The gap between your current plan and "edge-first" is about **10% of the work, but 80% of the *optionality***.

### Q3: Content as structured data?

**Answer**: MDX + Velite is correct. Don't switch to a headless CMS.

**Why**: You want Git-native, not API-dependent. Headless CMS (Keystatic, Tina, Decap) adds an extra layer of abstraction.

**What to add**: Content graph on top of Velite (as I described). This gives you:
- Query capability ("all services mentioned in this case study")
- Relationship intelligence ("similar posts")
- AI context ("here's related content")

**The pattern**: Files → Velite validation → Build-time graph generation → Runtime queries

### Q4: AI integration hooks?

**Answer**: The entire system I've described (Zod schemas, config extraction, Claude-aware comments, `.claude.md`).

**TL;DR**:
- Extract all content to config files (not components)
- Use Zod for types that Claude understands
- Write comments that explain constraints
- Validate at build time with helpful error messages
- Store brand guidelines in `.claude.md`

This makes your codebase **maximally Claude-editable**. Claude knows what can change, what can't, and what the side effects are.

### Q5: The rendering spectrum?

**Answer**: Use this matrix:

```
Content Type              Frequency    Personalization    Strategy
────────────────────────────────────────────────────────────────
Pricing                   Ad-hoc       High               Edge Config + SSR
Homepage                  Hourly       Low                PPR
Services                  Weekly       Low                ISR (revalidate on commit)
Case Studies              Monthly      None               SSG
Stream (blog)             Daily        None               ISR (revalidate hourly)
Legal/about               Rarely       None               SSG
────────────────────────────────────────────────────────────────

SSG = Static Site Generation (build time, fastest)
ISR = Incremental Static Regeneration (rebuild on change/schedule)
SSR = Server-Side Rendering (request time, enables personalization)
PPR = Partial Prerendering (static shell + dynamic streaming)
Edge Config = Feature flags, live updates without rebuild
```

### Q6: Observability?

**Answer**: Two layers:

**Layer 1: Content Performance** (what content resonates)
```typescript
// Track on every page
track({
  page: 'services/wordpress-care',
  country: request.geo?.country,
  device: headers().get('user-agent'),
  referrer: request.referrer,
  timestamp: new Date(),
});

// Later: Query → "What pages have highest bounce rate in EU?"
```

**Layer 2: Site Health** (is everything working)
```typescript
// Automated checks
- Lighthouse scores (per page)
- Link validation (no 404s)
- Image optimization (sizes, formats)
- SEO compliance (metadata, structured data)
- Performance metrics (Core Web Vitals)

// Dashboard in /admin
// Shows: Performance trends, content popularity, error rates
```

### Q7: Blind spots?

**I've covered 5 major ones above:**
1. Migration strategy (WordPress → MDX)
2. SEO continuity (redirects, GA4)
3. Analytics bridge
4. Mobile-friendly editing
5. Persistent Claude context

**Additional blind spots you should consider:**
- **Backup strategy** - What if something breaks?
- **Monitoring** - 404s, performance degradation, downtime
- **Email deliverability** - Contact form emails going to spam
- **Licensing** - shadcn/ui, Framer Motion, fonts all have licenses; audit them
- **Future team** - What if you hire someone? Is the code documented enough?
- **Cost modeling** - Vercel costs, AI API costs, email service costs

***

## FINAL RECOMMENDATION

**You're 90% correct.** Your architecture is modern, well-thought, and production-ready.

**The 10% gaps are:**
1. **Content relationships** - Add a graph layer for intelligence
2. **AI-safe patterns** - Extract content to config, use Zod, add `.claude.md`
3. **PPR adoption** - Build with partial prerendering from day 1
4. **Migration planning** - How do you move WordPress → MDX safely?
5. **Observability** - How do you know what's working?

**My specific recommendations:**

✅ **Do this immediately**:
- Create `.claude.md` with guidelines
- Build content extraction patterns (config files)
- Plan WordPress migration
- Set up Zod schemas for all content types
- Enable TypeScript strict mode

✅ **Do this in Week 3**:
- Implement content graph generation at build time
- Set up analytics tracking infrastructure
- Implement PPR foundation

✅ **Do this in Phase 2**:
- Vector embeddings for content intelligence
- Mobile editor for the red light test
- Advanced personalization foundation

❌ **Don't do this yet**:
- Actual personalization rendering
- A/B testing infrastructure
- Audience segmentation
- LaunchDarkly integration
- Headless CMS switch

***

You've built a genuinely excellent foundation. The next level is making it **Claude-native, relationship-aware, and observability-rich**. That's where the magic happens.

What would you like to dig deeper into? I can provide:
- Detailed Zod schema examples for your specific content types
- A full migration script (WordPress → MDX)
- PPR implementation patterns
- Content graph generation code
- The `.claude.md` template for your business
- Mobile editor component code

***

**Summary in one sentence**: Your stack is 2025-correct, but you need to add content relationship intelligence, AI-safe patterns, and migration planning before you build. Do that, and you'll have a system that's both maintainable and genuinely cutting-edge.

Sources
