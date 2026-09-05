#!/usr/bin/env node
/**
 * verify-internal-links.mjs — prove every internal link resolves to something real.
 *
 * Why this exists: on 2026-08-17 Google Search Console reported "Not found (404)"
 * for https://lastapple.com/meeting-demo. The URL never existed on the Next.js
 * site — the link was inherited verbatim from the WordPress original when
 * ai-meeting-analysis was migrated to MDX. The migration audit had already caught
 * it and written the fix down (docs/wordpress-audit/INTERNAL-LINKS.yaml:59), and
 * the fix was never applied.
 *
 * Auditing the rest of the surface the same way found two MORE dead links that
 * Google had not complained about yet, and that were worse in practice because
 * they render on every page rather than in one post:
 *   /clients             — mobile nav "Client Work"  (the page is /portfolio)
 *   /services/ai-chatbot — footer "AI Chatbots"      (it lives under /solutions/)
 *
 * A green build is not evidence that the links in it go anywhere. This is.
 *
 * Usage:
 *   node scripts/verify-internal-links.mjs
 *   npm run verify:links
 *
 * Runs offline — pure static analysis of the repo, no network, no deploy needed.
 * Exits 0 when every internal link resolves to a real route (directly or through
 * a next.config.ts redirect whose destination is itself real). Exits 1 with the
 * file:line of each dead link otherwise.
 *
 * ── Two traps this script was burned by; do not "simplify" them back ──────────
 *
 * TRAP 1 — the empty-prefix match. Deriving a rule's literal prefix with
 * `source.split('/:')[0]` yields "" for a source that STARTS with a param, such
 * as '/:year(\\d{4})/:month(\\d{2})/:path*'. Every path then appears to match
 * that rule, so every dead link looks handled and the checker reports a clean
 * tree while the site 404s. Sources are compiled to real anchored regexes below.
 *
 * TRAP 2 — the double-escaped class. next.config.ts is read as TEXT, so the
 * source written in TS as '/:year(\\d{4})/...' arrives here as the eight
 * characters \ \ d { 4 }. Handed straight to RegExp that means "a literal
 * backslash, then d{4}" and matches nothing — the date-archive rules silently
 * cover no dates at all. unescapeTsString() collapses \\ to \ before compiling.
 *
 * Both traps fail in the same direction: the detector says CLEAN when it is not.
 * The self-test at the bottom asserts against known-good AND known-bad inputs so
 * a regression in either trap fails the build instead of going quiet.
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, extname, basename } from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const APP_DIR = join(ROOT, 'src/app');
const CONTENT_DIR = join(ROOT, 'content');
const CONFIG = join(ROOT, 'next.config.ts');
const ARTIFACT_REGISTRY = join(ROOT, 'src/lib/skies-artifacts.ts');

// Content collections whose MDX filenames become /<collection>/<slug> routes.
const COLLECTIONS = ['services', 'solutions', 'stream', 'skies'];

// Extensions worth scanning for hrefs.
const SCAN_EXT = new Set(['.mdx', '.md', '.tsx', '.ts', '.json']);

// Never treated as page links.
const ASSET_EXT = /\.(png|jpe?g|svg|webp|avif|gif|ico|woff2?|ttf|eot|css|js|map|xml|txt|pdf|mp4|mp3|zip)$/i;

/** Recursively list files under dir, skipping build and dependency trees. */
function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === '.next' || e.name === '.git') continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// ── The valid route set, read off disk ──────────────────────────────────────

