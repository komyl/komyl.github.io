---
title: "Building a Modern Personal Website with Astro : A Deep Dive"
slug: building-a-modern-website-with-astro
pubDate: 2025-07-01T16:35:59.769Z
description: A comprehensive, step-by-step guide on creating a modern, fast, and
  feature-rich personal website and blog using the Astro framework, from initial
  setup to automated deployment on Netlify.
tags:
  - Astro
  - Web Development
  - JavaScript
  - TypeScript
  - CSS
  - Jamstack
  - Static Site Generator
seo_checklist:
  subheadings_used: true
  word_count: true
  meta_length: true
  keyword_in_slug: true
  keyword_in_meta: true
  keyword_in_title: true
---
## Introduction: Why Astro?

Building a personal website in today's web ecosystem can be a daunting task. You want speed, good SEO, a modern look, and an easy way to manage content. After exploring various options, I landed on [Astro](https://astro.build/), a modern static site generator that promised performance by shipping zero JavaScript by default. This is the story of how I built this very site from the ground up, navigating through design decisions, technical challenges, and feature implementations.

The goal was to create more than just a simple landing page. I needed a platform to showcase my projects, share my thoughts via a blog, and provide ways for people to connect with me. All of this had to be wrapped in a design that was clean, professional, and adhered to modern UI/UX principles, heavily inspired by Apple's Human Interface Guidelines.

## The Foundation: Setting Up the Astro Project

The journey began with a single command in the terminal:

```bash
# Using npm to scaffold a new Astro project
npm create astro@latest
```

Astro's setup wizard is straightforward. I chose the "Empty" template to have full control over the project structure from the very beginning. The key to a maintainable frontend architecture is a solid foundation, which for this project consists of two main parts: the global layout and a system of design tokens.

### 1. The Central Layout (src/layouts/Layout.astro)

Instead of repeating HTML boilerplate (`<head>`, `<body>`, etc.) on every page, Astro uses a layout system. I created a single `Layout.astro` component to serve as the master template for the entire site. This file contains the main HTML structure, global CSS, and critical scripts that need to run on every page, like the theme switcher. Any other page can then import and wrap itself with this layout.

### 2. Design Tokens with CSS Variables

To maintain design consistency and adhere to Apple's HIG, I decided against hardcoding values like colors and spacing. Instead, I established a system of "design tokens" using CSS variables in the global stylesheet within `Layout.astro`.

```
:root {
    /* Spacing units for consistent margins and padding */
    --spacing-unit: 8px;
    --border-radius-large: 24px;
    
    /* A professional, accessible color palette */
    --font-family-body: 'Inter', -apple-system, sans-serif;
    --color-primary: #aE50f5; 
    --color-secondary: #0a84ff;

    /* Default Dark Theme Colors */
    --color-background: #101010;
    --color-text: rgba(255, 255, 255, 0.9);
    --color-text-muted: rgba(235, 235, 245, 0.6);
    --glass-background: rgba(40, 40, 40, 0.5);
    --glass-border: rgba(255, 255, 255, 0.1);
}
```

This approach allows for easy and consistent styling across all components and makes implementing features like a dark/light theme incredibly simple.

## Crafting the UI: Glassmorphism and a Dual-Theme System

A core goal was a modern aesthetic. I opted for "Glassmorphism," a design trend that uses transparency, blur, and layered elements to create a sense of depth.

### 1. The Glass Effect

This was achieved in CSS using the `backdrop-filter` property on card-like elements (`ProjectCard`, blog post items).

```
.card {
    background-color: var(--glass-background);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px); /* For Safari */
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius-large);
}
```

This simple rule gives the elements a "frosted glass" look, allowing the background to subtly shine through.

### 2. Light & Dark Mode

Implementing a theme switcher that respects user preferences and persists their choice was a critical feature. The process involved three key steps:

First, defining the light theme colors in our global stylesheet by overriding the default dark theme variables:

```
html.light-theme {
    --color-background: #f2f2f7; /* A calmer off-white */
    --color-text: rgba(0, 0, 0, 0.85);
    /* ... and so on */
}
```

Second, creating a simple `ThemeToggleButton.astro` component to house the UI for the button (sun/moon icons).

Third, writing a single, robust JavaScript snippet placed directly in the `<head>` of the main `Layout.astro`. This script handles everything:

* It checks `localStorage` for a saved user preference.
* If none is found, it respects the user's OS-level theme via `prefers-color-scheme`.
* It applies the correct theme class to the `<html>` tag *before* the page renders to prevent any "flash" of the wrong theme.
* It attaches click listeners to the toggle buttons to update the theme and save the choice to `localStorage`.

## Content Management: The Power of Astro's Content Collections



Initially, the plan was to integrate a Headless CMS for a graphical admin panel. After running into numerous unforeseen environmental and network-related issues with several CMS platforms, I pivoted to a simpler, more robust, and developer-centric solution: **Astro's built-in Content Collections**.

This approach gives you the best of both worlds: the simplicity of writing content in Markdown files and the power of fully-typed data.

### 1. Defining the Schema (`src/content/config.ts`)

This is the source of truth for all content. Here, we define the structure for our "projects" and "blog" posts using Zod, a TypeScript-first schema validation library.

```
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    status: z.enum(['active', 'suspended', 'finished']),
    category: z.enum(['Commercial', 'Personal & Academic']),
    technologies: z.array(z.string()),
    url: z.string().url().optional(),
    // ... other fields
  }),
});

export const collections = {
  'projects': projectsCollection,
  // ... blog collection
};
```

This ensures that every Markdown file for a project *must* have these fields with the correct data types, otherwise the site will fail to build—a powerful way to prevent data errors.

### 2. Fetching and Rendering Content

On any page, like `index.astro`, fetching all projects is as simple as:

```
import { getCollection } from 'astro:content';
const allProjects = await getCollection('projects');
```

Astro automatically parses the frontmatter, validates it against our schema, and provides a fully-typed array of objects to work with.

## Advanced Features & Final Touches

### 1. Automated Technology Detection

One of my initial goals was to have the site automatically detect the technologies used in a project just by providing its GitHub URL. This was achieved by creating a data-fetching function directly in `index.astro`'s frontmatter.

This function uses the GitHub API (authenticated with a Personal Access Token stored securely as an environment variable in Netlify) to fetch the language breakdown for a repository during the site's **build time**. If the API call is successful, it overrides the manually entered technologies. If it fails, it gracefully falls back to the technologies listed in the Markdown file. This creates a powerful, automated, yet resilient system.

### 2. Paginated Blog Archive

To handle a growing number of blog posts, a paginated archive was essential. Astro's built-in `paginate()` function makes this incredibly straightforward. By creating a single file, `src/pages/blog/[...page].astro`, and using the `paginate` function within `getStaticPaths`, Astro automatically generates all the necessary pages (`/blog`, `/blog/2`, etc.) at build time.

## Deployment: The Simplicity of Netlify

The entire project is deployed via Netlify. By connecting my GitHub repository to a Netlify site, a seamless Continuous Deployment (CD) pipeline is established. Every `git push` to the `main` branch automatically triggers a new build and deployment on Netlify's high-performance Edge network. There are no complex YAML files or manual steps required—it just works.

## Conclusion

Building this site was a journey through modern frontend development. The final stack—Astro for the framework, Content Collections for data, and Netlify for deployment—has proven to be incredibly powerful, fast, and stable. While the path had its challenges, especially when experimenting with external CMS solutions, the final architecture is a testament to the power of simplicity and well-integrated tools.