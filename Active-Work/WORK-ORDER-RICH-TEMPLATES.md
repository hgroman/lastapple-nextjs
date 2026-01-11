# Rich Page Templates - Work Order

**Issue Date:** January 11, 2026
**Priority:** HIGH (Blocks content migration quality)
**Objective:** Elevate service/solution page design to match homepage energy while incorporating WordPress visual assets

---

## PROBLEM STATEMENT

Current service/solution pages are **boring walls of text** compared to:
1. **The original WordPress pages** — which had hero images, section images, visual breaks
2. **The new Next.js homepage** — which has animations, gradients, floating elements, "2050 AI-infused bliss"

The content is there, but the presentation is flat. If we continue migrating 30+ pages with the current template, we'll have to redo them all.

**This is a strategic gate** — fix the template BEFORE migrating more content.

---

## DESIGN PHILOSOPHY

| Don't Do | Do |
|----------|-----|
| Clone WordPress | Keep Next.js modern aesthetic |
| Just add images randomly | Design intentional slots for visual assets |
| Make every page identical | Create flexible template with optional sections |
| Lose the cool AI images | Incorporate them as first-class elements |

### The Vision
Pages that feel like the homepage:
- Animated section reveals
- Gradient accents and glows
- Visual rhythm (image → text → image → text)
- Feature cards with icons
- Testimonial/case study cards
- Pricing tier cards (not just text lists)

---

## ASSETS TO INCORPORATE

### Missing WordPress Images (Need Download)
These AI-generated images were referenced in WordPress but NOT downloaded:

```
last-apple-digital-heartbeat-of-business.webp
wordpress-starter-plan-maintenance-tool-box.webp
wordpress-intermediate-plan-performance-optimization.webp
wordpress-advanced-plan-luxury-service.webp
futuristic-digital-navigation-charting-tools.webp
futuristic-digital-archer-targeting-marketing-goals.webp
advanced-wordpress-maintenance-command-center.webp
```

**Source:** `https://lastapple.com/wp-content/uploads/2024/04/`

### Current Local Images
```
public/images/wp/
├── 92d1cc82-*.jpg (needs rename)
├── back-office-AdobeStock_*.jpg
├── contact-center-2-AdobeStock_*.jpg
├── digital-marketing-AdobeStock_*.jpg
└── Original.svg (logo)
```

---

## DELIVERABLES

### Phase 1: Asset Preparation
| Task | Output |
|------|--------|
| Download missing webp images from WordPress | `public/images/wp/*.webp` |
| Rename all images semantically | `wp-maintenance-hero.webp`, `ai-toolbox.webp`, etc. |
| Create image manifest | `docs/IMAGE-MANIFEST.md` with name → usage mapping |

### Phase 2: Schema Updates
| Task | Output |
|------|--------|
| Add `heroImage` field to ServiceSchema | Optional string for hero image path |
| Add `images` array to ServiceSchema | Array of `{ src, alt, section }` |
| Add same fields to SolutionSchema | Consistency across content types |
| Add `heroImage` to StreamPostSchema | Blog post featured images |

### Phase 3: Layout Redesign

#### ServiceLayout.tsx — Enhanced Structure
```
┌─────────────────────────────────────────────────────────┐
│ HERO SECTION                                            │
│ ┌─────────────────────┬───────────────────────────────┐ │
│ │ Category Badge      │                               │ │
│ │ Title               │     Hero Image                │ │
│ │ Description         │     (animated fade-in)        │ │
│ │ CTA Button          │                               │ │
│ └─────────────────────┴───────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ FEATURES GRID (animated cards with icons)               │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐                    │
│ │ Icon    │ │ Icon    │ │ Icon    │                    │
│ │ Feature │ │ Feature │ │ Feature │                    │
│ └─────────┘ └─────────┘ └─────────┘                    │
├─────────────────────────────────────────────────────────┤
│ PRICING TIERS (if applicable)                           │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│ │ Essentials  │ │ Growth      │ │ Business    │        │
│ │ $299/mo     │ │ $599/mo     │ │ $999/mo     │        │
│ │ • Feature   │ │ • Feature   │ │ • Feature   │        │
│ │ • Feature   │ │ • Feature   │ │ • Feature   │        │
│ │ [Select]    │ │ [Select]    │ │ [Select]    │        │
│ └─────────────┘ └─────────────┘ └─────────────┘        │
├─────────────────────────────────────────────────────────┤
│ SECTION IMAGE (full width, with subtle parallax)        │
├─────────────────────────────────────────────────────────┤
│ PROSE CONTENT (using prose-content class)               │
│ - H2 sections with crimson underline                    │
│ - H3 with teal accent bars                              │
│ - Lists with gradient bullets                           │
│ - Blockquotes with teal border                          │
├─────────────────────────────────────────────────────────┤
│ CASE STUDY CARD (if present)                            │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ "Quote from client about results..."                │ │
│ │                        — Client Name, Company       │ │
│ │ ┌────────┐ ┌────────┐ ┌────────┐                   │ │
│ │ │ 85%    │ │ 3x     │ │ $50K   │                   │ │
│ │ │ faster │ │ ROI    │ │ saved  │                   │ │
│ │ └────────┘ └────────┘ └────────┘                   │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ FOOTER CTA (gradient background, animated)              │
└─────────────────────────────────────────────────────────┘
```

