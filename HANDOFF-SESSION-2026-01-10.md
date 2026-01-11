# HANDOFF DOCUMENT — Session 2026-01-10
## For Claude's Future Self: Read This First

---

## THE SOUL OF THIS PROJECT: THE STREAM

**Critical concept you must internalize immediately:**

This is NOT a typical business website with services pages and a blog bolted on. The Stream IS the website. The Stream is daily work logs, experiments, journey documentation, thinking out loud. Services, solutions, and portfolio items flow FROM the stream — they are artifacts of the journey, not the main attraction.

When the user says "Stream-first architecture," they mean:
- Homepage opens with The Stream (journal entries)
- Services/Solutions are discoverable but secondary
- The authentic work journey is what builds trust and attracts clients

**Do not bury The Stream. Do not treat it as a blog. It is the heartbeat.**

---

## PROJECT IDENTITY

**Business:** Last Apple Business Solutions
- 30 years of system integration expertise
- WordPress that actually works
- AI-powered solutions
- Owner: Hank Groman (La Palma, CA)
- Contact: 714-813-9973 / hank@lastapple.com

**The Logo:** Artistic apple with circuit board lines. Colors:
- Deep crimson red (the apple)
- Teal/turquoise (circuit lines)
- Warm dark background that makes these glow

---

## TECH STACK

- **Framework:** Next.js 16.1.1 with App Router + Turbopack
- **Styling:** Tailwind CSS v4 with @theme configuration
- **Components:** shadcn/ui
- **Animations:** Framer Motion
- **Content:** MDX files parsed with gray-matter, validated with Zod schemas
- **Hosting:** Vercel (auto-deploys from GitHub main branch)
- **Repo:** github.com/hgroman/lastapple-nextjs

---

## COLOR SYSTEM (from logo)

All colors defined in `src/app/globals.css` using hex values (NOT HSL — Tailwind v4 had issues with HSL):

```css
--color-background: #141010;     /* Warm dark charcoal with burgundy undertone */
--color-foreground: #f5f0e8;     /* Warm cream text */
--color-primary: #a63d3d;        /* Deep crimson red */
--color-accent: #3d9999;         /* Teal/turquoise */
--color-card: #1c1616;           /* Slightly lighter warm dark */
--color-muted: #2a2222;          /* Muted backgrounds */
--color-border: #332a2a;         /* Subtle warm borders */
```

**Design language:**
- Glass morphism (backdrop-blur, semi-transparent backgrounds)
- Gradient text (crimson primary, teal accent)
- Cursor glow effect (dual crimson/teal following mouse)
- Scroll-triggered animations with stagger
- Floating elements, subtle movement

---

## WHAT'S BEEN BUILT

### Core Architecture
- `/src/app/` — Next.js App Router pages
- `/src/components/` — React components
- `/src/lib/content.ts` — Content pipeline (MDX + Zod)
- `/content/` — MDX content files (stream, services, solutions, case-studies)
- `/content/schema/` — Zod validation schemas

### Animated Components (ported from Lovable site)
- `CursorGlow.tsx` — Mouse-following dual glow effect
- `JournalHero.tsx` — Hero section with floating orbs, glass card, logo
- `JournalStream.tsx` — Stream entries with scroll-triggered stagger
- `SolutionsSection.tsx` — Animated solutions grid (teal accents)
- `ServicesSection.tsx` — Animated services grid (crimson accents)
- `Navigation.tsx` — Glass nav with mega menu for Portfolios

### CSS Utilities
- `.glass` — Glass morphism effect
- `.gradient-text` — Crimson gradient text
- `.gradient-text-accent` — Teal gradient text
- `.glow` / `.glow-teal` — Box shadow glow effects
- `.animate-float`, `.animate-shimmer`, `.animate-fade-in-up`

---

## WHAT STILL NEEDS WORK

### Immediate
1. **Add logo.png** — User needs to place logo at `/public/logo.png`
2. **Design polish** — User said it's "better but not great" after CSS fix
3. **Content migration** — Real content from WordPress needs to come over

### Navigation
- Mega menu for "Portfolios" showing Services/Solutions/Client Work in one panel
- Currently basic, needs the clean one-click dropdown

### Content Pipeline
- Stream entries need actual content
- Services/Solutions need real data
- Case studies from WordPress export

### WordPress Migration
- SSH access verified: `ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz`
- WP-CLI works on the server
- Export scripts exist in `/TRANSFER-TO-LAUNCHPAD/wordpress/`

---

## USER PREFERENCES

### Git Commits (Git-Curator Protocol)
Always use this format:
```
type(scope): short description

WHAT CHANGED:
- Bullet points of changes

WHY THIS MATTERS:
Explanation of significance

AFFECTED FILES:
- List of files

Session: YYYY-MM-DD — Context

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

### Communication Style
- User is direct, sometimes frustrated — match energy, don't be defensive
- Focus on execution over explanation
- The Stream concept should be "on the tip of your tongue"
- Avoid generic corporate blue — this site should feel warm and artistic

---

## FOLDER STRUCTURE

```
lastapple-nextjs/
├── src/
│   ├── app/
│   │   ├── globals.css          # Color system, animations
│   │   ├── layout.tsx           # Root layout with CursorGlow
│   │   └── page.tsx             # Homepage with Stream-first layout
│   ├── components/
│   │   ├── ui/                  # shadcn components
│   │   ├── CursorGlow.tsx
│   │   ├── JournalHero.tsx
│   │   ├── JournalStream.tsx
│   │   ├── Navigation.tsx
│   │   ├── ServicesSection.tsx
│   │   └── SolutionsSection.tsx
│   └── lib/
│       └── content.ts           # MDX loading + Zod validation
├── content/
│   ├── schema/                  # Zod schemas
│   ├── stream/                  # Journal entries (MDX)
│   ├── services/                # Service pages (MDX)
│   ├── solutions/               # Solution pages (MDX)
│   └── case-studies/            # Portfolio items (MDX)
├── public/
│   └── logo.png                 # NEEDS TO BE ADDED
├── TRANSFER-TO-LAUNCHPAD/       # Historical docs + migration content
└── CLAUDE.md                    # AI collaboration guidelines
```

---

## RECENT SESSION CONTEXT

The user was frustrated that initial Next.js setup was "Econo brand looking" — vanilla shadcn with no personality. We ported animations and design from a previous Lovable site but adapted colors to match the new logo.

CSS had issues with Tailwind v4 not interpreting HSL values correctly (showed white background). Fixed by switching to hex values in globals.css.

User is now switching Cursor workspace from ai-lab-launchpad to lastapple-nextjs to continue work.

---

## QUICK START FOR NEXT SESSION

1. Read this document first
2. Check if logo.png exists in /public/
3. Run `npm run dev` to start dev server
4. User will likely want to continue design refinement or add content
5. Remember: Stream-first. Warm colors. Movement and life.

---

*Handoff created: 2026-01-10*
*Previous context: ai-lab-launchpad/TRANSFER-TO-LAUNCHPAD*
