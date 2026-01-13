# Content Migration Plan: Leveraging Building Blocks

**Created:** 2026-01-13
**Purpose:** Systematically build content pages using ALL audit data, SEO info, and images

---

## Building Blocks Available

We have extensive audit data that MUST be incorporated when creating each page:

### 1. SEO Data (`docs/wordpress-audit/SEO-INVENTORY.yaml`)
```yaml
# Contains for EACH page:
- title: "WordPress meta title"
- meta_description: "SEO description (160 chars)"
- h1: "Main heading from WordPress"
- focus_keyword: "SEO target keyword"
- internal_links: count of links to page
- schema_type: "WebPage | Service | Article"
```

### 2. Image Assets (`docs/wordpress-audit/IMAGE-INVENTORY.yaml`)
```yaml
# P1 Images Downloaded:
heroes/
  - digital-heartbeat-hero.webp      # WordPress maintenance hero
services/
  - maintenance-command-center.webp  # Business tier visual
  - starter-toolbox.webp             # Essentials plan
  - growth-optimization.webp         # Growth plan
  - business-concierge.webp          # Business plan
solutions/
  - digital-navigation.webp          # Solutions hero
  - marketing-archer.webp            # Marketing hero
```

### 3. Redirect Map (`docs/wordpress-audit/REDIRECT-MAP.yaml`)
```yaml
# Ensures URL parity - check slugs match
/services/wordpress-maintenance → EXISTS (P1)
/services/ai-chatbot → EXISTS (P1)
/solutions/data-integration → EXISTS (P1)
# Many more need pages created
```

### 4. Internal Links (`docs/wordpress-audit/INTERNAL-LINKS.yaml`)
```yaml
# Shows linking structure - preserve link relationships
# Add related links section to each page
```

### 5. Content Schemas (Updated with Image Fields)
```typescript
// service.ts - now includes:
heroImage: { src, alt, width?, height? }
tierImages: { starter, growth, business }
images: [{ src, alt }]

// solution.ts - now includes:
heroImage: { src, alt }
caseStudy: { client, outcome, image }
images: []

// stream.ts - now includes:
featuredImage: { src, alt }
images: []
```

---

## Page Creation Workflow

### For EACH Page, Follow This Process:

#### Step 1: Gather Data
```bash
# 1. Find page in SEO-INVENTORY.yaml
grep -A 20 "slug: wordpress-maintenance" docs/wordpress-audit/SEO-INVENTORY.yaml

# 2. Find related images in IMAGE-INVENTORY.yaml
grep -A 10 "wordpress-maintenance\|maintenance" docs/wordpress-audit/IMAGE-INVENTORY.yaml

# 3. Check redirect exists in REDIRECT-MAP.yaml
grep "wordpress-maintenance" docs/wordpress-audit/REDIRECT-MAP.yaml

# 4. Find internal links to/from page
grep "wordpress-maintenance" docs/wordpress-audit/INTERNAL-LINKS.yaml
```

#### Step 2: Create MDX Frontmatter
Use SEO-INVENTORY data for meta fields:

```mdx
---
title: "{SEO-INVENTORY.title}"
description: "{SEO-INVENTORY.meta_description}"
slug: "{SEO-INVENTORY.slug}"
icon: "Wrench"
category: "wordpress"
features:
  - "Feature from WordPress content"
  - "..."
heroImage:
  src: "/images/heroes/digital-heartbeat-hero.webp"
  alt: "{IMAGE-INVENTORY.target_alt}"
tierImages:
  starter:
    src: "/images/services/starter-toolbox.webp"
    alt: "WordPress Essentials plan toolbox"
  growth:
    src: "/images/services/growth-optimization.webp"
    alt: "WordPress Growth plan optimization"
  business:
    src: "/images/services/business-concierge.webp"
    alt: "WordPress Business plan concierge service"
pricing:
  starting: 97
  unit: "/month"
published: true
order: 1
---

{MDX content migrated from WordPress}
```

#### Step 3: Verify Checklist
- [ ] Title matches SEO-INVENTORY (or improved)
- [ ] Description ≤ 160 chars
- [ ] Slug matches REDIRECT-MAP
- [ ] heroImage has proper alt text
- [ ] All tierImages/images have alt text
- [ ] Internal links preserved
- [ ] Build passes: `npm run build`

