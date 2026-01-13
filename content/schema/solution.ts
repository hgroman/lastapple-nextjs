import { z } from 'zod';

// Image schema for consistent image handling
const ImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const SolutionSchema = z.object({
  title: z.string().min(5),
  description: z.string().max(160),
  slug: z.string(),
  icon: z.string(),
  category: z.enum(['ai', 'integration', 'automation', 'data']),
  outcomes: z.array(z.string()).min(2),
  caseStudy: z.object({
    client: z.string(),
    outcome: z.string(),
    image: ImageSchema.optional(),
  }).optional(),
  // Image fields for rich templates
  heroImage: ImageSchema.optional(),
  images: z.array(ImageSchema).optional(),
  published: z.boolean().default(true),
  order: z.number().default(0),
  body: z.string(),
});

export type Solution = z.infer<typeof SolutionSchema>;
export type SolutionImage = z.infer<typeof ImageSchema>;
