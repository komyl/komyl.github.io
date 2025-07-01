import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap'; 

export default defineConfig({

  site: 'https://www.komyl.com',


  integrations: [
    sitemap()
  ],


  markdown: {
    remarkPlugins: [
      'remark-toc'
    ]
  }
});