#### SolutionLayout.tsx — Similar Treatment
- Hero with image
- Outcomes as animated numbered cards
- Case study prominently featured
- Process steps visualization

#### StreamLayout.tsx — Blog Enhancement
- Featured image at top
- Better typography hierarchy
- Related posts section
- Share buttons

### Phase 4: Content Re-Migration
| Page | Status |
|------|--------|
| wordpress-maintenance.mdx | Re-migrate with images |
| ai-chatbot.mdx | Re-migrate with images |
| b2b-email-lists.mdx | Re-migrate with images |
| data-integration.mdx | Re-migrate with images |

---

## TECHNICAL APPROACH

### Image Component
```tsx
// src/components/content/ContentImage.tsx
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ContentImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export function ContentImage({ src, alt, priority, className }: ContentImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        priority={priority}
        className="rounded-xl border border-border"
      />
    </motion.div>
  );
}
```

### Schema Update Example
```typescript
// content/schema/service.ts
export const ServiceSchema = z.object({
  // ... existing fields
  heroImage: z.string().optional(),
  images: z.array(z.object({
    src: z.string(),
    alt: z.string(),
    section: z.string().optional(),
  })).optional(),
});
```

### MDX Frontmatter Example
```yaml
---
title: "WordPress Maintenance"
description: "Premium white-glove WordPress maintenance..."
heroImage: "/images/services/wp-maintenance-hero.webp"
images:
  - src: "/images/services/wp-toolbox.webp"
    alt: "WordPress maintenance toolbox"
    section: "features"
  - src: "/images/services/wp-command-center.webp"
    alt: "Advanced maintenance command center"
    section: "enterprise"
# ... rest of frontmatter
---
```

---

## EXECUTION ORDER

| Step | Task | Estimated |
|------|------|-----------|
| 1 | SSH to WordPress, download missing webp images | 15 min |
| 2 | Rename all images semantically | 30 min |
| 3 | Create IMAGE-MANIFEST.md | 15 min |
| 4 | Update schemas with image fields | 15 min |
| 5 | Redesign ServiceLayout.tsx | 45 min |
| 6 | Redesign SolutionLayout.tsx | 30 min |
| 7 | Enhance StreamLayout.tsx | 20 min |
| 8 | Create ContentImage component | 10 min |
| 9 | Re-migrate 4 P1 pages with images | 40 min |
| 10 | Test and refine | 30 min |

**Total: ~4 hours**

---

## SUCCESS CRITERIA

1. **Visual Parity** — Service pages feel as rich as the homepage
2. **Image Integration** — AI-generated images appear in appropriate sections
3. **Animation Consistency** — Same Framer Motion patterns as homepage
4. **Schema Validation** — All image fields validated by Zod
5. **Build Passes** — No type errors, no broken images
6. **Performance** — Images optimized via next/image

---

## DEPENDENCIES

- [x] Typography system (prose-content class) — COMPLETE
- [x] Base layout components — COMPLETE
- [ ] Missing webp images from WordPress
- [ ] Semantic image naming convention

---

## RELATED DOCUMENTS

- `WORK-ORDER-IMAGE-RENAME.md` — Detailed image renaming spec
- `WORK-ORDER-CONTENT-MIGRATION.md` — Content migration process
- `5-CONTENT-INVENTORY.yaml` — Full list of WordPress content

---

*This work order gates the content migration. Complete this BEFORE migrating additional pages.*
