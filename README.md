# lastapple.com

The Last Apple website — Next.js App Router, content as code, no CMS. Deployed on Vercel
from `main`; pushing to `main` publishes.

Content lives in `content/` as MDX (`services/`, `solutions/`, `stream/`). Routes live in
`src/app/`. Redirects for the old WordPress URLs live in `next.config.ts`.

## Setup

```bash
npm install
sh scripts/install_hooks.sh   # REQUIRED — see "Guard rails" below
npm run dev                   # http://localhost:3000
```

**Do not skip `install_hooks.sh`.** It is one line (`git config core.hooksPath .githooks`)
and it is what makes the commit-time guards run at all. It is per-clone local config, so it
is not carried by `git clone` — every fresh checkout needs it again. This repo ran from May
to August 2026 with the hooks present but never activated, which meant the credential guard
never ran on a single commit.

## Guard rails

Two automated checks. Neither needs to be remembered or invoked — they fire on the actions
you already take.

| Check | Fires on | On failure |
|-------|----------|-----------|
| **Credential guard** | `git commit` | Blocks the commit if `.pem`, `.key`, `.env`, `*.pickle`, `oauth*.json`, `service-account*.json` or `.credentials/` are staged |
| **Internal link check** | `git commit` **and** `npm run build` | Blocks both if any link points at a page that does not exist |

### Internal link check

```bash
npm run verify:links     # run it manually any time
```

It resolves every internal link in `content/` and `src/` against the real route set
(`src/app/**/page.tsx` plus the MDX slugs) and the redirect table in `next.config.ts`, then
reports the `file:line` of anything that would 404. It runs offline — no network, no deploy.

**To fix a failure**, do one of two things:
1. correct the `href`, or
2. add a redirect in `next.config.ts` whose `destination` is a real route.

Never use `git commit --no-verify`. The check exists because a dead link is invisible until
Google emails about it months later — which is exactly what happened on 2026-08-17, when
`/meeting-demo` was found live inside an indexed Stream post, and two more dead links were
found in the global nav and footer, on every page of the site.

It deliberately checks the **whole tree**, not just staged files, so a broken link anywhere
blocks the commit until it is fixed.

It also **cannot** check dynamic links (`` href={`/stream/${slug}`} ``) and prints how many
it skipped, so a pass is never mistaken for total coverage.

### If the hooks are off

`npm run build` prints a warning when `core.hooksPath` is unset. That warning lives in the
build rather than in a hook on purpose: if the hooks are disconnected, no hook can fire to
tell you the hooks are disconnected. The layer that still runs reports on the one that does not.

## Verifying analytics

```bash
npm run verify:analytics    # proves GA4 + Clarity actually FIRE (needs playwright)
```

A green build is not evidence that client-side code runs. From 2026-01 to 2026-08-02 the
site collected zero GA4 data while every build passed. This is what catches that.

## Deploy

Push to `main`. Vercel builds and publishes.

`npm run build` runs the link check first (`prebuild`), so a broken link fails the deploy
rather than shipping. **Never push without a clean local build** — and do not call something
live until the deployment is verified.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
