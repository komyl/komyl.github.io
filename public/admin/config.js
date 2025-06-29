window.CMS_CONFIG = {
  backend: {
    name: "git-gateway",
    branch: "main",
  },
  media_folder: "src/assets/images",
  public_folder: "/assets/images",
  collections: [
    {
      name: "project",
      label: "Projects",
      folder: "src/content/projects",
      create: true,
      slug: "{{slug}}",
      fields: [
        { label: "Project Name", name: "name", widget: "string" },
        { label: "Status", name: "status", widget: "select", options: ["active", "suspended", "finished"] },
        { label: "Category", name: "category", widget: "select", options: ["Commercial", "Personal & Academic"] },
        { label: "Technologies (manual entry)", name: "technologies", widget: "list" },
        { label: "Duration", name: "duration", widget: "string", required: false },
        { label: "GitHub Repository URL", name: "repoUrl", widget: "string", required: false },
        { label: "README Content", name: "body", widget: "markdown" },
      ],
    },
    {
      name: "blog",
      label: "Blog Posts",
      folder: "src/content/blog",
      create: true,
      slug: "{{slug}}",
      fields: [
        { label: "Title", name: "title", widget: "string" },
        { label: "Publish Date", name: "pubDate", widget: "datetime" },
        { label: "Description", name: "description", widget: "text" },
        { label: "Body", name: "body", widget: "markdown" },
      ],
    },
  ],
};

// This initializes the CMS with the config object above
CMS.init({ config: window.CMS_CONFIG });