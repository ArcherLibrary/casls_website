# CASLS Static Website

This is the source code for the official website of the **Consortium of Academic and Special Libraries of Saskatchewan (CASLS)**. It is a modern, static website built with **Vite** and **TypeScript**, designed to be fast, responsive, and easy to maintain.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [Git](https://git-scm.com/)

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/StartYourOwnSearchEngine/casls.git
    cd casls
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the local development server:**
    ```bash
    npm run dev
    ```
    Open your browser to `http://localhost:5173` to see the site. Changes will auto-reload.

---

## 📝 How to Update Content

Most content is separated from the code for easier editing.

### Updating Page Text
Edit `src/content.ts`. This file contains all the text for the website, organized by page.
- **Example:** To change the "Welcome" message on the home page, find `home: { body: ... }` and edit the text inside the backticks `` ` ``.

### Adding News/Announcements
Edit `src/content.ts` and look for the `news` section.
- Add a new item to the array:
  ```typescript
  {
    date: "January 1, 2026",
    title: "New Announcement",
    summary: "Brief description of the news item.",
    link: "#" // or an external URL
  },
  ```

### Managing Member Institutions (Cards)
To add or remove institutions on the "Member Institutions" page, edit the `membership.institutions` structure in `src/content.ts`:
```typescript
{
  name: "Institution Name",
  link: "https://institution-website.com",
  logo: "/logos/filename.jpg" // Place image in public/logos/
}
```
1.  **Add the Logo:** Drop the new logo image into `public/logos/`.
2.  **Update the List:** Add the new object to the `full` or `associate` array in `content.ts`.

---

## 🎨 Layout & Styling

- **Styles:** All CSS is located in `style.css`.
- **Colors:** Primary colors are defined as variables at the top of `style.css` (e.g., `--primary`).
- **Layout:** The site uses `renderLayout()` in `src/main.ts` to wrap content with the header and footer.

---

## 🌍 Deployment (GitHub Pages)

This site is configured to be deployed via **GitHub Pages**.

### Manual Deployment
1.  **Build the project:**
    ```bash
    npm run build
    ```
2.  **Commit and Push:**
    Ensure all your changes are committed to the `main` branch.
    ```bash
    git add .
    git commit -m "Update site content"
    git push origin main
    ```
3.  **Enable GitHub Pages:**
    - Go to your repository settings on GitHub.
    - Navigate to **Pages**.
    - Under **Build and deployment**, select **Source** as `GitHub Actions` (recommended for Vite) or `Deploy from a branch` if you configured the build output to a `gh-pages` branch.
    - *Note:* This project is a static site. Usually, you set up a GitHub Action to build and deploy the `dist/` folder.

### Recommended GitHub Action
Create a file at `.github/workflows/deploy.yml`:
```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🛠 Troubleshooting

- **Images not showing?** Make sure they are in the `public/` folder and referenced with a leading slash (e.g., `/logos/logo.png`).
- **Logo overflow on mobile?** The CSS handles responsiveness, but ensure new logos are not excessively wide images (crop them tightly).

Built by **Antigravity**.
