import { z } from 'zod';

// Image schema for consistent image handling
const ImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

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
  // Image fields for rich templates
  heroImage: ImageSchema.optional(),
  images: z.array(ImageSchema).optional(),
  // Pricing tier images (for services with multiple plans)
  tierImages: z.object({
    starter: ImageSchema.optional(),
    growth: ImageSchema.optional(),
    business: ImageSchema.optional(),
  }).optional(),
  published: z.boolean().default(true),
  order: z.number().default(0),
  body: z.string(),
});

export type Service = z.infer<typeof ServiceSchema>;
export type ServiceImage = z.infer<typeof ImageSchema>;