function realRoutes() {
  const routes = new Set(['/']);
  for (const f of walk(APP_DIR)) {
    if (basename(f) !== 'page.tsx' && basename(f) !== 'page.ts') continue;
    const route = '/' + relative(APP_DIR, f).replace(/\/?page\.tsx?$/, '');
    // Dynamic segments ([slug], [...all]) are covered by the content slugs below.
    if (route.includes('[')) continue;
    routes.add(route === '/' ? '/' : route.replace(/\/$/, '') || '/');
  }
  for (const c of COLLECTIONS) {
    let files = [];
    try {
      files = readdirSync(join(CONTENT_DIR, c));
    } catch {
      continue;
    }
    for (const f of files) {
      if (extname(f) !== '.mdx') continue;
      routes.add(`/${c}/${basename(f, '.mdx')}`);
    }
  }
  // Framework-generated endpoints that are real but have no page.tsx.
  routes.add('/robots.txt');
  routes.add('/sitemap.xml');
  for (const p of skiesArtifactPaths()) routes.add(p);
  return routes;
}

/**
 * Paths served by a REWRITE rather than by a page.tsx or an MDX file.
 *
 * The Live-Scored Skies trip maps and 360 panoramas are separate static Vercel
 * deploys proxied to /skies/map/<slug> and /skies/pano/<slug>. They are real
 * URLs that return 200, but nothing on disk under src/app or content/ proves
 * it, so without this they look dead to the checker and a correct link would
 * fail the commit.
 *
 * Read out of SKIES_ARTIFACTS in src/lib/skies-artifacts.ts, which is the single
 * place a map is registered — next.config.ts builds its rewrites from the same
 * table, so a path cannot be served without appearing here. Returning an empty
 * list when the table cannot be found is the safe direction: links then appear
 * DEAD rather than silently valid, which is the failure direction this whole
 * script is built around.
 *
 * ONLY entries with noindexVerified: true are returned. The artifacts are thin,
 * JS-rendered pages — 71 indexable words against 94KB of script for the trip
 * map — and linking one that has not yet been confirmed to carry
 * <meta name="robots" content="noindex"> would feed that to Google under a
 * 20-year domain. An unverified artifact therefore reads as a DEAD LINK here
 * and fails the commit, which is the point: the rule stops depending on whoever
 * happens to remember it.
 */
function skiesArtifactPaths() {
  let text;
  try {
    text = readFileSync(ARTIFACT_REGISTRY, 'utf8');
  } catch {
    return [];
  }
  const table = text.match(/const SKIES_ARTIFACTS[^=]*=\s*\[([\s\S]*?)\n\];/);
  if (!table) return [];
  const paths = [];
  // Match per ENTRY, not per field — pairing a path with the flag from a
  // different entry is exactly the kind of off-by-one that reports CLEAN.
  for (const entry of table[1].matchAll(/\{[^}]*\}/g)) {
    const path = entry[0].match(/path:\s*'([^']+)'/);
    const verified = /noindexVerified:\s*true/.test(entry[0]);
    if (path && verified) paths.push(path[1]);
  }
  return paths;
}

// ── The redirect table, parsed out of next.config.ts ────────────────────────

/** next.config.ts is read as text; collapse TS string escapes. See TRAP 2. */
function unescapeTsString(s) {
  return s.replace(/\\\\/g, '\\');
}

/**
 * Compile a Next.js redirect `source` into an anchored RegExp. See TRAP 1.
 * Handles: a trailing `/:name*` (zero or more segments), `:name(regex)`
 * (constrained param), and bare `:name` (exactly one segment).
 */
function compileSource(rawSource) {
  let source = unescapeTsString(rawSource);
  let tail = '';

  // A trailing /:name* matches zero-or-more further segments, so `/blog/:path*`
  // must match `/blog` itself as well as `/blog/anything/deep`.
  const star = source.match(/\/:([A-Za-z_]\w*)\*$/);
  if (star) {
    source = source.slice(0, star.index);
    tail = '(?:/.*)?';
  }

  let out = '';
  let i = 0;
  while (i < source.length) {
    if (source[i] === ':') {
      // :name  or  :name(regex-with-possibly-nested-parens)
      const m = /^:([A-Za-z_]\w*)(\(((?:[^()\\]|\\.|\([^()]*\))*)\))?/.exec(source.slice(i));
      if (m) {
        out += m[2] ? `(?:${m[3]})` : '[^/]+';
        i += m[0].length;
        continue;
      }
    }
    out += source[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    i += 1;
  }
  return new RegExp(`^${out}${tail}$`);
}

function redirectTable() {
  const text = readFileSync(CONFIG, 'utf8');
  const rules = [];
  const re = /source:\s*'([^']+)'\s*,\s*destination:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    rules.push({ source: m[1], destination: m[2], test: compileSource(m[1]) });
  }
  return rules;
}

