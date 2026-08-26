/**
 * THE ARTIFACT REGISTRY — the single place a Live-Scored Skies map or sphere is
 * registered, and the only place its path, its origin and its noindex status are
 * written down.
 *
 * Three consumers read this one table, which is the point: next.config.ts builds
 * the rewrites from it, the page components resolve a publication slug to a
 * same-origin path through it, and scripts/verify-internal-links.mjs treats an
 * unverified entry as a dead link. Registering a map in one place and forgetting
 * another is therefore not possible.
 *
 * Each artifact is its own self-contained static deploy on its own Vercel
 * project. Rather than leave them at bare *.vercel.app addresses carrying Hank's
 * work with his name nowhere on it, they are proxied to branded paths here. No
 * DNS record, no subdomain, no router project.
 *
 * ── noindexVerified ─────────────────────────────────────────────────────────
 * These are thin, JS-rendered pages — the 2026 trip map is 71 indexable words
 * against 94KB of script. Linking one that does not carry
 * <meta name="robots" content="noindex"> would feed that to Google under a
 * 20-year domain and spend its quality signal rather than inherit it. The
 * indexable surface is the /skies/<slug> page that EMBEDS the artifact.
 *
 * Flip the flag ONLY after fetching the artifact and seeing the tag yourself.
 * On 2026-08-26 two maps shipped without it and nobody noticed until the live
 * URLs were measured, which is exactly why this is a build gate and not a note.
 *
 * Do NOT substitute a robots.txt Disallow: that blocks the crawl, a blocked
 * crawler never reads the noindex, and a linked-but-disallowed URL can still
 * surface as a bare URL entry. Allow the crawl, serve the noindex.
 *
 * And do NOT try to set X-Robots-Tag from next.config.ts headers(). It was tried
 * and it does not work — an external rewrite proxies the upstream response
 * verbatim, so the artifact's own Vercel headers win. Measured: the proxied
 * response comes back carrying the ORIGIN's `server: Vercel`. Config that looks
 * like a guard and enforces nothing is worse than no guard.
 */
export interface SkiesArtifact {
  /** Publication slug, matching map-publications.json and the MDX `publicationSlug`. */
  slug: string;
  /** Same-origin path this artifact is served at. */
  path: string;
  /** The upstream deploy the path proxies to. */
  origin: string;
  /** Confirmed by fetching the live artifact and seeing the robots meta tag. */
  noindexVerified: boolean;
}

export const SKIES_ARTIFACTS: SkiesArtifact[] = [
  {
    slug: 'four-corners-2025',
    path: '/skies/map/four-corners-2025',
    origin: 'https://skymap-four-corners-2025.vercel.app',
    noindexVerified: true,
  },
  {
    slug: 'cross-country-2025',
    path: '/skies/map/cross-country-2025',
    origin: 'https://skymap-cross-country-2025.vercel.app',
    noindexVerified: true,
  },
  {
    slug: 'cross-country-2026',
    path: '/skies/map/cross-country-2026',
    origin: 'https://skymap-cross-country-2026.vercel.app',
    noindexVerified: true,
  },
  {
    slug: 'pano-addison-aug-2026',
    path: '/skies/pano/addison',
    origin: 'https://skypano-addison-aug-2026.vercel.app',
    noindexVerified: true,
  },
  // NOT listed: skypano-delmar-aug-2026. It serves a deliberate "withdrawn for
  // re-capture" notice, and a branded path pointing at a tombstone is worse than
  // no path at all.
];

/**
 * Resolve a publication slug to the same-origin path that serves it.
 *
 * Throws rather than returning a fallback. This runs at build time inside a
 * server component, so an unregistered or unverified artifact fails
 * `npm run build` loudly instead of rendering a broken frame — or worse, a
 * silently indexable one — in front of a prospect.
 */
export function artifactPath(slug: string): string {
  const artifact = SKIES_ARTIFACTS.find(a => a.slug === slug);
  if (!artifact) {
    throw new Error(
      `Unknown skies artifact "${slug}". Register it in src/lib/skies-artifacts.ts ` +
        `(and confirm its noindex) before referencing it from content.`
    );
  }
  if (!artifact.noindexVerified) {
    throw new Error(
      `Skies artifact "${slug}" is not noindex-verified. Fetch ${artifact.origin} ` +
        `and confirm <meta name="robots" content="noindex"> before linking it.`
    );
  }
  return artifact.path;
}
