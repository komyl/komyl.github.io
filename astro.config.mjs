import { defineConfig } from 'astro/config';

export default defineConfig({
  // No integrations
  markdown: {
    remarkPlugins: [
      'remark-toc' ]
    }
});