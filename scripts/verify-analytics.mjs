#!/usr/bin/env node
/**
 * verify-analytics.mjs — prove the analytics tags actually FIRE.
 *
 * Why this exists: from 2026-01 to 2026-08-02, lastapple.com collected zero GA4
 * data. The Vercel env vars carried a trailing newline, which landed inside a
 * single-quoted JS string literal in the inline tag and killed it with
 * "SyntaxError: Invalid or unexpected token". The build stayed green the entire
 * time — the failure was client-side, at runtime, and nothing looked.
 *
 * A green build is not evidence that client-side code runs. This is.
 *
 * Usage:
 *   node scripts/verify-analytics.mjs [url]
 *   npm run verify:analytics
 *
 * Exits 0 only if the GA collect beacon fired, Clarity loaded, and the page threw
 * no uncaught exceptions. Exits 1 with the captured errors otherwise.
 */

import { chromium } from 'playwright';

const URL = process.argv[2] || 'https://lastapple.com/';
const TIMEOUT_MS = 30_000;

// GA4 sends its pageview to /g/collect (region-sharded hosts all match).
const GA_COLLECT = /google-analytics\.com\/g\/collect|analytics\.google\.com\/g\/collect/;
const CLARITY = /clarity\.ms/;

const requests = [];
const pageErrors = [];
const consoleErrors = [];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

page.on('request', (r) => requests.push(r.url()));
page.on('pageerror', (e) => pageErrors.push(String(e)));
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text());
});

let navOk = true;
try {
  await page.goto(URL, { waitUntil: 'networkidle', timeout: TIMEOUT_MS });
  // Beacons are queued after hydration; give the tag a moment to actually send.
  await page.waitForTimeout(3000);
} catch (err) {
  navOk = false;
  pageErrors.push(`navigation failed: ${err.message}`);
}

await browser.close();

const gaLoaded = requests.some((u) => u.includes('googletagmanager.com/gtag/js'));
const gaFired = requests.some((u) => GA_COLLECT.test(u));
const clarityFired = requests.some((u) => CLARITY.test(u));

const checks = [
  ['page loaded', navOk],
  ['gtag.js loaded', gaLoaded],
  ['GA4 /g/collect beacon fired', gaFired],
  ['Microsoft Clarity loaded', clarityFired],
  ['no uncaught page exceptions', pageErrors.length === 0],
];

console.log(`\nverify-analytics — ${URL}\n`);
for (const [label, ok] of checks) {
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${label}`);
}

const failed = checks.filter(([, ok]) => !ok);

if (failed.length) {
  if (pageErrors.length) {
    console.log('\n  page exceptions:');
    for (const e of pageErrors.slice(0, 5)) console.log(`    ${e}`);
  }
  if (consoleErrors.length) {
    console.log('\n  console errors:');
    for (const e of consoleErrors.slice(0, 5)) console.log(`    ${e}`);
  }
  // gtag.js loading but no beacon is the exact signature of the 2026-01 bug:
  // the library arrives, the inline config script dies, nothing is ever sent.
  if (gaLoaded && !gaFired) {
    console.log(
      '\n  NOTE: gtag.js loaded but no beacon fired — the inline config script is' +
        '\n  broken (check for whitespace/newlines in NEXT_PUBLIC_GA_MEASUREMENT_ID).'
    );
  }
  console.log(`\n  ${failed.length} check(s) failed\n`);
  process.exit(1);
}

console.log('\n  all checks passed — analytics is collecting\n');
process.exit(0);
