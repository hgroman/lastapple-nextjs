import { getMapPublication } from '@/lib/content';
import { artifactPath } from '@/lib/skies-artifacts';
import { MediaFacade } from '@/components/skies/MediaFacade';

/**
 * Embed a published flight map or 360 sphere in MDX by slug alone:
 *
 *   <SkiesMap slug="cross-country-2026" />
 *
 * Everything else — URL, poster, alt text, caption figures — is resolved from
 * the committed sky_library export and the artifact registry, so a Stream entry
 * cannot drift from the catalogue and cannot quote a number by hand. Throws at
 * build time on an unknown slug, or on one whose noindex has not been verified.
 */
export function SkiesMap({ slug, caption }: { slug: string; caption?: string }) {
  const pub = getMapPublication(slug);
  if (!pub) {
    throw new Error(
      `<SkiesMap slug="${slug}"> — no such publication in content/skies/map-publications.json`
    );
  }

  const mapped = pub.stats?.find(s => s.label === 'mapped');
  const states = pub.stats?.find(s => s.label === 'states');
  const auto =
    mapped && states
      ? `${pub.title} — ${mapped.value} clips plotted across ${states.value} states`
      : pub.title;

  return (
    <div className="my-8 not-prose">
      <MediaFacade
        kind={slug.startsWith('pano-') ? 'pano' : 'map'}
        artifactPath={artifactPath(pub.slug)}
        poster={pub.poster}
        label={pub.title}
        caption={caption ?? auto}
      />
    </div>
  );
}
