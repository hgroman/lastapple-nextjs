# Stream Import Log — 2026-06-27

WordPress → MDX import of the 14 legacy lastapple.com blog posts into
`/workspace/content/stream/` for the migration sprint (phase_3.3.1).

Source: `https://lastapple.com/wp-json/wp/v2/posts/{id}` (REST API, no auth).
Conversion script: `/workspace/.tmp/convert.py` (Python + BeautifulSoup + html2text).
Schema: `/workspace/content/schema/stream.ts` — `StreamPostSchema` (Zod).

---

## Result Summary

| Posts imported | 14 / 14 |
| --- | --- |
| Posts failed | 0 |
| Build status | PASS (`npm run build`, Next.js 16.1.1, Turbopack) |
| Static pages generated for `/stream/[slug]` | 15 (14 imports + 1 pre-existing FORGE entry) |
| Description field max length (Zod cap: 160) | 159 (all rows comply) |
| Missing local images (need backfill) | 1 |

---

## Per-Post Results

All 14 posts validated against `StreamPostSchema` and rendered as static HTML
at `/stream/{slug}` during the production build.

| WP ID | Slug | Date | Category | Featured | Desc len | Body len | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 11206 | coffee-shop-seo | 2025-06-20 | seo | false | 156 | 12,605 | OK |
| 11189 | from-chaos-to-symphony | 2025-06-17 | ai | **true** | 159 | 7,224 | OK |
| 11129 | cursor-claude-chaos | 2025-02-03 | ai | false | 158 | 4,680 | OK |
| 11097 | building-a-brain | 2025-01-29 | ai | **true** | 154 | 6,857 | OK |
| 11088 | beyond-the-blueprint | 2025-01-23 | ai | false | 156 | 8,761 | OK |
| 11074 | orchestrating-ai-ensemble | 2025-01-16 | ai | false | 156 | 20,558 | OK |
| 11066 | symphony-ai-marketing | 2025-01-14 | ai | false | 155 | 3,438 | OK |
| 10988 | from-sketches-to-systems | 2025-01-06 | automation | false | 158 | 6,390 | OK |
| 10923 | context-anchoring-ai | 2024-12-27 | ai | false | 158 | 7,012 | OK |
| 10903 | ai-meeting-analysis | 2024-12-27 | ai | false | 157 | 9,191 | OK |
| 10878 | company-needs-brain | 2024-12-18 | ai | false | 156 | 5,388 | OK |
| 10849 | technical-debt-ai | 2024-11-19 | ai | false | 154 | 6,385 | OK |
| 9336  | manual-to-ai-efficiency | 2024-09-10 | automation | false | 157 | 7,169 | OK |
| 8805  | revolutionizing-digital-marketing | 2024-06-28 | seo | false | 149 | 7,113 | OK |

All `description` values fit within the 160-character Zod cap. Featured flag is
set on the two posts specified by the work order (11189, 11097).

---

## Images Requiring Backfill

The cache at `/workspace/public/images/wp/` holds 52 images downloaded during
prior sprint work. Only one image referenced by these 14 posts was not in the
local cache and remains pointing at the live WordPress origin. We should
download it before the DNS cutover so the rendered post does not depend on the
soon-to-be-archived `old.lastapple.com`.

| Referenced in | Original URL | Filename to drop into `/public/images/wp/` |
| --- | --- | --- |
| `cursor-claude-chaos.mdx` | https://lastapple.com/wp-content/uploads/2025/02/mautic-contact-batch-processing-workflow-diagram.svg | `mautic-contact-batch-processing-workflow-diagram.svg` |

Once the file lands in `/public/images/wp/`, re-run `python3 .tmp/convert.py`
(or hand-edit the single `![...](...)` line) to flip the URL from absolute to
`/images/wp/mautic-contact-batch-processing-workflow-diagram.svg`.

---

## HTML→Markdown Conversion Rules Applied

1. Stripped Elementor shell (`<div data-elementor-type>`, `.elementor-*` wrapper
   divs, `[elementor]` shortcodes) and unwrapped them while preserving inner
   content.
2. Removed `style=""` and noise classes (`wp-block-*`, `elementor-*`, `has-*`).
   Preserved `language-*` and `hljs-*` classes on `<code>` tags.
3. Stripped `data-*` and Elementor `id="elementor-..."` attributes.
4. Unwrapped `<figure>` shells, kept `<img>` inside, promoted `<figcaption>` to
   an italic paragraph.
5. Rewrote `<img src>` URLs that pointed at `/wp-content/uploads/` to
   `/images/wp/{filename}` whenever the filename existed in the local cache.
   Stripped `srcset`, `sizes`, `width`, `height`, `loading` attributes.
6. Decoded HTML entities (`&amp;`, `&#8217;`, `&#8221;`, etc.) into UTF-8
   characters.
7. Normalized curly quotes used as attribute delimiters in raw HTML tags
   (e.g. `<a id=”foo”>`) to straight quotes so MDX would not choke.
8. Escaped stray `{` and `}` in prose (outside fenced code blocks and inline
   code spans) so MDX would not parse them as JSX expressions.
9. Detected pseudo-code stored in `<p>...<br/>...</p>` blocks (no `<pre>`/
   `<code>` wrapper, contained `{` `}`) and rewrapped as `<pre><code>` so the
   final markdown ended up fenced.
10. Removed any leading `<h1>` that duplicated the frontmatter title.
11. Description built from `excerpt.rendered`: stripped HTML, decoded entities,
    leading title-repetition removed, hard-capped at 160 chars on a word
    boundary.

---

## Build Result

```
$ npm run build
> next build
▲ Next.js 16.1.1 (Turbopack)
✓ Compiled successfully in 14.3s
✓ Generating static pages using 1 worker (38/38) in 1928.0ms
```

The Stream route emitted 15 static pages (14 imports plus the pre-existing
FORGE entry `replacing-bash-with-database-tables`, which was left untouched
per the work order).

### Node version note

The system Node binary is `v18.19.1`. Next.js 16 hard-requires `>=20.9.0`.
For this build I dropped Node 20.18.1 into `/tmp/node20/bin` and ran
`PATH=/tmp/node20/bin:$PATH npm run build`. Vercel's build container uses
Node 20 by default so the deploy build will pass without intervention. The
local dev box should install Node 20 (nvm, fnm, or `n`) before the next CI
run so we are not depending on a `/tmp` shim.
