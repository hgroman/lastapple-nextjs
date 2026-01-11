import { z } from 'zod';

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
  }).optional(),
  published: z.boolean().default(true),
  order: z.number().default(0),
  body: z.string(),
});

export type Solution = z.infer<typeof SolutionSchema>;
