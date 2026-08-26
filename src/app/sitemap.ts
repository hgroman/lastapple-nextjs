import { MetadataRoute } from 'next';
import { getStreamPosts, getServices, getSolutions, getSkiesEntries } from '@/lib/content';

const BASE_URL = 'https://lastapple.com';

// lastModified is emitted ONLY where a real content date exists (stream posts).
// It used to be `new Date()` on every static/service/solution entry — the build
// timestamp — which told Google that every page changed on every deploy. A wrong
// lastmod is worse than none: Google learns to distrust the signal site-wide and
// spends crawl budget re-fetching pages that did not change. Services and
// solutions carry no date in frontmatter, and file mtime resets on a fresh clone,
// so there is no honest value to emit — omit the field instead of inventing one.

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getStreamPosts();
  const services = getServices();
  const solutions = getSolutions();
  const skies = getSkiesEntries();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/stream`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/solutions`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/skies`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/portfolio`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Stream posts
  const streamPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/stream/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Service pages
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Solution pages
  const solutionPages: MetadataRoute.Sitemap = solutions.map((solution) => ({
    url: `${BASE_URL}/solutions/${solution.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Live-Scored Skies. These carry a real release date, so lastModified is
  // honest here in a way it is not for services and solutions.
  //
  // ONLY the /skies/<slug> pages are listed. The trip maps and 360 spheres
  // served at /skies/map/* and /skies/pano/* are deliberately absent: they are
  // noindexed embedded components (71 indexable words against 94KB of script),
  // and the page that embeds one is the indexable surface. Listing an artifact
  // here would ask Google to index exactly what the noindex is refusing.
  const skiesPages: MetadataRoute.Sitemap = skies.map((entry) => ({
    url: `${BASE_URL}/skies/${entry.slug}`,
    lastModified: new Date(entry.releaseDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...streamPages, ...servicePages, ...solutionPages, ...skiesPages];
}
