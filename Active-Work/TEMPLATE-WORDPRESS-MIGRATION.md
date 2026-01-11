# WordPress → Next.js Migration Template

**Purpose:** Repeatable process for migrating WordPress sites to the Next.js stack.
**Target:** 10 sites using this template.
**Goal:** Each migration faster than the last. Perfect the process.

---

## Pre-Migration Checklist

Before starting any migration:

- [ ] SSH access to WordPress server confirmed
- [ ] WP-CLI available on server
- [ ] Git repository created for new site
- [ ] Vercel project created (or will create)
- [ ] Domain DNS access available
- [ ] Client approved migration timeline

---

## Phase 1: Discovery (1-2 hours)

### 1.1 Site Audit
```bash
# Connect and audit
ssh -p [PORT] [USER]@[HOST] "cd [WP_PATH] && wp post list --post_type=page --format=table"
ssh -p [PORT] [USER]@[HOST] "cd [WP_PATH] && wp post list --post_type=post --format=table"
```

**Document:**
| Item | Count | Notes |
|------|-------|-------|
| Pages | | |
| Posts | | |
| Custom Post Types | | |
| Media files | | |
| Forms | | |
| Plugins (functional) | | |

### 1.2 Content Priority Matrix

| Priority | Content Type | Examples | Migration Approach |
|----------|--------------|----------|-------------------|
| P0 | Homepage | — | Manual rebuild with new design |
| P1 | Core Services | Service pages, pricing | MDX with components |
| P2 | About/Contact | Static info | MDX simple |
| P3 | Blog/News | Posts | Batch MDX conversion |
| P4 | Legacy | Old content | Archive or skip |

### 1.3 Functional Requirements

| WordPress Feature | Replacement |
|-------------------|-------------|
| Contact Form 7 | Formspree / Resend |
| WooCommerce | Stripe / Shopify Lite |
| Yoast SEO | Next.js metadata API |
| Elementor layouts | React components |
| Custom widgets | React components |
| Comments | Disqus / Giscus / None |

---

## Phase 2: Export (1 hour)

### 2.1 Run wp-harvest for Media
```bash
# Create media URL list on server
ssh -p [PORT] [USER]@[HOST] "cd [WP_PATH] && wp post list --post_type=attachment --field=guid" > media-urls.txt

# Download all media
./tools/wp-harvest.sh --from-list media-urls.txt ./public/images/wp
```

### 2.2 Export All Content
```bash
# Pages
ssh -p [PORT] [USER]@[HOST] \
  "cd [WP_PATH] && wp post list --post_type=page --format=json" > exports/pages.json

# Posts
ssh -p [PORT] [USER]@[HOST] \
  "cd [WP_PATH] && wp post list --post_type=post --format=json" > exports/posts.json

# Individual page content (for complex pages)
ssh -p [PORT] [USER]@[HOST] \
  "cd [WP_PATH] && wp post get [ID] --format=json" > exports/page-[ID].json

# Menus
ssh -p [PORT] [USER]@[HOST] \
  "cd [WP_PATH] && wp menu list --format=json" > exports/menus.json

# Options (site settings)
ssh -p [PORT] [USER]@[HOST] \
  "cd [WP_PATH] && wp option list --format=json" > exports/options.json
```

### 2.3 Export Checklist
- [ ] All pages exported
- [ ] All posts exported
- [ ] Media downloaded to `public/images/wp/`
- [ ] Menus exported
- [ ] Contact info extracted
- [ ] Custom fields/ACF exported (if applicable)

---

## Phase 3: Scaffold (2 hours)

### 3.1 Clone Base Template
```bash
# Option A: Clone lastapple-nextjs as template
git clone [lastapple-nextjs-repo] [new-site-name]
cd [new-site-name]
rm -rf .git
git init

# Option B: Use degit (cleaner)
npx degit [template-repo] [new-site-name]
```

### 3.2 Configure for New Site
```bash
# Update package.json
# - name
# - description

# Update next.config.ts
# - Site-specific settings

# Update src/app/globals.css
# - Brand colors (hex values)

# Update content/contact-info.json
# - Business details
```

### 3.3 Brand Customization Checklist
- [ ] Logo replaced
- [ ] Colors updated in globals.css
- [ ] Fonts configured (if different)
- [ ] Favicon updated
- [ ] OG images created
- [ ] Contact info updated

---

## Phase 4: Content Conversion (4-8 hours)

### 4.1 Conversion Rules

**HTML → Markdown:**
| WordPress/Elementor | MDX |
|---------------------|-----|
| `<h1>` | `#` |
| `<h2>` | `##` |
| `<p>` | Plain text |
| `<ul><li>` | `- ` |
| `<a href="">` | `[text](url)` |
| `<strong>` | `**text**` |
| `<img src="">` | `![alt](/images/wp/file.jpg)` |
| `[elementor-template]` | DELETE |
| `[contact-form-7]` | `<ContactForm />` |
| `style="..."` | DELETE |

