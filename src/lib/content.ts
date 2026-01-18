import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { StreamPostSchema, type StreamPost } from '../../content/schema/stream';
import { ServiceSchema, type Service } from '../../content/schema/service';
import { SolutionSchema, type Solution } from '../../content/schema/solution';

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
