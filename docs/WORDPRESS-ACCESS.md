# WordPress Access & Migration Reference

This document contains credentials and commands for accessing the WordPress site during content migration.

---

## SSH Access

### Connection Details
```bash
ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz
```

| Property | Value |
|----------|-------|
| Host | gcam1100.siteground.biz |
| Port | 18765 |
| Username | u1596-ygnccu9irco4 |
| WordPress Path | /home/customer/www/lastapple.com/public_html/ |

### Quick Test
```bash
ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz "echo 'Connected' && wp --version"
```

---

## WP-CLI Commands

All commands must specify the WordPress path or `cd` to it first.

### List Content

**List all pages:**
```bash
ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz \
  "cd /home/customer/www/lastapple.com/public_html && wp post list --post_type=page --fields=ID,post_title,post_name --format=table"
```

**List all posts:**
```bash
ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz \
  "cd /home/customer/www/lastapple.com/public_html && wp post list --post_type=post --fields=ID,post_title,post_name --format=table"
```

**List published only:**
```bash
ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz \
  "cd /home/customer/www/lastapple.com/public_html && wp post list --post_type=page --post_status=publish --format=table"
```

### Export Content

**Export single post/page to JSON:**
```bash
ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz \
  "cd /home/customer/www/lastapple.com/public_html && wp post get 4406 --format=json"
```

**Export post content only:**
```bash
ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz \
  "cd /home/customer/www/lastapple.com/public_html && wp post get 4406 --field=post_content"
```

**Export with metadata:**
```bash
ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz \
  "cd /home/customer/www/lastapple.com/public_html && wp post meta list 4406 --format=json"
```

### Search Content

**Find pages by title:**
```bash
ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz \
  "cd /home/customer/www/lastapple.com/public_html && wp post list --post_type=page --s='maintenance' --format=table"
```

---

## Known Content Inventory

### Key Pages (by ID)
| ID | Title | Priority |
|----|-------|----------|
| 4406 | WordPress Maintenance | High |
| 10833 | AI-Powered B2B Email List Services | High |
| 9853 | WordPress Maintenance Onboarding | Medium |
| 9816 | Maintenance Plans | High |
| 9131 | AI-Driven Data Integration | High |
| 8970 | AI-Powered Chatbot Solutions | High |
| 8940 | About | Medium |
| 9628 | Free SEO Audit | Medium |

### Blog Posts (14 total)
Located in archived exports at:
```
lastapple-archive/TRANSFER-TO-LAUNCHPAD/docs/03-reference/wordpress-exports/post/
```

Notable posts:
- Coffee Shop SEO guide (post-11206)
- AI marketing content
- WordPress tips

---

## Migration Workflow

### Step 1: Export from WordPress
```bash
# Get the content
ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz \
  "cd /home/customer/www/lastapple.com/public_html && wp post get 4406 --format=json" > temp-export.json
```

### Step 2: Extract and Clean
```javascript
// The JSON contains:
{
  "ID": 4406,
  "post_title": "WordPress Maintenance",
  "post_content": "<h1>Premium WordPress...</h1>...",
  "post_excerpt": "...",
  "post_name": "wordpress-maintenance",
  "post_status": "publish"
}
```

### Step 3: Convert to MDX
```mdx
---
title: "WordPress Maintenance"
description: "Premium WordPress maintenance services for businesses."
publishedAt: "2024-04-01"
tags: ["wordpress", "maintenance", "services"]
published: true
---

# Premium WordPress Maintenance Services

[Converted and cleaned content]
```

### Step 4: Clean HTML
Common conversions:
| WordPress HTML | MDX/Markdown |
|----------------|--------------|
| `<h1>Text</h1>` | `# Text` |
| `<h2>Text</h2>` | `## Text` |
| `<p>Text</p>` | `Text` (just remove tags) |
| `<ul><li>Item</li></ul>` | `- Item` |
| `<ol><li>Item</li></ol>` | `1. Item` |
| `<a href="url">text</a>` | `[text](url)` |
| `<strong>text</strong>` | `**text**` |
| `<em>text</em>` | `*text*` |
| `<img src="url" alt="text">` | `![text](url)` |
| `<code>text</code>` | `` `text` `` |

### Step 5: Remove WordPress Artifacts
Remove:
- Elementor shortcodes: `[elementor-template id="..."]`
- WordPress shortcodes: `[contact-form-7 ...]`
- Inline styles: `style="..."`
- Empty divs and spans
- srcset attributes on images
- WordPress-specific classes

### Step 6: Validate
```bash
npm run build  # Will catch frontmatter errors
npm run dev    # Preview locally
```

---

## Archived Exports

Previous exports are archived at:
```
~/development/python-projects/lastapple-archive/TRANSFER-TO-LAUNCHPAD/docs/03-reference/wordpress-exports/
├── page/           # 37 page exports (JSON)
└── post/           # 14 post exports (JSON)
```

These were exported January 2026 using the DB Version Control plugin.

---

## Content Already Structured

Pre-structured content ready for use:
```
lastapple-archive/TRANSFER-TO-LAUNCHPAD/content/
├── contact-info.json       # Business contact, social links
└── services/
    ├── wordpress-care.json # Service tiers, pricing
    ├── ai-marketing.json   # AI marketing services
    └── system-integration.json
```

These JSON files can be directly referenced or converted to MDX.

---

## Troubleshooting

### SSH Connection Refused
- Check if SiteGround has your IP whitelisted
- Verify SSH key is added to SiteGround SSH Keys Manager
- Try from a different network

### WP-CLI Errors
```
Error: This does not seem to be a WordPress installation.
```
**Fix:** Ensure you're in the correct path:
```bash
cd /home/customer/www/lastapple.com/public_html
```

### Permission Denied
- SSH key may have expired
- Check SiteGround account for key status

---

## Post-Migration

Once content is migrated:
1. WordPress site remains live (for now)
2. Can redirect old URLs to new structure
3. Eventually: point lastapple.com DNS to Vercel
4. WordPress becomes archive only

---

*This document is for migration reference. Once migration complete, WordPress access becomes historical.*
