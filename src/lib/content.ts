import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { StreamPostSchema, type StreamPost } from '../../content/schema/stream';
import { ServiceSchema, type Service } from '../../content/schema/service';
import { SolutionSchema, type Solution } from '../../content/schema/solution';
import {
  SkiesEntrySchema,
  MapPublicationsSnapshotSchema,
  type SkiesEntry,
  type MapPublication,
  type SkiesStat,
} from '../../content/schema/skies';

const CONTENT_DIR = path.join(process.cwd(), 'content');

// Generic content loader
function loadContent<T>(
  dir: string,
  schema: { parse: (data: unknown) => T }
): T[] {
  const fullPath = path.join(CONTENT_DIR, dir);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files = fs.readdirSync(fullPath).filter(f =>
    f.endsWith('.mdx') || f.endsWith('.md')
  );

  return files.map(file => {
    const filePath = path.join(fullPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: body } = matter(content);

    return schema.parse({
      ...data,
      slug: file.replace(/\.mdx?$/, ''),
      body, // Return raw MDX body
    });
  });
}

// Stream posts
export function getStreamPosts(): StreamPost[] {
  return loadContent('stream', StreamPostSchema)
    .filter(post => post.published)
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getStreamPost(slug: string): StreamPost | null {
  const posts = getStreamPosts();
  return posts.find(p => p.slug === slug) || null;
}

export function getFeaturedStreamPosts(limit = 3): StreamPost[] {
  return getStreamPosts()
    .filter(post => post.featured)
    .slice(0, limit);
}

// Services
export function getServices(): Service[] {
  return loadContent('services', ServiceSchema)
    .filter(s => s.published)
    .sort((a, b) => a.order - b.order);
}

export function getService(slug: string): Service | null {
  const services = getServices();
  return services.find(s => s.slug === slug) || null;
}

// Solutions
export function getSolutions(): Solution[] {
  return loadContent('solutions', SolutionSchema)
    .filter(s => s.published)
    .sort((a, b) => a.order - b.order);
}

export function getSolution(slug: string): Solution | null {
  const solutions = getSolutions();
  return solutions.find(s => s.slug === slug) || null;
}

export function getSolutionsByCategory(category: Solution['category']): Solution[] {
  return getSolutions().filter(s => s.category === category);
}

// Live-Scored Skies — aerial cinematography with original scoring.
// Newest first, matching the Stream. `order` breaks ties so a curated run of
// films can be pinned without back-dating them.
export function getSkiesEntries(): SkiesEntry[] {
  return loadContent('skies', SkiesEntrySchema)
    .filter(entry => entry.published)
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    });
}

export function getSkiesEntry(slug: string): SkiesEntry | null {
  return getSkiesEntries().find(e => e.slug === slug) || null;
}

export function getSkiesByKind(kind: SkiesEntry['kind']): SkiesEntry[] {
  return getSkiesEntries().filter(e => e.kind === kind);
}

// The films that can show the thesis — a film beside the map of the trip it was
// scored from. A film whose source trip has no published map yet is excluded
// here rather than paired with a stand-in.
export function getPairedFilms(): SkiesEntry[] {
  return getSkiesByKind('film').filter(e => Boolean(e.map));
}

/**
 * The published-map index, exported from sky_library and committed to git.
 *
 * Parsed through Zod rather than trusted: a missing poster or a bare-date
 * `mediaAsOf` fails the build here instead of rendering an empty frame or a
 * figure whose freshness cannot be proven. Deliberately a build-time file and
 * not a live query — this site is statically prerendered, and a runtime read
 * would put the flagship page's uptime on the database.
 */
function readSkiesSnapshot() {
  const file = path.join(CONTENT_DIR, 'skies', 'map-publications.json');
  if (!fs.existsSync(file)) return null;
  return MapPublicationsSnapshotSchema.parse(
    JSON.parse(fs.readFileSync(file, 'utf-8'))
  );
}

export function getMapPublications(): MapPublication[] {
  return readSkiesSnapshot()?.publications ?? [];
}

/**
 * Whole-catalogue figures, by label.
 *
 * Callers name the labels they want rather than rendering everything: thirteen
 * figures is a database dump, not a stat band. Returns only labels that exist,
 * so a renamed or dropped stat quietly disappears instead of rendering
 * "undefined" — the band is decoration, and it must never be the thing that
 * breaks a page that is otherwise about the films.
 */
export function getLibraryStats(labels: string[]): SkiesStat[] {
  const all = readSkiesSnapshot()?.library?.stats ?? [];
  return labels
    .map(l => all.find(s => s.label === l))
    .filter((s): s is SkiesStat => Boolean(s));
}

export function getMapPublication(slug: string): MapPublication | null {
  return getMapPublications().find(p => p.slug === slug) || null;
}
