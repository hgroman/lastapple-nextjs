# Image Audit Process for WordPress → Next.js Migration

**Version:** 1.0
**Created:** 2026-01-11
**Purpose:** Repeatable process for auditing images before migration
**Usage:** Run this process for each WordPress site migration (10+ sites planned)

---

## Overview

This process extracts image data from WordPress (via WP-CLI and media library) and creates a structured YAML inventory that enables systematic migration with proper image handling.

**Time estimate:** 30-45 minutes per site
**Output:** `docs/wordpress-audit/IMAGE-INVENTORY.yaml`

---

## Prerequisites

Before starting:
- [ ] SSH access to WordPress site configured
- [ ] WP-CLI available on server
- [ ] SEO inventory already created (SEO-INVENTORY.yaml)

---

## Step 1: Get Media Library Inventory

Extract all images from WordPress media library:

```bash
ssh -p [PORT] [USER]@[HOST] "cd [WP_PATH] && wp post list --post_type=attachment --post_mime_type=image --fields=ID,post_title,post_name,guid --format=csv"
```

This returns all uploaded images with their WordPress URLs.

---

## Step 2: Get Featured Images (Post Thumbnails)

Extract featured image associations:

```bash
ssh -p [PORT] [USER]@[HOST] "cd [WP_PATH] && wp post list --post_type=page,post --post_status=publish --fields=ID,post_title --format=csv | while IFS=',' read id title; do if [ \"\$id\" != 'ID' ]; then thumb_id=\$(wp post meta get \$id _thumbnail_id 2>/dev/null); if [ -n \"\$thumb_id\" ]; then thumb_url=\$(wp post get \$thumb_id --field=guid 2>/dev/null); echo \"\$id|\$title|\$thumb_id|\$thumb_url\"; fi; fi; done"
```

---

## Step 3: Scan for Inline Images in Content

For Elementor-built pages, images are embedded in page content. Extract them:

```bash
# Get Elementor data for a specific page
ssh -p [PORT] [USER]@[HOST] "cd [WP_PATH] && wp post meta get [PAGE_ID] _elementor_data" | grep -o '"url":"[^"]*"' | grep -E '\.(jpg|jpeg|png|webp|gif|svg)' | sort -u
```

For non-Elementor pages (standard WordPress content):

```bash
# Search post_content for image URLs
ssh -p [PORT] [USER]@[HOST] "cd [WP_PATH] && wp db query \"SELECT ID, post_title, post_content FROM wp_posts WHERE post_status='publish' AND post_type IN ('page','post')\" --skip-column-names" | grep -oE 'https?://[^\"'\''<>]+\.(jpg|jpeg|png|webp|gif|svg)' | sort -u
```

---

## Step 4: Get Image Alt Text

Alt text is stored in post meta for attachments:

```bash
ssh -p [PORT] [USER]@[HOST] "cd [WP_PATH] && wp post list --post_type=attachment --post_mime_type=image --fields=ID --format=csv | while IFS=',' read id; do if [ \"\$id\" != 'ID' ]; then alt=\$(wp post meta get \$id _wp_attachment_image_alt 2>/dev/null); url=\$(wp post get \$id --field=guid 2>/dev/null); echo \"\$id|\$url|\${alt:-NO_ALT}\"; fi; done"
```

---

## Step 5: Identify Image Categories

Categorize images by their usage:

| Category | Description | Example |
|----------|-------------|---------|
| **hero** | Large header/banner images | Page hero sections |
| **featured** | Post thumbnails, OG images | Blog featured images |
| **inline** | Images within content | Screenshots, diagrams |
| **icon** | Small UI elements | Service icons |
| **logo** | Brand assets | Company logos |
| **background** | CSS background images | Section backgrounds |
| **gallery** | Image collections | Portfolio galleries |

---

## Step 6: Create IMAGE-INVENTORY.yaml