/** First matching redirect for a path, or null. */
function matchRedirect(rules, path) {
  for (const r of rules) if (r.test.test(path)) return r;
  return null;
}

// ── Link extraction ─────────────────────────────────────────────────────────

// Markdown links, JSX href=, next/link href={}, and OBJECT PROPERTIES that hold a route.
//
// TRAP 3 — the property that isn't called href. On 2026-09-04 three links on the HOMEPAGE
// were live 404s (/services/wordpress-care, /services/ai-marketing, /services/system-integration)
// and this checker reported a clean tree. They live in src/components/SolutionsGrid.tsx as
// `link: '/services/...'` — an object key named `link`, not an `href=` attribute and not a
// quoted "url" field, so the old pattern could not see them. The guard existed, had self-tests,
// and did not cover the case. Route-bearing keys are now matched quoted OR unquoted.
// If you add a new component that stores a route under some other key name, add it here.
const LINK_RE =
  /(?:\]\(\s*<?|href\s*=\s*["'{`]\s*|href\s*=\s*\{?\s*["'`]|["']?(?:url|link|href|to|path)["']?\s*:\s*["'`])((?:https?:\/\/(?:www\.)?lastapple\.com)?\/[^)"'`\s>{}\]]*)/g;

function normalize(raw) {
  let u = raw.replace(/[>.,;]+$/, '');
  u = u.replace(/^https?:\/\/(?:www\.)?lastapple\.com/, '') || '/';
  if (!u.startsWith('/')) return null;
  let path = u.split('#')[0].split('?')[0];
  if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
  return path || '/';
}

function collectLinks() {
  const found = new Map(); // path -> [{file, line, raw}]
  const skipped = [];
  const targets = [...walk(CONTENT_DIR), ...walk(join(ROOT, 'src'))];
  for (const f of targets) {
    if (!SCAN_EXT.has(extname(f))) continue;
    const rel = relative(ROOT, f);
    const lines = readFileSync(f, 'utf8').split('\n');
    lines.forEach((line, idx) => {
      for (const m of line.matchAll(LINK_RE)) {
        const raw = m[1];
        // Dynamic hrefs (`/stream/${slug}`) cannot be checked statically. Record
        // them so a skip is never mistaken for coverage.
        if (raw.includes('$') || raw.includes('{')) {
          skipped.push({ file: rel, line: idx + 1, raw, why: 'dynamic' });
          continue;
        }
        if (raw.startsWith('/_next') || raw.startsWith('/api')) continue;
        const path = normalize(raw);
        if (!path) continue;
        if (ASSET_EXT.test(path)) continue;
        if (!found.has(path)) found.set(path, []);
        found.get(path).push({ file: rel, line: idx + 1, raw });
      }
    });
  }
  return { found, skipped };
}

// ── Self-test: assert the ruler before trusting the measurement ─────────────

function selfTest(rules) {
  const failures = [];
  const expectMatch = (p) => {
    if (!matchRedirect(rules, p)) failures.push(`expected a redirect to match ${p}, none did`);
  };
  const expectNoMatch = (p) => {
    const hit = matchRedirect(rules, p);
    if (hit) failures.push(`expected NO redirect for ${p}, but '${hit.source}' matched`);
  };
  // TRAP 2 regression guard: the date-archive rules must actually match dates.
  expectMatch('/2024');
  expectMatch('/2024/05');
  expectMatch('/2024/05/01/some-post');
  // TRAP 1 regression guard: a param-leading rule must NOT swallow arbitrary paths.
  expectNoMatch('/not-a-year');
  expectNoMatch('/some/deep/path-that-should-404');
  // Zero-or-more semantics: a /:path* rule covers its own bare prefix.
  expectMatch('/blog');
  expectMatch('/blog/anything/deep');
  return failures;
}

// ── Is the pre-commit guard actually connected? ──────────────────────────────

/**
 * This check lives here, in the script that ALWAYS runs, because it cannot live
 * in the hook it is checking on: if the hooks are disconnected, the hook never
 * fires to report it. On 2026-08-17 this repo was found with .githooks/ tracked
 * since May but core.hooksPath never set, so the credential guard and MCP guard
 * had never run on a single commit. Nothing announced it. Now the build does.
 * Warning only — never fails, and stays quiet in CI where hooks are irrelevant.
 */
function warnIfHooksDisconnected() {
  if (process.env.CI || process.env.VERCEL) return;
  let hooksPath = '';
  try {
    hooksPath = execSync('git config core.hooksPath', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    // git config exits non-zero when the key is unset — that IS the finding.
  }
  if (!hooksPath) {
    console.warn(
      '\n  WARNING: git hooks are NOT installed in this clone.\n' +
        '  The credential guard, the MCP guard and this link check are not running\n' +
        '  on commit. Fix with:  sh scripts/install_hooks.sh\n'
    );
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

warnIfHooksDisconnected();

const routes = realRoutes();
const rules = redirectTable();

const ruleFailures = selfTest(rules);
if (ruleFailures.length) {
  console.error('verify-internal-links: SELF-TEST FAILED — the redirect matcher is wrong,');
  console.error('so a clean result would be meaningless. Fix the matcher, not the assertions.\n');
  for (const f of ruleFailures) console.error(`  - ${f}`);
  process.exit(1);
}

const { found, skipped } = collectLinks();

const broken = [];
const viaRedirect = [];
const deadDestination = [];

for (const [path, sites] of found) {
  if (routes.has(path)) continue;
  const hit = matchRedirect(rules, path);
  if (!hit) {
    broken.push({ path, sites });
    continue;
  }
  // A redirect is only a fix if its destination is real.
  const destPath = hit.destination.split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
  if (!routes.has(destPath) && !matchRedirect(rules, destPath)) {
    deadDestination.push({ path, sites, rule: hit, destPath });
  } else {
    viaRedirect.push({ path, rule: hit });
  }
}

const total = found.size;
const direct = total - broken.length - viaRedirect.length - deadDestination.length;
console.log(
  `verify-internal-links: ${total} link targets — ${direct} direct, ` +
    `${viaRedirect.length} via redirect, ${broken.length} broken, ` +
    `${deadDestination.length} redirect-to-nowhere, ${skipped.length} skipped (dynamic)`
);

if (skipped.length) {
  // Never let a skip read as coverage.
  const uniq = [...new Set(skipped.map((s) => s.raw))];
  console.log(`  skipped (cannot be checked statically): ${uniq.join(', ')}`);
}

if (broken.length || deadDestination.length) {
  console.error('\nDEAD INTERNAL LINKS — these resolve to a 404 in production:\n');
  for (const { path, sites } of broken) {
    console.error(`  ${path}  (no route, no redirect)`);
    for (const s of sites) console.error(`      ${s.file}:${s.line}`);
  }
  for (const { path, sites, rule, destPath } of deadDestination) {
    console.error(`  ${path}  redirects to ${destPath}, which is not a real route`);
    console.error(`      rule: source '${rule.source}' -> '${rule.destination}'`);
    for (const s of sites) console.error(`      ${s.file}:${s.line}`);
  }
  console.error('\nFix the href, or add a redirect in next.config.ts whose destination exists.');
  process.exit(1);
}

console.log('All internal links resolve. ✓');
process.exit(0);
