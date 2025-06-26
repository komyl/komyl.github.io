import { defineCollection, z } from 'astro:content';

// Schema for the "blog" collection
const blogCollection = defineCollection({
  type: 'content', // 'content' for Markdown files
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
  }),
});

// Schema for the "projects" collection
const projectsCollection = defineCollection({
  type: 'content', // For Markdown files detailing projects
  schema: z.object({
    name: z.string(),
    status: z.enum(['active', 'suspended', 'finished']),
    category: z.enum(['Commercial', 'Personal & Academic']),
    technologies: z.array(z.string()),
    duration: z.string(),
    url: z.string().url(),
  }),
});

// Export a single `collections` object to register our collections
export const collections = {
  'blog': blogCollection,
  'projects': projectsCollection,
};