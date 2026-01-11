# Last Apple v2: AI-Native Website Architecture

## Created: January 9, 2026
## Status: Planning

---

## The Vision

**Reality:** Work generates content daily - calls, transcripts, solutions, results.

**The site:** A malleable system that turns real work into published content.

**The workflow:**
```
Transcript → Claude → Content → Git → Live Site
```

**The red-light test:** At a red light, tell Claude to update pricing by 25%. Next red light, approve commit. Next red light, see it live.

---

## Core Principles

1. **Content is king** - Real work becomes real content
2. **Everything in Git** - Single source of truth, trackable, editable
3. **Known buckets** - Defined content types with defined homes
4. **Known styles** - Consistent visual system
5. **Vetted blocks** - Components that guarantee good output
6. **Claude as interface** - Natural language to published content
7. **SEO built-in** - Every content schema includes SEO fields

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Content | JSON files in Git |
| Hosting | Vercel |
| Domain | lastapple.com |
| Version Control | GitHub |
| Editor | Claude Code |

---

## Site Structure

```
EVERGREEN (stable pages)
├── Home
├── Services
│   ├── WordPress Care
│   ├── AI Marketing
│   └── System Integration
├── About
├── Contact
└── Consultation

STREAM (daily/weekly content)
├── Work Logs
├── Insights
├── Client Wins
└── Tutorials

PROMOTED (curated from stream)
├── Case Studies
└── Featured Posts
```

---

## Repository Structure

```
lastapple.com/
├── app/                      # Next.js app router
│   ├── page.tsx              # Home
│   ├── services/
│   │   ├── wordpress-care/
│   │   ├── ai-marketing/
│   │   └── system-integration/
│   ├── stream/
│   │   └── [slug]/
│   ├── about/
│   ├── contact/
│   └── consultation/
│
├── components/               # React components
│   ├── ui/                   # shadcn/ui primitives
│   ├── blocks/               # Page building blocks
│   │   ├── Hero.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── PricingTable.tsx
│   │   ├── StreamEntry.tsx
│   │   ├── CaseStudy.tsx
│   │   ├── Testimonial.tsx
│   │   └── CTA.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Navigation.tsx
│
├── content/                  # JSON content (Claude edits this)
│   ├── services/
│   │   ├── wordpress-care.json
│   │   ├── ai-marketing.json
│   │   └── system-integration.json
│   ├── stream/
│   │   ├── 2026-01-09-linguatech-win.json
│   │   └── ...
│   ├── case-studies/
│   │   └── linguatech.json
│   ├── pages/
│   │   ├── home.json
│   │   ├── about.json
│   │   └── contact.json
│   └── testimonials/
│       └── testimonials.json
│
├── config/                   # Site configuration
│   ├── navigation.json
│   ├── theme.json
│   └── seo-defaults.json
│
├── lib/                      # Utilities
│   ├── content.ts            # Content loading functions
│   └── seo.ts                # SEO helpers
│
├── public/
│   └── images/
│
└── transcripts/              # Raw transcripts (input for Claude)
    └── 2026-01-09-linguatech.md
```

---

## Content Schemas

### Service Page Schema

```json
{
  "slug": "wordpress-care",

  "seo": {
    "title": "WordPress Care Services | Last Apple",
    "description": "Comprehensive WordPress maintenance, performance optimization, and site revival.",
    "ogImage": "/images/services/wordpress-care-og.jpg"
  },

  "page": {
    "h1": "WordPress Care",
    "intro": "Your website is the digital heartbeat of your business."
  },

  "offerings": [
    {
      "id": "maintenance",
      "h2": "Maintenance",
      "tagline": "Keep it running",
      "description": "Daily backups, security monitoring, updates.",
      "tiers": [
        {
          "name": "Essentials",
          "price": 150,
          "features": ["Daily backups", "Core updates", "Security monitoring"]
        }
      ]
    }
  ],

  "cta": {
    "text": "Schedule Consultation",
    "href": "/consultation"
  }
}
```

### Stream Entry Schema

