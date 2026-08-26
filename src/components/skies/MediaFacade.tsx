'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Play, Map as MapIcon, Compass, ExternalLink } from 'lucide-react';

/**
 * Click-to-load facade for heavy embedded media.
 *
 * Nothing third-party loads until a visitor asks for it. A /skies page carries a
 * film AND the interactive flight map of the trip it was scored from; loading
 * both eagerly would mean a YouTube player plus a full mapping library and a
 * satellite tile layer on first paint. The artist-group admins this page is
 * built for will open it on a phone, so the still renders and the real thing
 * wakes up on click.
 *
 * One interaction model for all three media kinds — film, map, sphere — so the
 * page reads as one system rather than three embeds bolted together.
 */

type FacadeKind = 'film' | 'map' | 'pano';

interface MediaFacadeProps {
  kind: FacadeKind;
  /** YouTube video id for kind 'film'. */
  youtubeId?: string;
  /** Same-origin artifact path for kind 'map' | 'pano' (served via rewrite). */
  artifactPath?: string;
  poster: { src: string; alt: string };
  /** Accessible action label, e.g. "Play September Sunrise Fog". */
  label: string;
  /** Small caption rendered under the frame. */
  caption?: string;
  /** Load this poster eagerly — set on the single LCP image only. */
  priority?: boolean;
}

const ICON: Record<FacadeKind, typeof Play> = {
  film: Play,
  map: MapIcon,
  pano: Compass,
};

const ACTION: Record<FacadeKind, string> = {
  film: 'Play film',
  map: 'Open flight map',
  pano: 'Explore the sphere',
};

export function MediaFacade({
  kind,
  youtubeId,
  artifactPath,
  poster,
  label,
  caption,
  priority = false,
}: MediaFacadeProps) {
  const [active, setActive] = useState(false);
  const Icon = ICON[kind];

  // youtube-nocookie so a visitor who never presses play is never tracked.
  const src =
    kind === 'film'
      ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`
      : artifactPath;

  return (
    <figure className="group/facade">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-card">
        {active ? (
          <iframe
            src={src}
            title={label}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`${ACTION[kind]}: ${label}`}
            className="absolute inset-0 h-full w-full cursor-pointer"
          >
            <Image
              src={poster.src}
              alt={poster.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
              className="object-cover transition-transform duration-700 group-hover/facade:scale-[1.03]"
              priority={priority}
            />
            {/* Scrim: keeps the control legible over a bright sky or snow. */}
            <span className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-background/70 backdrop-blur-sm transition-all duration-300 group-hover/facade:scale-110 group-hover/facade:border-primary/60 group-hover/facade:bg-background/85">
                <Icon className="h-7 w-7 translate-x-[1px] text-primary" fill={kind === 'film' ? 'currentColor' : 'none'} />
              </span>
            </span>

            <span className="absolute bottom-3 left-4 text-xs font-medium uppercase tracking-[0.14em] text-foreground/70">
              {ACTION[kind]}
            </span>
          </button>
        )}
      </div>

      {caption && (
        <figcaption className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
          <span>{caption}</span>
          {active && kind !== 'film' && artifactPath && (
            <a
              href={artifactPath}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex shrink-0 items-center gap-1 text-primary hover:underline"
            >
              Full screen
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}
