import { z } from 'zod';

// Image schema for consistent image handling
const ImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

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
  // Image fields - featuredImage is the main OG/social image
  featuredImage: ImageSchema.optional(),
  // Legacy support: simple string path (will be deprecated)
  image: z.string().optional(),
  // Additional images used in the post
  images: z.array(ImageSchema).optional(),
  body: z.string(),
});

export type StreamPost = z.infer<typeof StreamPostSchema>;
export type StreamImage = z.infer<typeof ImageSchema>;
