# SEO Audit Process for WordPress → Next.js Migration

**Version:** 1.0
**Created:** 2026-01-11
**Purpose:** Repeatable process for auditing SEO metadata before migration
**Usage:** Run this process for each WordPress site migration (10+ sites planned)

---

## Overview

This process extracts SEO metadata from WordPress (via WP-CLI) and creates a structured YAML inventory that enables systematic migration with proper SEO preservation.

**Time estimate:** 30-45 minutes per site
**Output:** `docs/wordpress-audit/SEO-INVENTORY.yaml`

---

## Prerequisites

Before starting:
- [ ] SSH access to WordPress site configured
- [ ] WP-CLI available on server
- [ ] Page/post inventory already created (PAGE-INVENTORY.csv, POST-INVENTORY.csv)

---

## Step 1: Verify SEO Plugin

WordPress sites may use different SEO plugins. Identify which one:

```bash
# Check installed SEO plugins
ssh -p [PORT] [USER]@[HOST] "cd [WP_PATH] && wp plugin list --status=active --format=csv" | grep -i seo
```

**Common SEO plugins and their meta keys:**

| Plugin | Title Key | Description Key | Keywords Key |
|--------|-----------|-----------------|--------------|
| SEOPress | `_seopress_titles_title` | `_seopress_titles_desc` | `_seopress_analysis_target_kw` |
| Yoast SEO | `_yoast_wpseo_title` | `_yoast_wpseo_metadesc` | `_yoast_wpseo_focuskw` |
| Rank Math | `rank_math_title` | `rank_math_description` | `rank_math_focus_keyword` |
| All in One SEO | `_aioseo_title` | `_aioseo_description` | `_aioseo_keywords` |

**For this project (Last Apple):** SEOPress is used.

---

## Step 2: Extract SEO Data for All Pages

Run this command to get SEO metadata for all published pages and posts:

```bash
ssh -p [PORT] [USER]@[HOST] "cd [WP_PATH] && wp post list --post_type=page,post --post_status=publish --fields=ID,post_title --format=csv | while IFS=',' read id title; do if [ \"\$id\" != 'ID' ]; then seo_title=\$(wp post meta get \$id _seopress_titles_title 2>/dev/null); seo_desc=\$(wp post meta get \$id _seopress_titles_desc 2>/dev/null); echo \"\$id|\$title|\${seo_title:-EMPTY}|\${seo_desc:-EMPTY}\"; fi; done"
```

**Example output:**
```
4406|"WordPress Maintenance"|Comprehensive WordPress Maintenance Services | Last Apple|Focus on your business while Last Apple ensures...
8970|"AI-Powered Chatbot Solutions"|EMPTY|EMPTY
```

---

## Step 3: Analyze Results

Categorize each page into one of four statuses:

| Status | Criteria | Action |
|--------|----------|--------|
| **READY** | SEO title and description present and correct | Use as-is |
| **WRONG** | SEO data exists but is incorrect (copy-paste error, wrong page) | Create correct SEO |
| **EMPTY** | No SEO data present | Create from page content |
| **SKIP** | Page not being migrated (utility, WooCommerce, etc.) | Redirect only |

**Common issues to look for:**
- Same SEO data on multiple pages (copy-paste during creation)
- SEO data that doesn't match page content
- Missing descriptions (title exists but not description)
- Descriptions over 160 characters

---

## Step 4: Create SEO-INVENTORY.yaml

Create the inventory file with this structure:

```yaml
# SEO Inventory - [Site Name] WordPress → Next.js Migration
# Generated: [DATE]
# Purpose: Track SEO state for systematic migration

# STATUS VALUES:
#   READY  - WordPress data correct, can migrate as-is
#   WRONG  - WordPress data exists but incorrect
#   EMPTY  - No WordPress data, needs creation
#   SKIP   - Not migrating (utility pages)

# PRIORITY VALUES:
#   P1 - Core business pages
#   P2 - Supporting pages
#   P3 - Blog posts
#   P4 - Legal/utility

summary:
  total_pages: [NUMBER]
  seo_status:
    ready: [NUMBER]
    wrong: [NUMBER]
    empty: [NUMBER]
    skip: [NUMBER]

# Then for each page:
[category]:
  [slug]:
    wp_id: [ID]
    wp_title: "[Original WordPress title]"
    nextjs_path: /[new/path]
    type: page|post
    category: service|solution|stream|static|legal
    priority: P1|P2|P3|P4
    dates:
      published: "YYYY-MM-DD"
      modified: "YYYY-MM-DD"
    seo:
      status: READY|WRONG|EMPTY|SKIP
      wp_title: "[Current WordPress SEO title or null]"
      wp_description: "[Current WordPress SEO description or null]"
      wp_keywords: "[Current keywords or null]"
      target_title: "[Final title for Next.js - max 60 chars]"
      target_description: "[Final description - max 160 chars]"
      target_keywords: "[Comma-separated keywords]"
      notes: "[What needs to be done]"
    images:
      hero: null  # Populated in image audit
      og_image: null
    migration:
      status: NOT_STARTED
      content_migrated: false
      seo_verified: false
```

