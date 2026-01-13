# Pre-Migration Checklist

**Version:** 1.0
**Created:** 2026-01-11
**Purpose:** Quality gate for each page migration - ensures consistent quality and no missing metadata

---

## Overview

Use this checklist for EVERY page migrated from WordPress to Next.js. Complete all items before marking a page as "migrated" in the progress tracker.

---

## Per-Page Migration Checklist

### Page: _________________ (slug)

#### 1. Pre-Migration Verification
- [ ] Page exists in SEO-INVENTORY.yaml
- [ ] Page exists in IMAGE-INVENTORY.yaml (if has images)
- [ ] Redirect exists in next.config.ts
- [ ] URL mapping exists in INTERNAL-LINKS.yaml

#### 2. Content Extraction
- [ ] Page content copied from WordPress
- [ ] Heading structure documented (H1, H2, H3)
- [ ] No SEO issues (single H1, no skipped levels)
- [ ] Internal links identified for rewriting

#### 3. SEO Metadata
- [ ] Meta title extracted/created (max 60 chars)
  - Source: `_seopress_titles_title` or new if EMPTY
  - Value: _________________________________
- [ ] Meta description extracted/created (max 160 chars)
  - Source: `_seopress_titles_desc` or new if EMPTY
  - Value: _________________________________
- [ ] Focus keywords noted (for content review)
  - Value: _________________________________
- [ ] Publish date captured
  - Value: _________________________________
- [ ] Last modified date captured (for sitemap)
  - Value: _________________________________

#### 4. Images
- [ ] All images identified from IMAGE-INVENTORY.yaml
- [ ] Images downloaded to /public/images/
- [ ] Images renamed with semantic names
- [ ] Alt text present for all images
  - [ ] Missing alt text flagged for creation
- [ ] Image paths updated in MDX content
- [ ] Hero image set in frontmatter (if applicable)

#### 5. Internal Links
- [ ] All WordPress URLs replaced with Next.js paths
- [ ] Used INTERNAL-LINKS.yaml url_mapping for replacements
- [ ] No absolute URLs to lastapple.com remain
- [ ] All links tested/verified

#### 6. MDX File Creation
- [ ] File created: `content/[type]/[slug].mdx`
- [ ] Frontmatter complete:
  ```yaml
  ---
  title: "[Page title]"
  description: "[Meta description]"
  publishedAt: "[YYYY-MM-DD]"
  updatedAt: "[YYYY-MM-DD]"
  heroImage: "[/images/path or null]"
  tags: ["tag1", "tag2"]
  featured: false
  published: true
  ---
  ```
- [ ] Content properly formatted in MDX
- [ ] Build passes with new file

#### 7. Post-Migration Verification
- [ ] Page renders at new URL
- [ ] Old URL redirects to new URL (301)
- [ ] Meta tags correct in page source
- [ ] Images load correctly
- [ ] Internal links work
- [ ] No console errors
- [ ] Mobile responsive

---

## Quick Reference: SEO Status Actions

| SEO Status | Action Required |
|------------|-----------------|
| READY | Use WordPress values as-is |
| WRONG | Create new values based on page content |
| EMPTY | Create new values based on page content |
| SKIP | Redirect only, no migration needed |

---

## Quick Reference: Image Status Actions

| Alt Status | Action Required |
|------------|-----------------|
| OK | Use existing alt text |
| MISSING | Create descriptive alt text |
| NEEDS_IMPROVEMENT | Improve existing alt text |

---

## Batch Migration Template

For tracking multiple pages:

```markdown
## Migration Batch: [Date]

| Page | SEO | Images | Links | MDX | Verified |
|------|-----|--------|-------|-----|----------|
| wordpress-maintenance | ✅ | ✅ | ✅ | ✅ | ✅ |
| ai-chatbot | ✅ | ⏳ | ⏳ | ⏳ | ⏳ |
| b2b-email-lists | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |

Legend: ✅ Complete | ⏳ Pending | ❌ Blocked
```

---

## Common Issues & Solutions

### Issue: SEO title too long
**Solution:** Truncate to 60 chars, prioritize keywords at start

### Issue: Meta description missing
**Solution:** Write 150-160 char summary of page purpose + CTA

### Issue: Image has no alt text
**Solution:** Describe image content, include relevant keyword naturally

### Issue: Internal link points to old WordPress URL
**Solution:** Use url_mapping from INTERNAL-LINKS.yaml

### Issue: Multiple H1 tags in content
**Solution:** Change additional H1s to H2s

### Issue: Heading levels skipped (H1 → H3)
**Solution:** Insert appropriate H2 or change H3 to H2

---

## Sign-off

```
Page: _________________
Migrated by: _________________
Date: _________________
Verified by: _________________
Date: _________________
```

---

## Related Documents

- `docs/wordpress-audit/SEO-INVENTORY.yaml` - SEO data for all pages
- `docs/wordpress-audit/IMAGE-INVENTORY.yaml` - Image inventory
- `docs/wordpress-audit/INTERNAL-LINKS.yaml` - URL mapping table
- `docs/processes/SEO-AUDIT-PROCESS.md` - How SEO data was extracted
- `docs/processes/IMAGE-AUDIT-PROCESS.md` - How images were cataloged
