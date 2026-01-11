import { z } from 'zod';

export const ServiceSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().max(160, 'Description max 160 chars for SEO'),
  slug: z.string(),
  icon: z.string(),
  features: z.array(z.string()).min(3, 'Services need at least 3 features'),
  priceStarting: z.number().min(0).optional(),
  published: z.boolean().default(true),
  order: z.number().default(0),
  body: z.string(),
});

export type Service = z.infer<typeof ServiceSchema>;