```yaml
# Image Inventory - [Site Name] WordPress → Next.js Migration
# Generated: [DATE]

summary:
  total_images: [NUMBER]
  by_category:
    hero: [NUMBER]
    featured: [NUMBER]
    inline: [NUMBER]
    icon: [NUMBER]
    logo: [NUMBER]
    background: [NUMBER]
  alt_text_status:
    has_alt: [NUMBER]
    missing_alt: [NUMBER]
    needs_improvement: [NUMBER]

# Images organized by their primary page association
pages:
  [page-slug]:
    wp_id: [PAGE_ID]
    images:
      - id: [IMAGE_ID]
        filename: "[original-filename.jpg]"
        wp_url: "https://site.com/wp-content/uploads/..."
        category: hero|featured|inline|icon|background
        position: "hero section"|"content block 2"|etc
        alt_text: "[current alt text or null]"
        alt_status: OK|MISSING|NEEDS_IMPROVEMENT
        target_path: "/images/[category]/[semantic-name.ext]"
        target_alt: "[proposed alt text]"
        dimensions: "[WxH if known]"
        notes: "[any issues or actions needed]"

# Orphan images (in media library but not used on pages)
orphans:
  - id: [IMAGE_ID]
    filename: "[filename]"
    wp_url: "[url]"
    notes: "Not referenced in any published page"

# External images (hosted elsewhere, referenced in content)
external:
  - url: "[external URL]"
    used_on: [PAGE_ID]
    notes: "Consider downloading or replacing"
```

---

## Step 7: Assess Alt Text Quality

For each image, evaluate alt text:

| Status | Criteria |
|--------|----------|
| **OK** | Descriptive, relevant, not keyword-stuffed |
| **MISSING** | No alt text present |
| **NEEDS_IMPROVEMENT** | Generic ("image-1"), too short, or keyword-stuffed |

**Good alt text guidelines:**
- Describe the image content, not the page
- 125 characters or less
- Include relevant keywords naturally
- Don't start with "Image of" or "Picture of"
- Decorative images should have empty alt=""

---

## Step 8: Plan Image Migration

For each image, determine:

1. **Keep or remove?** - Is this image still needed?
2. **Rename?** - Should filename be more semantic?
3. **Optimize?** - Does it need compression/resizing?
4. **Alt text?** - Does it need new/better alt text?

**Naming convention for target paths:**
```
/images/
├── heroes/
│   └── [page-slug]-hero.webp
├── services/
│   └── [service-name]-[description].webp
├── solutions/
│   └── [solution-name]-[description].webp
├── stream/
│   └── [post-slug]-featured.webp
├── icons/
│   └── [icon-name].svg
└── logos/
    └── [company]-logo.svg
```

---

## Quick Reference Commands

```bash
# Count total images in media library
wp post list --post_type=attachment --post_mime_type=image --format=count

# Get specific image details
wp post get [ATTACHMENT_ID] --format=json

# Get image metadata (dimensions, etc.)
wp post meta get [ATTACHMENT_ID] _wp_attachment_metadata

# Find images used in specific page (Elementor)
wp post meta get [PAGE_ID] _elementor_data | grep -o '"url":"[^"]*"' | grep -E '\.(jpg|jpeg|png|webp)'

# List all unique image URLs in database
wp db query "SELECT guid FROM wp_posts WHERE post_type='attachment' AND post_mime_type LIKE 'image/%'" --skip-column-names | sort -u
```

---

## Checklist for Future Sites

```markdown
## Image Audit Checklist - [Site Name]

### Preparation
- [ ] SSH access verified
- [ ] WP-CLI working
- [ ] SEO inventory complete

### Extraction
- [ ] Media library inventory extracted
- [ ] Featured images mapped to pages
- [ ] Inline images scanned (Elementor data)
- [ ] Alt text extracted for all images
- [ ] External image URLs identified

### Analysis
- [ ] Images categorized (hero/featured/inline/etc.)
- [ ] Alt text assessed (OK/MISSING/NEEDS_IMPROVEMENT)
- [ ] Orphan images identified
- [ ] Target paths planned

### Documentation
- [ ] IMAGE-INVENTORY.yaml created
- [ ] Summary statistics accurate
- [ ] MISSING alt text flagged
- [ ] YAML committed to repo

### Sign-off
- [ ] Reviewed by: __________
- [ ] Date: __________
```

---

## Troubleshooting

**Issue: Elementor data is serialized/escaped**
```bash
# Decode and format Elementor data
wp post meta get [ID] _elementor_data | php -r 'echo json_encode(json_decode(file_get_contents("php://stdin")), JSON_PRETTY_PRINT);'
```

**Issue: Images in custom fields**
Check for ACF or custom meta fields that might contain image IDs:
```bash
wp post meta list [ID] --format=json | grep -i image
```

**Issue: Images in theme options**
Some themes store images in options table:
```bash
wp option get theme_mods_[theme_name] --format=json | grep -i image
```

---

## Related Documents

- `SEO-AUDIT-PROCESS.md` - SEO extraction process
- `PAGE-INVENTORY.csv` - WordPress page list
- `SEO-INVENTORY.yaml` - SEO metadata inventory
- `REDIRECT-MAP.yaml` - URL mappings

---

*This process was developed during the Last Apple migration and refined for reuse across 10+ planned site migrations.*
