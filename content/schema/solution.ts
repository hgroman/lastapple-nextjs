import { z } from 'zod';

export const SolutionSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().max(160, 'Description max 160 chars for SEO'),
  slug: z.string(),
  icon: z.string(),
  category: z.enum(['ai', 'integration', 'automation', 'data']),
  outcomes: z.array(z.string()).min(2, 'Need at least 2 outcomes'),
  published: z.boolean().default(true),
  order: z.number().default(0),
  body: z.string(),
});

export type Solution = z.infer<typeof SolutionSchema>;