---

## Step 5: Get Publish/Modified Dates

For accurate sitemap `<lastmod>` values:

```bash
ssh -p [PORT] [USER]@[HOST] "cd [WP_PATH] && wp post list --post_type=page,post --post_status=publish --fields=ID,post_name,post_date,post_modified --format=csv"
```

---

## Step 6: Propose Target SEO (for EMPTY/WRONG pages)

For pages without SEO or with wrong SEO, create proposed values:

**Title guidelines:**
- Max 60 characters
- Include primary keyword near start
- Include brand name at end (e.g., "| Last Apple")
- Be descriptive and compelling

**Description guidelines:**
- Max 160 characters
- Include primary keyword naturally
- Include call-to-action or value proposition
- Front-load important information

**Note:** Target values are proposals. Final values should be refined through semantic analysis of actual page content during migration.

---

## Step 7: Validate and Document

Before finalizing:

- [ ] All pages accounted for (compare against PAGE-INVENTORY.csv)
- [ ] All posts accounted for (compare against POST-INVENTORY.csv)
- [ ] Each page has a status assigned
- [ ] WRONG pages have notes explaining the issue
- [ ] EMPTY pages have proposed target values
- [ ] Summary statistics are accurate

---

## Quick Reference Commands

```bash
# Get SEO for specific page
wp post meta get [ID] _seopress_titles_title
wp post meta get [ID] _seopress_titles_desc

# Get all meta for a page (to find SEO plugin keys)
wp post meta list [ID] --format=json | grep -i seo

# Count pages by SEO status (after creating inventory)
grep "status: READY" SEO-INVENTORY.yaml | wc -l
grep "status: EMPTY" SEO-INVENTORY.yaml | wc -l
```

---

## Checklist for Future Sites

```markdown
## SEO Audit Checklist - [Site Name]

### Preparation
- [ ] SSH access verified
- [ ] WP-CLI working
- [ ] SEO plugin identified: ____________
- [ ] Meta keys confirmed: title=__________ desc=__________

### Execution
- [ ] Page inventory exists (PAGE-INVENTORY.csv)
- [ ] Post inventory exists (POST-INVENTORY.csv)
- [ ] SEO data extracted for all pages
- [ ] SEO data extracted for all posts
- [ ] Results categorized (READY/WRONG/EMPTY/SKIP)
- [ ] Dates extracted (published, modified)

### Documentation
- [ ] SEO-INVENTORY.yaml created
- [ ] Summary statistics accurate
- [ ] WRONG pages documented with notes
- [ ] EMPTY pages have proposed targets
- [ ] YAML committed to repo

### Sign-off
- [ ] Reviewed by: __________
- [ ] Date: __________
```

---

## Troubleshooting

**Issue: WP-CLI not found**
```bash
# Check if WP-CLI is installed
which wp
# Or specify full path
/usr/local/bin/wp post list...
```

**Issue: Permission denied on meta**
```bash
# Some hosts restrict WP-CLI. Try with --allow-root if running as root
wp post meta get [ID] _seopress_titles_title --allow-root
```

**Issue: SEO plugin not storing in postmeta**
Some plugins store SEO data differently. Check:
- Plugin settings for storage location
- Custom database tables
- Serialized options

---

## Related Documents

- `PAGE-INVENTORY.csv` - WordPress page list
- `POST-INVENTORY.csv` - WordPress post list
- `REDIRECT-MAP.yaml` - URL mappings
- `IMAGE-AUDIT-PROCESS.md` - Image extraction process (companion doc)

---

*This process was developed during the Last Apple migration and refined for reuse across 10+ planned site migrations.*
