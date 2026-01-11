import { z } from 'zod';

export const StreamPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().max(160, 'Description max 160 chars for SEO'),
  slug: z.string(),
  publishedAt: z.string().datetime().or(z.string()),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  body: z.string(),
});

export type StreamPost = z.infer<typeof StreamPostSchema>;
