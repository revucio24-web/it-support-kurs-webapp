import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './content/lessons' }),
  schema: z.object({
    title: z.string(),
    level: z.number(),
    module: z.number(),
    slug: z.string(),
    last_verified: z.string(),
    windows_version: z.string(),
    sources: z.array(z.string()).default([]),
  }),
});

export const collections = { lessons };
