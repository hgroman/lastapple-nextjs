# Messaging Intentionality Initiative

**Initiative ID:** `2bbbd00e-b825-4732-a52f-8e572cccd5fa`
**Opened:** 2026-04-06
**Owner:** CMO
**Origin:** Defensive "Real Clients" copy on lastapple.com /portfolio page — a symptom of unsupervised messaging drift.

> "None of the messaging should be left to chance." — CEO, 2026-04-06

## The Four Surfaces

| Surface | Role | Owner Persona |
|---------|------|---------------|
| lastapple.com | Workshop — daily AI work, $10-30K consulting | CXM_LASTAPPLE |
| scrapersky.com | Showroom — product page for self-serve marketing teams | SCRAPERSKY |
| skyradar | Agency OS — onboarded command center | OPS |
| hankgroman.com | Founder personal brand | CEO |

## The Four Phases

### Phase 1 — Inventory (mechanical, no opinions)
Crawl every surface, extract every user-facing string. Tag by surface, page, location, type, and current purpose.

**Output:** `INVENTORY-{surface}.yaml` per surface.

### Phase 2 — Positioning Debate (`/adversarial-collaboration-v2`)
Define for each surface: buyer, intended feeling, intended action, voice. 7-persona debate. Convergence detection. Output is the constitutional document.

**Output:** `POSITIONING-SPEC.yaml`

### Phase 3 — Score & Rewrite
Score every inventory string against the positioning spec. Red/yellow/green. Propose rewrites for everything red.

**Output:** `REWRITE-PROPOSALS.yaml`

### Phase 4 — Deploy & Verify
Apply approved copy. Build, preview, ship. Verify in production.

## Files in This Directory

| File | Phase | Status |
|------|-------|--------|
| `README.md` | meta | this file |
| `INVENTORY-lastapple.yaml` | 1 | in_progress |
| `INVENTORY-scrapersky.yaml` | 1 | not_started |
| `INVENTORY-skyradar.yaml` | 1 | not_started |
| `INVENTORY-hankgroman.yaml` | 1 | not_started |
| `DEBATE-PROMPT-positioning.md` | 2 | drafted |
| `POSITIONING-SPEC.yaml` | 2 | not_started |
| `REWRITE-PROPOSALS.yaml` | 3 | not_started |

## The Rule

Every string is intentional. If you can't justify why a word is on the page, it doesn't belong there. Defensive copy is poison. Hype is poison. Vague is poison. Specific, honest, brief — that's the standard.
