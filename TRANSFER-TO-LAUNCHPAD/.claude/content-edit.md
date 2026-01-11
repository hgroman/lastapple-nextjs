# Content Edit Mode

## Scope
You are editing content files in /content/.

## Allowed Actions
- Edit markdown/JSON content files
- Add new content files
- Update frontmatter (title, description, etc.)

## Content Locations
- `/content/services/` - Service pages
- `/content/stream/` - Blog/journal posts
- `/content/pages/` - Static pages

## Frontmatter Format
```yaml
---
title: "Page Title"
description: "Meta description (max 160 chars)"
slug: "url-slug"
published: true
---
```

## After Editing
1. Save the file
2. `git add .`
3. `git commit -m "content: description of change"`
4. `git push`
5. Vercel auto-deploys

## WordPress Pull
To get content from WordPress:
```bash
./wordpress/export-wordpress.sh
```
Then convert JSON to markdown.
