# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Vision

This is the new **lastapple.com** - a Git-first, AI-native platform for Last Apple Business Solutions.

**Core Concept: Stream-First**
The site centers on a living stream of daily work, AI experiments, and journey documentation. Services and portfolios flow FROM the stream. The Stream is the soul of the site.

**The "Red Light Test"**: Edit content from phone via Claude → commit to Git → live in <2 minutes.

## Build Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

**Stack**: Next.js 16+ (App Router, Turbopack) + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage (Stream-first)
│   ├── layout.tsx         # Root layout with Navigation
│   └── globals.css        # Tailwind + CSS variables
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── Navigation.tsx     # Mega menu navigation
│   └── StreamCard.tsx     # Stream post card
└── lib/
    ├── content.ts         # Content pipeline (gray-matter + Zod)
    └── utils.ts           # Tailwind cn() utility

content/
├── stream/                # Daily work logs (MDX) - THE CORE
├── services/              # Service pages (MDX)
├── solutions/             # Solution pages (MDX)
├── clients/               # Client work (MDX)
└── schema/                # Zod schemas for content validation
```

## Content Pipeline

Content is MDX files validated with Zod schemas at build time.

**Adding a Stream post:**
```bash
# Create content/stream/2026-01-11-my-post.mdx
---
title: "Post Title"
description: "Max 160 chars for SEO"
publishedAt: "2026-01-11"
tags: ["ai", "development"]
featured: false
published: true
---

Your content here...
```

**Available schemas:**
- `StreamPostSchema` - Blog/journal posts
- `ServiceSchema` - Service offerings
- `SolutionSchema` - AI solutions

## Key Concepts

1. **The Stream**: Homepage leads with the Stream. Daily work, experiments, discoveries.

2. **Portfolios Mega Menu**: One click reveals:
   - Services (WordPress Care, SEO, Marketing)
   - Solutions (ScraperSky, AI Chatbots, Integrations)
   - Client Work

3. **Content as Code**: MDX files in `/content/`. Git is source of truth.

## Path Aliases

`@/*` maps to `./src/*`

## Styling

- Tailwind v4 with CSS-first config
- CSS variables for theming (oklch color space)
- Use `cn()` from `@/lib/utils` to merge classes

## WordPress Migration

SSH access to current WordPress site:
```bash
ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz
# WP path: /home/customer/www/lastapple.com/public_html/
```

Content can be pulled via WP-CLI and converted to MDX.
