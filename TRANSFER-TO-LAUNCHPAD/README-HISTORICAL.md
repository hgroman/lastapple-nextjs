# Transfer Package for ai-lab-launchpad

Copy this entire folder to your ai-lab-launchpad repo.

## What's Included

```
TRANSFER-TO-LAUNCHPAD/
├── README.md              ← You're reading this
├── docs/                  ← All planning documentation
│   ├── 02-planning/
│   │   ├── MASTER-SPECIFICATION.md   ← Architecture reference
│   │   └── PEER-REVIEW-REQUEST.md    ← External review doc
│   └── 03-reference/
│       └── ai-research/   ← Research from ChatGPT, Gemini, Grok, Perplexity
├── wordpress/             ← Scripts to pull from WordPress
│   ├── README.md          ← WP-CLI commands reference
│   └── export-wordpress.sh ← One-shot export script
├── content/               ← Existing content (JSON format)
│   ├── services/
│   ├── pages/
│   └── stream/
└── .claude/               ← AI edit mode contexts
```

## How to Use

### Step 1: Copy to ai-lab-launchpad

```bash
cp -r TRANSFER-TO-LAUNCHPAD/* /path/to/ai-lab-launchpad/
```

Or drag-and-drop in Finder.

### Step 2: Deploy the Site (30 minutes)

In ai-lab-launchpad:
```bash
npm install
npm run dev      # verify it works locally
vercel           # connect to Vercel (first time)
vercel --prod    # deploy
```

Site is now live with static content.

### Step 3: Pull WordPress Content (when needed)

Edit `wordpress/export-wordpress.sh`:
- Set your SSH credentials
- Set your WordPress path

Then run:
```bash
chmod +x wordpress/export-wordpress.sh
./wordpress/export-wordpress.sh
```

This creates `wp-export/` with all your WordPress content as JSON.

### Step 4: Convert to Markdown

Give Claude the exported JSON files and say:
```
Convert these WordPress pages to markdown files with this frontmatter:
---
title: "Page Title"
description: "Meta description"
slug: "page-slug"
---

Put them in content/pages/
```

### Step 5: Update Components to Read Content

Tell Claude:
```
Update the SolutionsGrid component to read services from content/services/*.md instead of hardcoded data
```

## Quick Commands for Claude

Once you're in the ai-lab-launchpad project, tell Claude:

**Deploy:**
```
Deploy this Vite app to Vercel
```

**Pull WordPress page:**
```
SSH into lastapple.com and export the About page to markdown
```

**Add content:**
```
Create a new stream post about today's CRM integration work
```

**Update pricing:**
```
Change the Growth tier price from $299 to $349
```

**Get contact info:**
```
SSH into WordPress and get the phone number and social media links, add them to the Footer component
```

## WordPress SSH Setup

Before you can pull from WordPress, you need:
1. SSH access to your server
2. WP-CLI installed on the server

Test with:
```bash
ssh user@lastapple.com "wp --info"
```

See `wordpress/README.md` for full WP-CLI command reference.

## Reference Docs

- **MASTER-SPECIFICATION.md**: Full architecture (use as reference, don't over-engineer)
- **ai-research/**: Research from multiple AI systems that informed the spec
- **PEER-REVIEW-REQUEST.md**: External review feedback

## The Goal

2-hour build:
1. Deploy Lovable template as-is → 30 min
2. Add markdown content reading → 1 hour
3. Pull key WordPress content → 30 min

Then iterate. Add pages as needed. Edit via Claude + Git.
