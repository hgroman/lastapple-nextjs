# Content Migration - Work Order

**Issue Date:** January 10, 2026
**Priority:** HIGH
**Objective:** Migrate WordPress content to Next.js MDX format

---

## OVERVIEW

Convert all WordPress page/post exports to MDX files for the Next.js site.

---

## SOURCE

**Location:** `docs/wordpress-exports/`

```
docs/wordpress-exports/
├── page/           # 35 WordPress pages (JSON)
├── post/           # 14 WordPress posts (JSON)
├── menus.json      # Navigation structure
└── options.json    # Site settings
```

**Format:** JSON exports from WP-CLI containing:
- `post_title`
- `post_content` (HTML with Elementor markup)
- `post_excerpt`
- `post_name` (slug)
- `post_status`

---

## DESTINATION

**Location:** `content/`

```
content/
├── stream/         # Blog posts, journal entries (from post/)
├── services/       # Service pages (from page/)
├── solutions/      # Solution pages (from page/)
├── clients/        # Case studies, portfolio (from page/)
└── pages/          # Static pages: About, Contact, etc. (from page/)
```

---

## FORMAT CONVERSION

### From: WordPress JSON + HTML
```json
{
  "ID": 4406,
  "post_title": "WordPress Maintenance",
  "post_content": "<div class=\"elementor-widget-container\"><h1>Premium WordPress...</h1>...</div>",
  "post_name": "wordpress-maintenance"
}
```

### To: MDX with Frontmatter
```mdx
---
title: "WordPress Maintenance"
description: "Premium WordPress maintenance services for businesses."
slug: "wordpress-maintenance"
publishedAt: "2024-04-01"
updatedAt: "2026-01-10"
tags: ["wordpress", "maintenance", "services"]
published: true
---

# Premium WordPress Maintenance Services

[Clean markdown content - no HTML, no Elementor artifacts]
```

---

## CONVERSION STEPS

### Step 1: HTML Cleanup
Remove WordPress/Elementor artifacts:
- `<div class="elementor-*">` wrappers
- `[elementor-template id="..."]` shortcodes
- `[contact-form-7 ...]` shortcodes
- Inline `style="..."` attributes
- Empty divs/spans
- `srcset` attributes on images

### Step 2: HTML → Markdown
| WordPress HTML | Markdown |
|----------------|----------|
| `<h1>Text</h1>` | `# Text` |
| `<h2>Text</h2>` | `## Text` |
| `<p>Text</p>` | `Text` |
| `<ul><li>Item</li></ul>` | `- Item` |
| `<a href="url">text</a>` | `[text](url)` |
| `<strong>text</strong>` | `**text**` |
| `<em>text</em>` | `*text*` |
| `<img src="url" alt="text">` | `![text](/images/wp/filename.jpg)` |

### Step 3: Image Path Updates
Update image references to use local paths:
```
# From WordPress
https://lastapple.com/wp-content/uploads/2021/02/image.jpg

# To Next.js
/images/wp/image.jpg
```

### Step 4: Frontmatter Generation
Extract/create metadata:
- `title` — from `post_title`
- `description` — from `post_excerpt` or generate
- `slug` — from `post_name`
- `publishedAt` — from `post_date`
- `tags` — infer from content/category
- `published` — from `post_status`

### Step 5: Validation
```bash
npm run build  # Zod schemas validate frontmatter
npm run dev    # Visual verification
```

---

## CONTENT CATEGORIES

### High Priority (Services)
| WordPress Page | Destination |
|----------------|-------------|
| WordPress Maintenance (4406) | `content/services/wordpress-maintenance.mdx` |
| Maintenance Plans (9816) | `content/services/maintenance-plans.mdx` |
| AI-Powered Chatbot Solutions (8970) | `content/services/ai-chatbot.mdx` |
| AI-Driven Data Integration (9131) | `content/services/data-integration.mdx` |
| AI-Powered B2B Email List (10833) | `content/services/b2b-email-lists.mdx` |

### Medium Priority (About/Info)
| WordPress Page | Destination |
|----------------|-------------|
| About (8940) | `content/pages/about.mdx` |
| WordPress Maintenance Onboarding (9853) | `content/pages/onboarding.mdx` |
| Free SEO Audit (9628) | `content/pages/seo-audit.mdx` |

### Blog Posts (Stream)
All 14 posts → `content/stream/`
- Use original publish date in filename
- Format: `YYYY-MM-DD-slug.mdx`

---

## TOOLS AVAILABLE

- **`tools/wp-harvest.sh`** — Already used, media downloaded to `public/images/wp/`
- **Claude** — Can convert HTML to MDX in batches
- **Future: `tools/mdx-convert.sh`** — Batch conversion script

---

## DEPENDENCIES

- [x] WordPress exports available (`docs/wordpress-exports/`)
- [x] Media downloaded (`public/images/wp/`)
- [ ] Zod schemas finalized for each content type
- [ ] Route structure decided (App Router)

---

## RELATED WORK ORDERS

- `WORK-ORDER-PRICING.md` — Pricing data for service pages
- `WORK-ORDER-IMAGE-RENAME.md` — Post-migration image cleanup

---

*Begin with high-priority service pages. Blog posts can follow.*
