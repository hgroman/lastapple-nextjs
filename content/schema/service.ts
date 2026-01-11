import { z } from 'zod';

export const ServiceSchema = z.object({
  title: z.string().min(5),
  description: z.string().max(160),
  slug: z.string(),
  icon: z.string(),
  category: z.enum(['wordpress', 'ai', 'integration']),
  features: z.array(z.string()).min(3),
  pricing: z.object({
    starting: z.number().optional(),
    unit: z.string().optional(),
  }).optional(),
  cta: z.object({
    text: z.string(),
    href: z.string(),
  }).optional(),
  published: z.boolean().default(true),
  order: z.number().default(0),
  body: z.string(),
});

export type Service = z.infer<typeof ServiceSchema>;