```json
{
  "slug": "2026-01-09-linguatech-performance-win",
  "date": "2026-01-09",
  "type": "client-win",

  "seo": {
    "title": "LinguaTech: 8s to 2s Load Time | Last Apple",
    "description": "How we reduced LinguaTech's page load from 8 seconds to 2 seconds."
  },

  "page": {
    "h1": "LinguaTech: From 8s to 2s"
  },

  "content": {
    "summary": "Reduced page load from 8s to 2s. Client ecstatic.",
    "body": "Full markdown content here...",
    "tags": ["performance", "wordpress", "client-win"]
  },

  "client": {
    "name": "LinguaTech",
    "industry": "Language Services",
    "anonymous": false
  },

  "metrics": [
    { "label": "Load Time", "before": "8.2s", "after": "2.1s" },
    { "label": "Bounce Rate", "before": "65%", "after": "35%" }
  ],

  "promotable": true,
  "transcript": "/transcripts/2026-01-09-linguatech.md"
}
```

### Case Study Schema (Promoted from Stream)

```json
{
  "slug": "linguatech-transformation",
  "promotedFrom": "2026-01-09-linguatech-performance-win",

  "seo": {
    "title": "LinguaTech Case Study: 75% Performance Improvement | Last Apple",
    "description": "How Last Apple transformed LinguaTech's struggling WordPress site."
  },

  "page": {
    "h1": "LinguaTech: Digital Transformation"
  },

  "overview": {
    "client": "LinguaTech International",
    "industry": "Language Services",
    "duration": "3 months",
    "services": ["WordPress Maintenance", "Performance Optimization"]
  },

  "sections": [
    {
      "h2": "The Challenge",
      "content": "LinguaTech's site was loading in 8+ seconds..."
    },
    {
      "h2": "Our Solution",
      "content": "We implemented caching, image optimization..."
    },
    {
      "h2": "The Results",
      "content": "Page load dropped to 2.1 seconds."
    }
  ],

  "results": [
    { "metric": "Page Load", "before": "8.2s", "after": "2.1s" },
    { "metric": "Conversions", "change": "+40%" }
  ],

  "testimonial": {
    "quote": "Last Apple transformed our digital presence.",
    "author": "Sarah Chen",
    "role": "CTO"
  },

  "featured": true
}
```

### Home Page Schema

```json
{
  "slug": "home",

  "seo": {
    "title": "Last Apple | AI-Driven Digital Solutions",
    "description": "30 years of system integration expertise. WordPress care, AI marketing, and seamless integrations.",
    "ogImage": "/images/og-home.jpg"
  },

  "hero": {
    "h1": "30 Years of System Grit. AI That Delivers.",
    "subtitle": "Digital solutions for visionary brands.",
    "cta": {
      "text": "Start a Conversation",
      "href": "/consultation"
    }
  },

  "services": {
    "h2": "What We Do",
    "items": ["wordpress-care", "ai-marketing", "system-integration"]
  },

  "proof": {
    "h2": "Recent Work",
    "source": "stream",
    "count": 3
  },

  "testimonials": {
    "h2": "What Clients Say",
    "featured": ["linguatech", "client-2"]
  }
}
```

---

## Component Library

### Required Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `Hero` | Page hero section | h1, subtitle, cta, image |
| `ServiceCard` | Service offering card | h2, tagline, description, link |
| `PricingTable` | Pricing tiers | tiers[] |
| `StreamEntry` | Stream list item | date, title, summary, tags |
| `StreamDetail` | Full stream post | full schema |
| `CaseStudy` | Case study layout | full schema |
| `Testimonial` | Client quote | quote, author, role, image |
| `CTA` | Call to action block | text, href, variant |
| `MetricsDisplay` | Before/after metrics | metrics[] |
| `SectionHeader` | h2 with optional intro | h2, intro |
| `Navigation` | Site nav | config/navigation.json |
| `Footer` | Site footer | links, contact, social |

### Using shadcn/ui

Base primitives from shadcn/ui:
- Button
- Card
- Badge
- Separator
- NavigationMenu
- Sheet (mobile nav)
- Form components

---

## Navigation Structure

```json
{
  "primary": [
    {
      "label": "Services",
      "children": [
        { "label": "WordPress Care", "href": "/services/wordpress-care" },
        { "label": "AI Marketing", "href": "/services/ai-marketing" },
        { "label": "System Integration", "href": "/services/system-integration" }
      ]
    },
    { "label": "Stream", "href": "/stream" },
    { "label": "About", "href": "/about" },
    { "label": "Contact", "href": "/contact" }
  ],
  "cta": {
    "label": "Let's Talk",
    "href": "/consultation"
  }
}
```

---

## SEO Strategy

### Built Into Every Schema

- `seo.title` - Page title (50-60 chars)
- `seo.description` - Meta description (150-160 chars)
- `seo.ogImage` - Social sharing image

### Semantic HTML

