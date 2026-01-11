# START HERE

**Project:** Last Apple WordPress → Next.js Migration
**Owner:** Hank Groman (hank@lastapple.com)

---

## What Is This?

We're migrating lastapple.com from WordPress to Next.js. The design is done. The infrastructure is not. We need to build foundational components before migrating content.

---

## Documents (Read in Order)

| # | File | Purpose |
|---|------|---------|
| 0 | `0-START-HERE.md` | **You are here.** Entry point. |
| 1 | `1-PROGRESS.yaml` | Current status. What's done, what's next. |
| 2 | `2-BUILD-PLAN.md` | Step-by-step execution plan (9 steps) |
| 3 | `3-SITE-ARCHITECTURE.yaml` | Full technical blueprint |
| 4 | `4-SESSION-CONTEXT.md` | Background, decisions made, tools available |
| 5 | `5-CONTENT-INVENTORY.yaml` | WordPress content mapped to Next.js files |

*Use decimals (e.g., 2.5-NEW-DOC.md) to insert new docs between existing ones.*

---

## Quick Status Check

```bash
cat Active-Work/1-PROGRESS.yaml
```

This shows:
- Current step
- What's completed
- What's blocked
- Next action

---

## Tools Available

| Tool | How to Use |
|------|------------|
| **GitHub MCP** | Direct repo access via `mcp__github__*` functions |
| **WordPress CLI** | `ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz "cd /home/customer/www/lastapple.com/public_html && wp [command]"` |
| **Local Dev** | `npm run dev` |
| **Build Test** | `npm run build` |

---

## Key Decisions Made

| Decision | Choice | Date |
|----------|--------|------|
| Component strategy | Hybrid (layouts + MDX components) | 2026-01-11 |
| Email service | Resend | 2026-01-11 |
| Content structure | MDX with Zod validation | Pre-existing |

---

## If You're Lost

1. Read `1-PROGRESS.yaml` — tells you exactly where we are
2. Read the current step in `2-BUILD-PLAN.md`
3. Execute the next incomplete task
4. Update `1-PROGRESS.yaml` when done

---

## Contact

- **Hank Groman** — hank@lastapple.com / 714-813-9973
- **Project Repo** — github.com/hgroman/lastapple-nextjs

---

*This file exists so any AI or human can pick up this project cold.*
