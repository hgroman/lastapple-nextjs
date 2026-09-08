'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Compass, Maximize2 } from 'lucide-react';
import { panoramaGeometry, type Panorama } from '../../../content/schema/skies';

/**
 * Click-to-load viewer for a panorama this site hosts itself.
 *
 * Deliberately NOT MediaFacade. That component frames everything at 16:9 and
 * hands the artifact to an iframe that owns its own projection. Neither is
 * right here: this image is a 238.7deg x 48.7deg BAND with an aspect ratio of
 * 4.9:1, and there is no external viewer to be authoritative — this file is
 * where the projection is decided, so it is where the geometry has to be read
 * from the data rather than styled to taste.
 *
 * THE RULE THIS COMPONENT EXISTS TO KEEP: the frame never stretches the band to
 * fill a viewport. A 4.9:1 image forced into 16:9 bends the horizon and
 * fabricates sky that was never captured. The still and the live viewer both
 * render at the band's true aspect, letterboxed if the container is taller.
 *
 * Pannellum is vendored at /vendor/pannellum (2.5.6, MIT) and loaded ONLY when
 * a visitor asks for it — nothing third-party, nothing on first paint, and no
 * 56KB of WebGL library on a phone that came to read the caption.
 */

interface PanoramaViewerProps {
  panorama: Panorama;
  /** Accessible label, e.g. the entry title. */
  label: string;
  caption?: string;
  /** Load the still eagerly — set on the LCP image only. */
  priority?: boolean;
}

// The global the vendored script installs. Typed narrowly: we use one call.
type PannellumViewer = { destroy: () => void };
type PannellumGlobal = {
  viewer: (el: HTMLElement, cfg: Record<string, unknown>) => PannellumViewer;
};

declare global {
  interface Window {
    pannellum?: PannellumGlobal;
  }
}

/** Load a script/stylesheet once, reusing the tag if it is already present. */
function loadAsset(tag: 'script' | 'link', url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const sel = tag === 'script' ? `script[src="${url}"]` : `link[href="${url}"]`;
    const existing = document.querySelector<HTMLElement>(sel);
    if (existing) {
      if (existing.dataset.loaded === 'true') return resolve();
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error(url)), { once: true });
      return;
    }
    const el = document.createElement(tag);
    if (tag === 'script') {
      (el as HTMLScriptElement).src = url;
      (el as HTMLScriptElement).async = true;
    } else {
      (el as HTMLLinkElement).rel = 'stylesheet';
      (el as HTMLLinkElement).href = url;
    }
    el.addEventListener('load', () => {
      el.dataset.loaded = 'true';
      resolve();
    }, { once: true });
    el.addEventListener('error', () => reject(new Error(url)), { once: true });
    document.head.appendChild(el);
  });
}

export function PanoramaViewer({ panorama, label, caption, priority = false }: PanoramaViewerProps) {
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PannellumViewer | null>(null);

  const { haov, vaov, vOffset } = panoramaGeometry(panorama);

  // The still is the band itself, never a crop — so the frame is sized by the
  // real angular extent rather than a house style.
  const aspect = `${panorama.large.width} / ${panorama.large.height}`;

  const start = useCallback(() => setActive(true), []);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    (async () => {
      try {
        await loadAsset('link', '/vendor/pannellum/pannellum.css');
        await loadAsset('script', '/vendor/pannellum/pannellum.js');
        if (cancelled || !mountRef.current || !window.pannellum) return;

        // A phone gets the 2048 rendition. Not only bandwidth: WebGL
        // MAX_TEXTURE_SIZE is 4096 on a large share of mobile GPUs, and an
        // oversized equirect binds to nothing and paints black.
        const small = window.matchMedia('(max-width: 640px)').matches;
        const source = small ? panorama.small : panorama.large;

        viewerRef.current = window.pannellum.viewer(mountRef.current, {
          type: 'equirectangular',
          panorama: source.src,
          // ── The measured band. Derived from the JPEG's own GPano tags; see
          //    panoramaGeometry(). Do not hand-tune these to fill the frame.
          haov,
          vaov,
          vOffset,
          // Hard stops at the edges of what was actually captured. Without
          // these a drag runs off into grey nothing and the piece reads as
          // broken rather than as bounded.
          minYaw: -haov / 2,
          maxYaw: haov / 2,
          minPitch: vOffset - vaov / 2,
          maxPitch: vOffset + vaov / 2,
          // Start looking at the horizon, straight down the middle.
          yaw: 0,
          pitch: 0,
          hfov: 90,
          minHfov: 35,
          // Never zoom out past the band's own width — that would frame empty
          // space around the image and invite the reading that sky is missing
          // rather than that it was never claimed.
          maxHfov: Math.min(110, haov),
          autoLoad: true,
          showZoomCtrl: true,
          showFullscreenCtrl: true,
          keyboardZoom: true,
          friction: 0.15,
        });
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      try {
        viewerRef.current?.destroy();
      } catch {
        /* viewer already torn down */
      }
      viewerRef.current = null;
    };
  }, [active, panorama, haov, vaov, vOffset]);

  return (
    <figure className="group/pano">
      <div
        className="relative w-full overflow-hidden rounded-xl border border-border bg-card"
        style={{ aspectRatio: aspect }}
      >
        {active && !failed ? (
          <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-label={label} role="img" />
        ) : (
          <button
            type="button"
            onClick={start}
            disabled={failed}
            aria-label={`Explore the panorama: ${label}`}
            className="absolute inset-0 h-full w-full cursor-pointer disabled:cursor-default"
          >
            <Image
              src={panorama.large.src}
              alt={panorama.alt}
              fill
              // The band is wider than any column it sits in, so it is served at
              // full container width and never upscaled past its own pixels.
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1100px"
              className="object-cover"
              priority={priority}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

            {!failed && (
              <>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-background/70 backdrop-blur-sm transition-all duration-300 group-hover/pano:scale-110 group-hover/pano:border-accent/60">
                    <Compass className="h-6 w-6 text-accent" />
                  </span>
                </span>
                <span className="absolute bottom-3 left-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground/70">
                  <Maximize2 className="h-3.5 w-3.5" />
                  Drag to look along the ridge
                </span>
              </>
            )}
          </button>
        )}
      </div>

      <figcaption className="mt-3 text-sm text-muted-foreground">
        {failed ? (
          // An honest fallback. The still above is the whole capture, so a
          // visitor without WebGL loses the interaction and none of the picture.
          <span>
            The interactive viewer could not start in this browser — the still above is the
            complete {haov.toFixed(0)}&deg; sweep.
          </span>
        ) : (
          caption
        )}
      </figcaption>
    </figure>
  );
}