Components enforce proper structure:
- One `<h1>` per page (from `page.h1`)
- Logical `<h2>`, `<h3>` hierarchy
- `<article>`, `<section>`, `<nav>` semantics

### Technical SEO

- `next-sitemap` for auto-generated sitemap
- Proper meta tags via Next.js Metadata API
- JSON-LD structured data for services, articles
- Image optimization via `next/image`
- Fast by default (Vercel edge, static generation)

---

## Workflow: Transcript to Published

### Daily Stream Post

```
1. Complete client call
2. Save transcript to /transcripts/
3. Tell Claude: "Create stream post from today's LinguaTech call"
4. Claude:
   - Reads transcript
   - Reads stream entry schema
   - Creates /content/stream/2026-01-09-linguatech.json
   - Commits to Git
5. Vercel auto-deploys
6. Live in ~60 seconds
```

### Promote to Case Study

```
1. Stream post performs well / notable win
2. Tell Claude: "Promote LinguaTech stream post to case study"
3. Claude:
   - Reads existing stream entry
   - Reads case study schema
   - Expands content
   - Creates /content/case-studies/linguatech.json
   - Updates navigation if needed
   - Commits to Git
4. Vercel auto-deploys
5. Case study live
```

### Update Pricing

```
1. At red light: "Update WordPress Care pricing by 25%"
2. Claude:
   - Reads /content/services/wordpress-care.json
   - Updates price values
   - Commits to Git
3. Approve PR / merge
4. Vercel auto-deploys
5. New pricing live
```

---

## Migration Plan

### Phase 1: Foundation
- [ ] Initialize Next.js project
- [ ] Set up Tailwind + shadcn/ui
- [ ] Create base layout (Header, Footer, Navigation)
- [ ] Deploy skeleton to Vercel
- [ ] Connect lastapple.com domain (or subdomain for testing)

### Phase 2: Components
- [ ] Build Hero component
- [ ] Build ServiceCard component
- [ ] Build PricingTable component
- [ ] Build StreamEntry component
- [ ] Build CTA component
- [ ] Build Testimonial component

### Phase 3: Evergreen Pages
- [ ] Home page
- [ ] WordPress Care service page
- [ ] AI Marketing service page
- [ ] System Integration service page
- [ ] About page
- [ ] Contact page
- [ ] Consultation page

### Phase 4: Stream
- [ ] Stream list page
- [ ] Stream detail page
- [ ] Migrate existing blog posts to stream format

### Phase 5: Content Migration
- [ ] Extract content from WordPress JSON exports
- [ ] Create content JSON files
- [ ] Verify all pages render correctly

### Phase 6: SEO & Launch
- [ ] Set up next-sitemap
- [ ] Add JSON-LD structured data
- [ ] Set up 301 redirects from old URLs
- [ ] Test all pages
- [ ] Switch domain to Vercel
- [ ] Decommission WordPress (keep backup)

---

## Reference: Current WordPress Content

### Evergreen to Migrate
- Home
- About / Why Choose Last Apple
- Contact
- Services (consolidate 12+ pages to 3)
- Consultation flow

### Stream to Migrate (existing blog posts)
- Technical Debt in the Age of AI
- Why Your Company Needs a Brain
- Kickstart Your Productivity: Meeting Management with AI
- Context Anchoring in AI Troubleshooting
- Four Months of Transformative Marketing Automation
- Gemini-Chat's Vision Unveiled
- Multi-LLM Collaboration Symphony
- Multiple AIs and One Vision
- Building a Brain
- Cursor, Claude, and Chaos: Mautic Tool
- AI Cognitive Overload to Multi-Persona Breakthrough
- Coffee Shop SEO
- AI in SEO
- Manual Drudgery to AI-Driven Efficiency

---

## Success Criteria

- [ ] Claude can create stream post from transcript in <2 minutes
- [ ] Claude can update pricing in <1 minute
- [ ] Site loads in <2 seconds
- [ ] 90+ PageSpeed score
- [ ] All content in Git, version controlled
- [ ] Zero WordPress dependencies
- [ ] SEO parity or better than current site

---

## Open Questions

1. Email handling - keep SiteGround for email?
2. Forms - Formspree? Resend? Custom API?
3. WooCommerce/Shop - needed? Alternative?
4. Audio-scapes page - what is this? Keep?

---

## Next Steps

1. Initialize Next.js project in this repo
2. Set up Vercel project
3. Build first component (Hero)
4. Deploy "Hello World" to verify pipeline
5. Iterate from there

---

*This document is the source of truth for the Last Apple v2 build.*