---

## Priority Order for Content Pages

### P0 - Already Exist (Verify SEO)
These pages exist but need SEO audit data applied:
1. `/services/wordpress-maintenance`
2. `/services/ai-chatbot`
3. `/services/b2b-email-lists`
4. `/solutions/data-integration`

### P1 - Critical Service Pages
Create these next:
1. `/services/seo-services` - High traffic
2. `/services/website-design` - Core offering
3. `/solutions/marketing-automation` - Key differentiator

### P2 - Solution Pages
1. `/solutions/ai-content-creation`
2. `/solutions/lead-generation`
3. `/solutions/workflow-automation`

### P3 - About/Info Pages
1. `/about` - Already exists, verify SEO
2. `/about/experience` - 30 years story
3. `/about/approach` - Methodology

### P4 - Stream/Blog Posts (14 total)
Migrate in reverse chronological order

---

## Template Components Available

### ServiceLayout (Step 10.5 - Being Enhanced)
- Hero section with image
- Features grid
- Pricing tiers with images
- CTA sections
- Prose content area

### SolutionLayout
- Hero with image
- Outcomes list
- Case study section with image
- Related solutions

### StreamLayout
- Featured image header
- Tags and metadata
- Prose content
- Related posts

---

## Image Assignment Map

### WordPress Maintenance Service
```yaml
heroImage: /images/heroes/digital-heartbeat-hero.webp
tierImages:
  starter: /images/services/starter-toolbox.webp
  growth: /images/services/growth-optimization.webp
  business: /images/services/business-concierge.webp
```

### Solutions Overview
```yaml
heroImage: /images/solutions/digital-navigation.webp
```

### Marketing/AI Services
```yaml
heroImage: /images/solutions/marketing-archer.webp
```

### Command Center Visual
```yaml
# Use for Business tier or enterprise content
image: /images/services/maintenance-command-center.webp
```

---

## 404 Errors Resolution

Current 404s are from REDIRECT-MAP entries without corresponding Next.js pages.

**Resolution:** As each page is created following this plan, 404s will resolve automatically.

**Tracking:** Check `docs/wordpress-audit/REDIRECT-MAP.yaml` - each redirect with `nextjs_page: false` needs a page created.

---

## Quality Checklist (Per Page)

### SEO
- [ ] `title` from SEO-INVENTORY or improved
- [ ] `description` ≤ 160 chars, includes keyword
- [ ] H1 matches intent
- [ ] Focus keyword naturally in content

### Images
- [ ] heroImage assigned with descriptive alt
- [ ] All images have alt text (accessibility)
- [ ] Images are WebP format (performance)
- [ ] Dimensions specified where possible

### Content
- [ ] Migrated from WordPress accurately
- [ ] Internal links preserved/updated
- [ ] CTAs point to /contact
- [ ] No broken links

### Technical
- [ ] `npm run build` passes
- [ ] Page renders correctly
- [ ] Mobile responsive
- [ ] Redirect works (if applicable)

---

## Automation Opportunities

### Future: Content Migration Script
```typescript
// Potential script structure
async function migrateContent(wordpressSlug: string) {
  const seo = await loadSEOInventory(wordpressSlug);
  const images = await findRelatedImages(wordpressSlug);
  const redirects = await getRedirectInfo(wordpressSlug);

  return generateMDXFrontmatter({ seo, images, redirects });
}
```

---

## Files to Reference During Migration

| File | Purpose |
|------|---------|
| `docs/wordpress-audit/SEO-INVENTORY.yaml` | Meta titles, descriptions, keywords |
| `docs/wordpress-audit/IMAGE-INVENTORY.yaml` | Image paths, alt text, assignments |
| `docs/wordpress-audit/REDIRECT-MAP.yaml` | URL slugs to match |
| `docs/wordpress-audit/INTERNAL-LINKS.yaml` | Link relationships to preserve |
| `content/schema/*.ts` | Frontmatter field requirements |
| `src/components/content/layouts/*` | Available layout components |
