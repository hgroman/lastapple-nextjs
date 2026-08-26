import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Music, Clock, Compass } from 'lucide-react';
import { getSkiesEntries, getSkiesByKind, getMapPublication, getLibraryStats } from '@/lib/content';
import { BaseLayout } from '@/components/content/layouts/BaseLayout';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { formatDuration, formatPostDate } from '@/lib/utils';

const DESCRIPTION =
  'Aerial cinematography with original scoring — each film shown beside the flight path it was scored from.';

export const metadata: Metadata = {
  alternates: { canonical: '/skies' },
  title: 'Live-Scored Skies',
  description: DESCRIPTION,
  openGraph: {
    title: 'Live-Scored Skies | Last Apple',
    description: DESCRIPTION,
    type: 'website',
    url: '/skies',
    images: [
      {
        url: 'https://lastapple.com/images/skies/september-sunrise-fog-westfield-pa.jpg',
        width: 1600,
        height: 900,
        alt: 'Morning fog lying along a river valley over the town of Westfield, Pennsylvania, seen from the air at sunrise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live-Scored Skies | Last Apple',
    description: DESCRIPTION,
    images: ['https://lastapple.com/images/skies/september-sunrise-fog-westfield-pa.jpg'],
  },
};

export default function SkiesPage() {
  const films = getSkiesByKind('film');
  const others = getSkiesEntries().filter((e) => e.kind !== 'film');

  // Named explicitly rather than sliced off the top: the band is curated, and a
  // label that stops existing should vanish rather than shift the others along.
  const libraryStats = getLibraryStats([
    'drone flights',
    'flights with exact GPS',
    'states',
    'golden-hour clips',
  ]);
  const range = getLibraryStats(['first flight', 'most recent flight']);

  return (
    <BaseLayout maxWidth="lg" showGrid orbStrength="vivid">
      <header className="mb-14 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Live-Scored <span className="gradient-text">Skies</span>
        </h1>

        {/* Hank's own words, from the playlist he wrote by hand. Treated as
            source, not raw material — do not rewrite this into marketing voice. */}
        <p className="text-xl text-muted-foreground mb-4">
          Breathtaking aerial cinematography meets original musical composition in perfect harmony.
        </p>
        <p className="text-lg text-muted-foreground mb-4">
          An ongoing artistic journey, blending stunning 4K drone footage from incredible locations
          with custom piano and orchestral scores. Each video captures the unique dialogue between
          landscape and music.
        </p>
        <p className="text-lg text-muted-foreground">
          Sometimes the most beautiful art happens when preparation meets spontaneous inspiration.
          These films explore how nature inspires music — and how music deepens our connection to
          the landscapes that move us.
        </p>
      </header>

      {/* THE THESIS — stated once, plainly, before the evidence. */}
      <RevealOnScroll>
        <div className="mb-14 rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm p-6 sm:p-8">
          <p className="text-lg">
            Every flight is logged with its own coordinates as it is shot. So each film here sits
            beside <span className="text-primary font-medium">the actual flight path that produced it</span> —
            the map is not an illustration, it is the telemetry.
          </p>
        </div>
      </RevealOnScroll>

      {/* The catalogue behind the films. A curated handful, not all thirteen —
          a stat band is not a database dump. Each figure keeps its full scope in
          a title attribute, and every LABEL names its own population, because a
          tile shows the label and hides the scope. */}
      {libraryStats.length > 0 && (
        <RevealOnScroll>
          <div className="mb-14">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {libraryStats.map((stat) => (
                <div
                  key={stat.label}
                  title={`${stat.scope} — as of ${new Date(stat.asOf).toLocaleDateString('en-US', { dateStyle: 'medium' })}`}
                  className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString('en-US') : stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
            {range.length === 2 && (
              <p className="mt-3 text-center text-xs text-muted-foreground/80">
                First flight {formatPostDate(String(range[0].value), { dateStyle: 'long' })} · most
                recent {formatPostDate(String(range[1].value), { dateStyle: 'long' })}
              </p>
            )}
          </div>
        </RevealOnScroll>
      )}

      {/* Films, each previewing its pairing. Posters only on this page: no
          iframes, nothing third-party, so it stays fast on a phone. The live
          embeds load on the individual film pages. */}
      <div className="grid gap-10 mb-16">
        {films.map((film, i) => {
          const pub = film.map?.publicationSlug ? getMapPublication(film.map.publicationSlug) : null;
          const mapped = pub?.stats?.find((s) => s.label === 'mapped');
          const states = pub?.stats?.find((s) => s.label === 'states');

          return (
            <RevealOnScroll key={film.slug} delay={i * 80}>
              <article className="group relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-colors hover:border-primary/50">
                <Link href={`/skies/${film.slug}`} className="absolute inset-0 z-10" aria-label={film.title} />

                <div className="grid sm:grid-cols-2">
                  {/* The film */}
                  <div className="relative aspect-video">
                    {film.poster && (
                      <Image
                        src={film.poster.src}
                        alt={film.poster.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                        priority={i === 0}
                      />
                    )}
                    <span className="absolute bottom-2 left-3 rounded bg-background/75 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider backdrop-blur-sm">
                      Film
                    </span>
                  </div>

                  {/* The flight path it was scored from */}
                  <div className="relative aspect-video border-t sm:border-t-0 sm:border-l border-border">
                    {film.map && (
                      <Image
                        src={film.map.poster.src}
                        alt={film.map.poster.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover opacity-90"
                      />
                    )}
                    <span className="absolute bottom-2 left-3 rounded bg-background/75 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider backdrop-blur-sm">
                      Flight path
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors text-balance">
                    {film.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{film.description}</p>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                    {film.locationName && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {film.locationName}
                        {film.state ? `, ${film.state}` : ''}
                      </span>
                    )}
                    {film.instrument && (
                      <span className="inline-flex items-center gap-1.5">
                        <Music className="h-4 w-4" />
                        Original {film.instrument}
                      </span>
                    )}
                    {film.durationSec && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {formatDuration(film.durationSec)}
                      </span>
                    )}
                    {/* Figures come from the committed catalogue export, each
                        carrying its own population — never retyped by hand. */}
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
          );
        })}
      </div>

      {/* Panoramas and any standalone maps. */}
      {others.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Look around</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {others.map((entry) => (
              <RevealOnScroll key={entry.slug}>
                <article className="group relative rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-colors hover:border-accent/50">
                  <Link href={`/skies/${entry.slug}`} className="absolute inset-0 z-10" aria-label={entry.title} />
                  {entry.embed && (
                    <div className="relative aspect-video">
                      <Image
                        src={entry.embed.poster.src}
                        alt={entry.embed.poster.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-background/70 backdrop-blur-sm transition-transform group-hover:scale-110">
                          <Compass className="h-5 w-5 text-accent" />
                        </span>
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{entry.description}</p>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      )}

      <RevealOnScroll>
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Aerial work, scored to order</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Last Apple produces aerial cinematography with original composition — for places,
            projects and people worth scoring.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-6 py-3 font-semibold text-white shadow-lg"
          >
            Start a conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </RevealOnScroll>
    </BaseLayout>
  );
}
