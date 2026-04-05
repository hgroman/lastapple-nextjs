# Migration Brief — The Full Story

**Written by:** CMO (VPOS-CMO, session 9b3de5b5)
**Date:** 2026-04-03
**For:** Whatever agent boots up in this project next

---

## What Happened Today

The CEO and CMO sat down to figure out what Last Apple's web presence should look like for the ScraperSky product launch. What started as "should we finish the new site?" turned into a fundamental architecture decision about who Last Apple is and how it presents itself to the world.

### The Debate

We ran a v2 adversarial collaboration — Debate 020. All 7 AI personas (CTO, CPA, OPS, CMO, CXM, SCRAPERSKY, PROOF) weighed in. Every single one came back CONDITIONAL FOR. Converged in 2 rounds. Key findings:

1. **The old WordPress site is lying.** It says "WordPress Services" in the nav. Last Apple is an AI consultancy running a 7-persona federated AI team with a conscience brain, adversarial collaboration protocols, and a product that automates digital marketing at scale. The old site represents a company that no longer exists.

2. **The fabricated client stories are poison.** The current new site has placeholder case studies — TechFlow Solutions, Green Earth Co., Nexus Financial, Bright Academy. These are invented. All 7 personas independently flagged this as the #1 risk. An anti-hype brand with fake testimonials fails its own integrity test. Remove them. Do not replace them with different fake stories. Remove them.

3. **Don't gate ScraperSky on this.** The team unanimously said the agency site overhaul and the ScraperSky product launch are parallel workstreams. Ship the site on its own merit.

### The Reveal

After the debate, the CEO showed me scrapersky.com — which already exists as its own site. This changed everything. The debate had assumed ScraperSky needed a landing page on lastapple.com. It doesn't. It has its own home. (The messaging on scrapersky.com needs a rewrite — it says "the ultimate platform" when the brand positioning is anti-hype and disqualification-oriented — but that's a separate task.)

### The Architecture Decision

**Two surfaces, two jobs:**

- **lastapple.com** is the workshop. The CEO's exact words: "a behind-the-scenes reality show that blows your mind because you can't freaking believe how much stuff we're building and shipping and refining and leveraging every day." The entire site is a blog on steroids. The Stream IS the site. Services and gallery exist for credibility, but the Stream is the heartbeat. This is where $10-30K consulting prospects come to see that this team lives in the work.

- **scrapersky.com** is the showroom. Polished product. Features, demos, pricing, release notes. When someone asks "what does ScraperSky do?" — that's where they go.

They are decoupled. Neither gates the other.

### Three Revenue Lanes

This is the business model that crystallized today:

1. **ScraperSky SaaS** (scrapersky.com) — subscription product for self-serve marketing teams
2. **SkyRadar / Agency OS** — the command center, onboarded to select early adopters (Thriving Numbers and others). Persona isolation, $25/mo tripwire to managed services.
3. **Platform consulting** (lastapple.com) — $10-30K engagements where Last Apple drops in the full platform to help enterprises harness data into processes. The workshop-window site IS the sales surface for this lane. Every day The Stream publishes, the credibility compounds.

---

## What You Need To Do

You have 24 hours to complete this migration. The engineering is done — P0/P1 shipped. This is a content sprint.

### The Mandate

Ship the new lastapple.com. Remove the fabricated bullshit. Build a real client gallery. Seed The Stream with blog posts. Get the DNS cutover done. The old WordPress site becomes old.lastapple.com with a noindex tag.

### Critical Rules

1. **Content is king.** The new site's dark theme, the code snippets, the floating nav, the breathing logo — this design language is more professional, more compelling, and more honest than the old brochure. Trust it. Focus on getting real content into this container, not on artwork or decoration. If the WordPress images are good enough, keep them. If not, skip them. The look and feel of the new site carries itself.

2. **Preserve the formatting.** When you rip out the fabricated case studies from ClientsPortfolio.tsx, save that component's structure and styling. We'll use that beautiful layout again when we have real case studies with client consent. Don't throw away the design — throw away the lies inside it.

3. **No named client metrics without consent.** The gallery shows real client sites (public URLs — anyone can see these). But do NOT publish performance claims like "340% lead conversions" attributed to specific clients. CXM owns consent conversations. Those start next week. For now: real sites, real screenshots, no invented numbers.

4. **The Stream is the priority.** 14 WordPress blog posts are waiting in the audit. These become the first Stream entries. They prove the site is alive, not a ghost town. Some of them are genuinely great content ("From Chaos to Symphony," "Cursor, Claude, and Chaos" — these are workshop-window content already).

### What Comes After This Sprint

This migration gets the site live and honest. But the BEST content hasn't been written yet. CMO is taking a task to:

- Ruminate over what the biggest, truest, coolest content is that should live on this site
- Run adversarial collaborations on content strategy
- Perform Google Keyword Planner research on trends and opportunities
- Analyze what's currently working on the old site (GSC data — if we have momentum anywhere, improve it, don't abandon it)
- Continuously harvest intelligence from the CMO intelligence garden (22 rows of competitive signals, pain language, positioning wedges) to feed into Stream content
- Think about what makes someone look through the workshop window and say "I need to hire these people"

The site launches this weekend. The content strategy compounds for months after.

---

## You Are Part of a Team

This project is one node in a 7-persona federated AI team. You don't have MCP access to Supabase yet (that's coming), but you DO have:

- **Conscience brain** (user-scoped MCP) — search it for context on any topic. It has memories from all projects.
- **The migration skill** at `.claude/skills/lastapple-migration/SKILL.md` — your execution playbook.
- **Content decisions YAML** at `.claude/skills/lastapple-migration/references/content-decisions.yaml` — per-item inventory.

When Supabase gets onboarded, you'll be able to:
- Query `radar_decisions` for team decisions
- Read `radar_journal` for handoffs from other personas
- Create `radar_tasks` to delegate work to OPS, CTO, CXM, or others

For now, if you hit a blocking point, document it clearly in `Active-Work/` and the operator will route it to the right persona.

---

## The Spirit of This Work

The CEO said something today that captures it: "Instead of showing you the finished products on the showroom floor, we are inviting you to look through the window into our workshop."

That's what this site is. Not a brochure. Not a sales pitch. A window into a team that builds things every single day — and is confident enough to let you watch.

Build it like that matters. Because it does.
