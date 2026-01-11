import { z } from 'zod';

export const StreamPostSchema = z.object({
  title: z.string().min(5),
  description: z.string().max(160),
  slug: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category: z.enum(['ai', 'seo', 'wordpress', 'automation']).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  image: z.string().optional(),
  body: z.string(),
});

export type StreamPost = z.infer<typeof StreamPostSchema>;
