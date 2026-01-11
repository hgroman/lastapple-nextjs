# Content Guide

This document explains how to create, structure, and migrate content for the Last Apple platform.

---

## Content Philosophy

### The Stream is the Soul
The Stream is not a blog section. It IS the site. Everything else flows from it.

- **Stream posts**: Daily work, experiments, discoveries, journey documentation
- **Services**: Emerge from patterns in the Stream (what you do repeatedly)
- **Solutions**: Emerge from problems solved in the Stream (what you've built)
- **Client work**: Stories told through the Stream lens (journeys, not case studies)

### Content as Code
- All content lives in `/content/` as MDX files
- Git is the source of truth
- Zod schemas validate at build time
- Invalid content = failed build (this is good — catches errors)

---

## Directory Structure

```
content/
├── stream/                 # Daily work logs - THE CORE
│   └── 2026-01-10-post-slug.mdx
├── services/               # Service offerings
│   └── wordpress-care.mdx
├── solutions/              # AI solutions
│   └── scrapersky.mdx
├── clients/                # Client work / case studies
│   └── client-name.mdx
└── schema/                 # Zod validation schemas
    ├── stream.ts
    ├── service.ts
    └── solution.ts
```

---

## Creating Content

### Stream Posts

**File naming:** `content/stream/YYYY-MM-DD-slug.mdx`

```mdx
---
title: "Your Post Title"
description: "Max 160 characters for SEO. Be compelling."
publishedAt: "2026-01-10"
tags: ["ai", "wordpress", "development"]
featured: false
published: true
---

Your content here. MDX supports:

- **Markdown formatting**
- React components (if imported)
- Code blocks with syntax highlighting

## Headings Work

So do lists, links, and all standard Markdown.
```

**Required fields:**
| Field | Type | Description |
|-------|------|-------------|
| title | string | Post title (displayed in lists, SEO) |
| description | string | Max 160 chars, used for SEO meta |
| publishedAt | string | ISO date format YYYY-MM-DD |
| tags | string[] | Array of tag strings |
| published | boolean | Set false for drafts |

**Optional fields:**
| Field | Type | Description |
|-------|------|-------------|
| featured | boolean | Highlight in featured sections |
| image | string | Path to hero image |
| author | string | Override default author |

### Service Pages

**File naming:** `content/services/service-slug.mdx`

```mdx
---
title: "WordPress Care"
description: "Comprehensive WordPress maintenance for businesses that depend on their websites."
icon: "shield"
featured: true
order: 1
---

Service content here...

## What's Included

- Daily backups
- Security monitoring
- Performance optimization

## Pricing Tiers

[Can include pricing table component]
```

### Solution Pages

**File naming:** `content/solutions/solution-slug.mdx`

```mdx
---
title: "ScraperSky"
description: "AI-powered web scraping and data extraction platform."
icon: "database"
category: "ai"
featured: true
---

Solution content here...
```

---

## Frontmatter Validation

All frontmatter is validated by Zod schemas at build time.

**Location:** `content/schema/`

**Example schema (stream.ts):**
```typescript
import { z } from 'zod';

export const StreamPostSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(160),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});
```

**What happens on validation failure:**
1. Build fails with clear error message
2. Error shows which file and which field
3. Content does not deploy
4. This protects the live site

---

## MDX Features

### Basic Markdown
```mdx
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

- Bullet list
- Another item

1. Numbered list
2. Second item

[Link text](https://example.com)

> Blockquote
```

### Code Blocks
````mdx
```typescript
const greeting = "Hello, World!";
console.log(greeting);
```
````

### Images
```mdx
![Alt text](/images/my-image.jpg)
```

### React Components (Advanced)
```mdx
import { PricingTable } from '@/components/PricingTable';

<PricingTable tiers={tiers} />
```

---

## Migrating from WordPress

### Available WordPress Content
- **37 pages** exported to JSON
- **14 blog posts** exported to JSON
- Location: archived in `lastapple-archive/TRANSFER-TO-LAUNCHPAD/docs/03-reference/wordpress-exports/`

### Migration Process

1. **Identify content to migrate**
   - Not all WordPress pages need migration
   - Focus on: services, solutions, blog posts with value
   - Skip: duplicate pages, outdated content, WooCommerce pages

2. **Convert to MDX**
   ```bash
   # WordPress JSON structure:
   {
     "post_title": "WordPress Maintenance",
     "post_content": "<h1>Premium WordPress...</h1>",
     "post_excerpt": "...",
     "post_name": "wordpress-maintenance"
   }

   # Convert to MDX:
   ---
   title: "WordPress Maintenance"
   description: "Premium WordPress maintenance services..."
   publishedAt: "2024-04-01"
   ---

   # Premium WordPress Maintenance Services

   [Cleaned content here]
   ```

3. **Clean HTML to Markdown**
   - Remove WordPress shortcodes
   - Convert `<h1>` to `#`, `<h2>` to `##`, etc.
   - Convert `<ul><li>` to `- ` lists
   - Convert `<a href="">` to `[text](url)`
   - Remove inline styles
   - Preserve semantic structure

4. **Validate and test**
   ```bash
   npm run build   # Will fail if frontmatter invalid
   npm run dev     # Preview locally
   ```

### Priority Content for Migration

| Priority | Content | Why |
|----------|---------|-----|
| High | Service descriptions | Core business offering |
| High | Pricing information | Revenue-critical |
| Medium | Blog posts with traffic | SEO value |
| Medium | Case studies | Social proof |
| Low | Static pages (About, Contact) | Can recreate |
| Skip | WooCommerce pages | Not using ecommerce |

---

## Content Workflow

### Daily Stream Posts (The Red Light Test)

1. **Create file** (phone or desktop)
   ```
   content/stream/2026-01-10-todays-work.mdx
   ```

2. **Write content** with proper frontmatter

3. **Commit and push**
   ```bash
   git add content/stream/2026-01-10-todays-work.mdx
   git commit -m "stream: today's work log"
   git push
   ```

4. **Vercel auto-deploys** — live in <2 minutes

### Service/Solution Updates

Same workflow, but:
- More careful review before commit
- Consider impact on SEO
- May want PR review for major changes

---

## SEO Considerations

### Every Page Needs
- **title**: Clear, keyword-aware, under 60 chars
- **description**: Compelling, under 160 chars, includes keywords

### URL Structure
- Stream: `/stream/2026-01-10-descriptive-slug`
- Services: `/services/wordpress-care`
- Solutions: `/solutions/scrapersky`

### Image Optimization
- Use WebP format when possible
- Include descriptive alt text
- Compress before committing
- Store in `/public/images/`

---

## Troubleshooting

### Build Fails with Validation Error
```
Error: Invalid frontmatter in content/stream/2026-01-10-post.mdx
  - title: Required
```
**Fix:** Add the missing required field to frontmatter.

### Content Not Appearing
1. Check `published: true` in frontmatter
2. Check file is in correct directory
3. Check filename format (especially dates)
4. Run `npm run build` to see errors

### MDX Syntax Error
```
Error: Unexpected token in MDX
```
**Fix:** Check for:
- Unclosed JSX tags
- Invalid HTML in MDX
- Missing frontmatter delimiters (`---`)

---

*For WordPress SSH access and WP-CLI commands, see `WORDPRESS-ACCESS.md`*
