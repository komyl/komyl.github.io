# Personal Website & Digital Garden

This is the repository for my personal website, portfolio, and blog, currently live at **[komyl.com](https://www.komyl.com)**. This project is built from the ground up with [Astro](https://astro.build/) and serves as my digital home—a place to share my work, thoughts, and interests.

The design philosophy is rooted in clarity and simplicity, drawing inspiration from Apple's Human Interface Guidelines to create a clean, accessible, and modern user experience.

---

## ✨ Core Features

- **Fully Responsive Design:** A clean layout that adapts to all screen sizes, from mobile to desktop.
- **Dual-Theme System:** A persistent Light/Dark mode that respects the user's OS preference and remembers their choice.
- **"Glassmorphism" UI:** A modern, layered design aesthetic using blur and transparency effects.
- **Content-Driven:** All project and blog content is managed through local Markdown files in `src/content/`, powered by Astro's Content Collections, making it fast, secure, and version-controlled.
- **Paginated Blog Archive:** A dedicated archive page lists all posts with pagination for easy navigation.
- **Automated Deployments:** Continuous deployment is set up via Netlify, triggering a new build on every `git push` to the `main` branch.

---

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** Plain CSS with a custom design token system (CSS Variables)
- **Deployment & Hosting:** [Netlify](https://www.netlify.com/)
- **Icons:** [Simple Icons](https://simpleicons.org/)

---

## 🚀 Getting Started (Local Development)

To clone and run this project on your local machine, follow these steps.

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed on your system.

### 2. Clone the Repository

```bash
git clone [https://github.com/komyl/komyl.github.io.git](https://github.com/komyl/komyl.github.io.git)
cd komyl.github.io  
```

### 3. Install Dependencies

Install all the necessary packages defined in package.json.

```bash 
npm install
```

### 4. Run the Development Server
Start the local development server. This will make the site available at http://localhost:4321.

```bash
npm run dev
```
The site will automatically reload as you make changes to the files.

### 📝 How Content is Managed

This project uses Astro's native Content Collections for all content. This provides full type-safety and a great developer experience.

To add a new blog post: Create a new .md or .mdx file inside the src/content/blog/ directory.
To add a new project: Create a new .md or .mdx file inside the src/content/projects/ directory.
The required structure and fields for the frontmatter of these files are strictly defined in the src/content/config.ts file. Any deviation from this schema will result in a build-time error, ensuring data consistency.

### 🌐 Deployment

This site is configured for continuous deployment on Netlify. Every git push to the main branch will automatically trigger a new build and deploy the changes to the live production site. There are no manual deployment steps required.

---

## 🤝 Contributing

Contributions are welcome! Since this is a personal project, I appreciate any new ideas or improvements. Feel free to open an issue to discuss what you would like to change or submit a pull request.

---

## 📜 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---

## ✍️ Authors

This project was developed by **Komeyl Kalhorinia**. You can reach me at [komylfa@gmail.com](mailto:komylfa@gmail.com) for any inquiries.

---

<p align="center">
  Made with ❤️ by Komeyl Kalhorinia
</p>