### 4.2 Image Path Updates
```
# From WordPress
https://example.com/wp-content/uploads/2021/02/image.jpg

# To Next.js
/images/wp/image.jpg
```

### 4.3 Frontmatter Template
```yaml
---
title: "Page Title"
description: "Meta description (max 160 chars)"
slug: "url-slug"
publishedAt: "2026-01-10"
updatedAt: "2026-01-10"
tags: ["tag1", "tag2"]
published: true
---
```

### 4.4 Content Conversion Order
1. Homepage (manual, custom components)
2. Core service pages (MDX + components)
3. About/Contact (simple MDX)
4. Blog posts (batch conversion)
5. Secondary pages (as needed)

---

## Phase 5: Component Mapping (2-4 hours)

### 5.1 Common WordPress → React Mappings

| WordPress Element | React Component |
|-------------------|-----------------|
| Hero section | `<Hero />` |
| Pricing table | `<PricingSection />` |
| Testimonials | `<Testimonials />` |
| Feature grid | `<FeaturesGrid />` |
| CTA section | `<CTASection />` |
| Contact form | `<ContactForm />` |
| FAQ accordion | `<FAQ />` |
| Team grid | `<TeamGrid />` |

### 5.2 Create Site-Specific Components
```
src/components/
├── ui/                 # shadcn/ui (shared)
├── Hero.tsx           # Site-specific hero
├── Services.tsx       # Site-specific services
└── [custom].tsx       # As needed
```

---

## Phase 6: Testing & QA (2 hours)

### 6.1 Build Verification
```bash
npm run build    # Must pass
npm run lint     # Must pass
npm run dev      # Visual check
```

### 6.2 Content Checklist
- [ ] All pages render correctly
- [ ] All images load
- [ ] All links work (no 404s)
- [ ] Forms submit correctly
- [ ] Mobile responsive
- [ ] Lighthouse score > 90

### 6.3 SEO Verification
- [ ] Meta titles set
- [ ] Meta descriptions set
- [ ] OG images configured
- [ ] Canonical URLs correct
- [ ] Sitemap generates
- [ ] robots.txt correct

---

## Phase 7: Deployment (1 hour)

### 7.1 Vercel Deployment
```bash
# First deploy
vercel

# Production deploy
vercel --prod

# Or connect to GitHub for auto-deploy
```

### 7.2 DNS Cutover
```
# Add to domain DNS:
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

### 7.3 Post-Deploy Verification
- [ ] Site loads on production domain
- [ ] SSL certificate active
- [ ] All pages accessible
- [ ] Forms working in production
- [ ] Analytics configured
- [ ] Redirects from old URLs working

---

## Phase 8: Cleanup (30 min)

### 8.1 Old Site
- [ ] WordPress site backed up
- [ ] WordPress site put in maintenance mode (or redirecting)
- [ ] Decision: archive or delete WordPress

### 8.2 Documentation
- [ ] Migration notes documented
- [ ] Access credentials updated
- [ ] Client trained on content editing
- [ ] Handoff complete

---

## Tools Used

| Tool | Purpose | Location |
|------|---------|----------|
| `wp-harvest.sh` | Download WordPress media | `tools/wp-harvest.sh` |
| WP-CLI | Export content via SSH | On WordPress server |
| `npm run build` | Validate content | — |

---

## Time Estimates

| Phase | First Site | After Practice |
|-------|------------|----------------|
| Discovery | 2 hours | 1 hour |
| Export | 1 hour | 30 min |
| Scaffold | 2 hours | 30 min |
| Content Conversion | 8 hours | 4 hours |
| Component Mapping | 4 hours | 2 hours |
| Testing | 2 hours | 1 hour |
| Deployment | 1 hour | 30 min |
| **Total** | **20 hours** | **10 hours** |

---

## Lessons Learned

*Update this section after each migration:*

### Site 1: lastapple.com
- Date: January 2026
- Notes: First migration. Template established.
- Improvements: [TBD]

### Site 2: [TBD]
- Date:
- Notes:
- Improvements:

---

## Migration Queue

| # | Site | Status | Priority | Notes |
|---|------|--------|----------|-------|
| 1 | lastapple.com | In Progress | — | Template site |
| 2 | | Queued | | |
| 3 | | Queued | | |
| 4 | | Queued | | |
| 5 | | Queued | | |
| 6 | | Queued | | |
| 7 | | Queued | | |
| 8 | | Queued | | |
| 9 | | Queued | | |
| 10 | | Queued | | |

---

*This template improves with each migration. Document what works, what doesn't, and refine.*
