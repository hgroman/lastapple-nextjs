import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Music, Clock } from 'lucide-react';
import { getSkiesByKind, getMapPublication } from '@/lib/content';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { formatDuration } from '@/lib/utils';

/**
 * Live-Scored Skies on the homepage.
 *
 * The homepage sold code and IT only, which under-sold the business: aerial
 * cinematography with original scoring is a LINE OF BUSINESS, not a founder's
 * side interest, and a visitor had no way to learn that without opening a menu.
 *
 * Shows ONE pairing rather than the whole collection — a film beside the flight
 * path it was scored from is the entire idea, and it lands harder once than
 * three times. Posters only, no embeds: this sits on the homepage and must cost
 * nothing to load.
 */
export function SkiesSection() {
  const films = getSkiesByKind('film');
  // The strongest pairing leads: `order` is curated, so the first film is the
  // one chosen to carry the idea, not the most recent one.
  const lead = films[0];
  if (!lead?.poster || !lead.map) return null;

  const pub = lead.map.publicationSlug ? getMapPublication(lead.map.publicationSlug) : null;
  const mapped = pub?.stats?.find(s => s.label === 'mapped');
  const states = pub?.stats?.find(s => s.label === 'states');

  return (
    // scroll-mt matches BaseLayout's top padding: the logo is fixed at top-6
    // with h-28 and covers y 24..136px, so an anchor jump to #skies would land
    // the heading underneath it. Same collision the CEO caught on mobile, just
    // reached by a URL fragment instead of by page load.
    <section id="skies" className="relative py-24 overflow-hidden scroll-mt-40 sm:scroll-mt-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />

      <div className="relative z-10 container">
        <RevealOnScroll>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider mb-2 block">
                Aerial &amp; Original Scoring
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold">Live-Scored Skies</h2>
            </div>
            <Link
              href="/skies"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              See the films
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
            Last Apple produces aerial cinematography with original composition. Every flight is
            logged with its own coordinates as it is shot — so each film sits beside{' '}
            <span className="text-primary font-medium">the actual flight path that produced it</span>.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={160}>
          <article className="group relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-colors hover:border-primary/50">
            <Link href={`/skies/${lead.slug}`} className="absolute inset-0 z-10" aria-label={lead.title} />

            <div className="grid sm:grid-cols-2">
              <div className="relative aspect-video">
                <Image
                  src={lead.poster.src}
                  alt={lead.poster.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-3 rounded bg-background/75 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider backdrop-blur-sm">
                  Film
                </span>
              </div>
              <div className="relative aspect-video border-t sm:border-t-0 sm:border-l border-border">
                <Image
                  src={lead.map.poster.src}
                  alt={lead.map.poster.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover opacity-90"
                />
                <span className="absolute bottom-2 left-3 rounded bg-background/75 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider backdrop-blur-sm">
                  Flight path
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors text-balance">
                {lead.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {lead.locationName && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {lead.locationName}
                    {lead.state ? `, ${lead.state}` : ''}
                  </span>
                )}
                {lead.instrument && (
                  <span className="inline-flex items-center gap-1.5">
                    <Music className="h-4 w-4" />
                    Original {lead.instrument}
                  </span>
                )}
                {lead.durationSec && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {formatDuration(lead.durationSec)}
                  </span>
                )}
                {pub && mapped && states && (
                  <span className="text-muted-foreground/80">
                    {pub.title}: {mapped.value} clips plotted across {states.value} states
                  </span>
                )}
                <span className="ml-auto inline-flex items-center gap-1.5 text-primary font-medium">
                  Watch and explore
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </article>
        </RevealOnScroll>

        {/* Mobile equivalent of the header link, which is hidden below sm. */}
        <RevealOnScroll delay={240}>
          <Link
            href="/skies"
            className="sm:hidden mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            See all the films
            <ArrowRight className="h-4 w-4" />
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
