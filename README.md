# Ali Raza — Software Engineer Portfolio

Personal portfolio built with **React + Vite + Tailwind CSS v4** and React Router.

## Pages
Home · Portfolio · Resume · Blogs (with article pages) · About · Contact Us

## Getting started
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the production build
```

## Customizing
All text content (profile, socials, skills, projects, experience, blog posts) lives in
`src/data/content.js` — edit that file to update the site.

- **Profile photo:** add an image to `public/` and replace the placeholder block in `src/pages/About.jsx`.
- **Contact form:** currently opens the visitor's email client (`mailto:`). Swap in Formspree, EmailJS or your own API in `src/pages/Contact.jsx`.
- **Deploying:** works on Vercel/Netlify out of the box. For SPA routing, configure a rewrite of all paths to `/index.html`.
