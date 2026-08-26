import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, MapPin, Music, Clock } from 'lucide-react';
import { getSkiesEntries, getSkiesEntry } from '@/lib/content';
import { artifactPath } from '@/lib/skies-artifacts';
import { BaseLayout } from '@/components/content/layouts/BaseLayout';
import { MediaFacade } from '@/components/skies/MediaFacade';
import { mdxComponents } from '@/lib/mdx-components';
import { formatDuration, isoDuration, formatPostDate } from '@/lib/utils';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getSkiesEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getSkiesEntry(slug);
  if (!entry) return { title: 'Not Found' };

  // The primary distribution channel for this page is a pasted link — an artist
  // group's portfolio field, a lead form. That renders an OG card, so the image
  // matters more here than the ranking does. Absolute URL: relative og:image is
  // not resolved by every scraper.
  const poster = entry.poster ?? entry.embed?.poster;
  const ogImage = poster ? `https://lastapple.com${poster.src}` : undefined;

  return {
    alternates: { canonical: `/skies/${slug}` },
    title: `${entry.title} | Live-Scored Skies`,
    description: entry.description,
    openGraph: {
      title: entry.title,
      description: entry.description,
      type: entry.kind === 'film' ? 'video.other' : 'website',
      url: `/skies/${slug}`,
      images: ogImage ? [{ url: ogImage, width: poster?.width ?? 1600, height: poster?.height ?? 900, alt: poster!.alt }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function SkiesEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getSkiesEntry(slug);
  if (!entry) notFound();

  const poster = entry.poster ?? entry.embed?.poster;

  // VideoObject makes a film eligible for video rich results. Only emitted for
  // films — a map is not a video and claiming otherwise is structured-data spam.
  const videoLd =
    entry.kind === 'film' && poster
      ? {
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          '@id': `https://lastapple.com/skies/${slug}#video`,
          name: entry.title,
          description: entry.description,
          thumbnailUrl: [`https://lastapple.com${poster.src}`],
          uploadDate: entry.releaseDate,
          duration: entry.durationSec ? isoDuration(entry.durationSec) : undefined,
          embedUrl: `https://www.youtube.com/embed/${entry.youtubeId}`,
          contentUrl: `https://www.youtube.com/watch?v=${entry.youtubeId}`,
          creator: { '@type': 'Person', name: 'Hank Groman' },
        }
      : null;

  return (
    <BaseLayout maxWidth="lg" showGrid>
      {videoLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
        />
      )}

      <Link
        href="/skies"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Live-Scored Skies
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
          {entry.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {entry.locationName && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {entry.locationName}
              {entry.state ? `, ${entry.state}` : ''}
            </span>
          )}
          {entry.instrument && (
            <span className="inline-flex items-center gap-1.5">
              <Music className="h-4 w-4" />
              Original {entry.instrument}
            </span>
          )}
          {entry.durationSec && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {formatDuration(entry.durationSec)}
            </span>
          )}
          <span>{formatPostDate(entry.releaseDate, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </header>

      {/* THE PAIRING — the film and the flight path that produced it, side by
          side. This is the whole thesis of Live-Scored Skies and the reason the
          page is laid out in two columns rather than as a video wall. */}
      <div className={entry.map ? 'grid gap-6 lg:grid-cols-2 mb-12' : 'mb-12'}>
        {entry.kind === 'film' && entry.poster && (
          <MediaFacade
            kind="film"
            youtubeId={entry.youtubeId}
            poster={entry.poster}
            label={entry.title}
            caption="The film"
            priority
          />
        )}

        {entry.embed && (
          <MediaFacade
            kind={entry.kind === 'pano' ? 'pano' : 'map'}
            artifactPath={artifactPath(entry.embed.publicationSlug!)}
            poster={entry.embed.poster}
            label={entry.title}
            caption={entry.kind === 'pano' ? 'Drag to look around' : 'The flight path'}
            priority
          />
        )}

        {entry.map && (
          <MediaFacade
            kind="map"
            artifactPath={artifactPath(entry.map.publicationSlug!)}
            poster={entry.map.poster}
            label={`Flight map for ${entry.title}`}
            caption="The flight path it was scored from"
          />
        )}
      </div>

      <div className="prose-content max-w-3xl">
        <MDXRemote
          source={entry.body}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </BaseLayout>
  );
}
