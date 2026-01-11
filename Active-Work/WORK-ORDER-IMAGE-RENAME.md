# Image Rename with AI Descriptions - Work Order

**Issue Date:** January 10, 2026
**Priority:** LOW (post-migration)
**Objective:** Rename WordPress media files with AI-generated descriptive names

---

## PREREQUISITES

Complete these BEFORE starting this work order:

- [ ] All WordPress content migrated to MDX
- [ ] All MDX pages verified to load images correctly
- [ ] Site builds successfully with current image names

---

## CURRENT STATE

**Location:** `public/images/wp/`
**Count:** 52 files (3.6MB)

**Problem files (cryptic names):**
- `92d1cc82-f5e9-476c-9a43-dae0b45915d3-1.jpg` — No idea what this is
- `logo_medium115.gif` through `logo_medium98.gif` — 35 client logos, which is which?

**Already descriptive (may not need renaming):**
- `back-office-AdobeStock_125581183.jpg`
- `contact-center-2-AdobeStock_153160005.jpg`
- `digital-marketing-AdobeStock_252760983.jpg`
- `last-apple-logo-*.png`
- `Original-on-Transparent.png`
- `Original.svg`

---

## APPROACH

### Phase 1: AI Analysis

Use Claude (or local LLaVA) to analyze each image and generate descriptive names.

**Naming Convention:**
```
[category]-[description]-[size-if-variant].ext

Examples:
- client-logo-acme-corp.gif
- hero-office-team-collaboration.jpg
- service-ai-chatbot-illustration.jpg
```

**Categories:**
- `client-logo-` — Client/partner logos
- `hero-` — Hero section images
- `service-` — Service page images
- `team-` — Team/about images
- `icon-` — Icons and small graphics
- `bg-` — Background images

### Phase 2: Generate Rename Script

Create a mapping file and bash script:

```bash
# rename-mapping.txt
92d1cc82-f5e9-476c-9a43-dae0b45915d3-1.jpg -> hero-ai-dashboard-preview.jpg
logo_medium115.gif -> client-logo-acme-corp.gif
...
```

### Phase 3: Update MDX References

Find and replace old names with new names across all MDX files:

```bash
# For each rename
grep -rl "old-filename.jpg" content/ | xargs sed -i '' 's/old-filename.jpg/new-filename.jpg/g'
```

### Phase 4: Verify

- [ ] All images load correctly
- [ ] Build passes
- [ ] No broken image references
- [ ] Commit with clear message

---

## TOOLS

**AI Analysis Options:**

1. **Claude Session** — Read images directly, suggest names
2. **Local LLaVA** — `ollama run llava` + script
3. **Claude API** — Batch script using `@anthropic-ai/sdk`

**Reusable Tool:** `tools/wp-media-pull.sh`

---

## ESTIMATED EFFORT

| Phase | Tasks | Estimate |
|-------|-------|----------|
| Phase 1 | AI analysis of 52 images | 30 min |
| Phase 2 | Generate rename script | 15 min |
| Phase 3 | Update MDX references | 30 min |
| Phase 4 | Verify and commit | 15 min |
| **Total** | | **~1.5 hours** |

---

## DEPENDENCIES

- Content migration complete (WORK-ORDER-PRICING.md adjacent task)
- All service pages built and linked
- All blog posts migrated with images

---

*This work order is blocked until content migration is complete.*
