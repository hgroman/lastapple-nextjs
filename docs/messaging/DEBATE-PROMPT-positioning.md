# v2 Debate Prompt — Positioning Spec for Four Surfaces

**Initiative:** Messaging Intentionality (`2bbbd00e-b825-4732-a52f-8e572cccd5fa`)
**Phase:** 2 — Positioning Principles
**Mechanism:** `/adversarial-collaboration-v2`
**Personas:** All 7 (CEO, CMO, CTO, CXM, OPS, SCRAPERSKY, PROOF)
**Convergence:** required (not fixed rounds)
**Output target:** `docs/messaging/POSITIONING-SPEC.yaml`

## Prerequisites

Before launching this debate, the following must be loaded by every persona:
- `docs/messaging/INVENTORY-lastapple.yaml` (must be complete)
- `docs/messaging/INVENTORY-scrapersky.yaml` (must be complete)
- `docs/messaging/INVENTORY-skyradar.yaml` (must be complete)
- `docs/messaging/INVENTORY-hankgroman.yaml` (must be complete)
- `.claude/skills/lastapple-migration/SKILL.md` — section "THE BRAND VOICE" and "THE THREE REVENUE LANES"
- `radar_decisions` rows: `d5c2cf82`, `79633af4`, `9291fcf6` (surface decoupling, revenue lanes, brand voice)

## The Question

> For each of our four surfaces — **lastapple.com**, **scrapersky.com**, **skyradar**, **hankgroman.com** — define the positioning spec.
>
> A positioning spec is exactly five lines:
>
> 1. **Buyer.** Who is this surface for? Be specific. Job title, company size, what they're trying to do today.
> 2. **Feeling.** What is the one thing they should feel after 30 seconds on the page? One word or phrase.
> 3. **Action.** What is the one thing they should do? Specific CTA, not a category.
> 4. **Voice.** What does this surface sound like? Reference the existing brand voice principle ("workshop with sawdust on the floor") but specify how each surface inflects it.
> 5. **Disqualification.** Who is this surface NOT for? Who should bounce, and we're glad they did?
>
> Output format: machine-parseable YAML, one block per surface, exactly these five fields.

## The Constraints

- **No hype.** No "revolutionary," no "game-changing," no "ultimate."
- **No defensive copy.** Nothing that protests too much. No "real" as a modifier.
- **No surface gates another.** lastapple.com does not exist to sell ScraperSky. ScraperSky does not exist to credentialize lastapple.com. Each surface stands alone.
- **Disqualification is mandatory.** A surface that tries to serve everyone serves no one. Each spec must name who should leave.
- **PROOF veto.** Any positioning claim that cannot be substantiated by evidence in the inventory or in the brain triggers a PROOF veto and must be revised or removed.

## The Stakes

These four positioning specs become the constitutional document. Every heading, subtitle, meta description, CTA, and body paragraph in Phase 3 will be scored against them. If a string doesn't serve the spec, it dies or gets rewritten.

This is not a brainstorm. This is a constitutional convention.

## Convergence Criteria

The debate converges when:
1. All 7 personas can articulate each of the 4 specs without contradiction
2. CMO and CEO both ratify each spec
3. PROOF confirms every claim is substantiable
4. SCRAPERSKY confirms scrapersky.com spec does not conflict with the showroom mandate
5. CXM confirms lastapple.com spec aligns with $10-30K consulting buyer
6. CTO confirms each spec is achievable in current site architecture

## Anti-Patterns to Reject

- "We help businesses do X" — vague, buyerless
- "Trusted by leading companies" — defensive
- "Real expertise" — protests too much
- "Comprehensive solutions" — meaningless
- "Innovative" — hype filler
- Any sentence that could appear on any of our competitors' sites without modification

## Output Schema

```yaml
positioning_spec:
  generated_at: "YYYY-MM-DD"
  generated_by: "v2-debate-{id}"

  surfaces:
    lastapple_com:
      buyer: "..."
      feeling: "..."
      action: "..."
      voice: "..."
      disqualification: "..."

    scrapersky_com:
      buyer: "..."
      feeling: "..."
      action: "..."
      voice: "..."
      disqualification: "..."

    skyradar:
      buyer: "..."
      feeling: "..."
      action: "..."
      voice: "..."
      disqualification: "..."

    hankgroman_com:
      buyer: "..."
      feeling: "..."
      action: "..."
      voice: "..."
      disqualification: "..."
```
