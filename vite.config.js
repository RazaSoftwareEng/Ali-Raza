import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const SITE_URL = 'https://ali-raza-software-eng.netlify.app'

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/portfolio', priority: '0.9', changefreq: 'monthly' },
  { path: '/resume', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
]

// Reads slug + date of every blog post from src/data/posts/index.js.
function blogPosts() {
  const source = readFileSync(new URL('./src/data/posts/index.js', import.meta.url), 'utf8')
  return [...source.matchAll(/slug:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'/g)].map(([, slug, date]) => ({ slug, date }))
}

// Reads the slug of every service from src/data/services.js.
function serviceSlugs() {
  const source = readFileSync(new URL('./src/data/services.js', import.meta.url), 'utf8')
  return [...source.matchAll(/slug:\s*'([^']+)'/g)].map(([, slug]) => slug)
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = [
    ...pages.map((p) => ({ loc: SITE_URL + p.path, lastmod: today, ...p })),
    ...serviceSlugs().map((slug) => ({
      loc: `${SITE_URL}/services/${slug}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    })),
    ...blogPosts().map((p) => ({
      loc: `${SITE_URL}/blogs/${p.slug}`,
      lastmod: p.date,
      changefreq: 'monthly',
      priority: '0.6',
    })),
  ]
  const entries = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
}

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`

// Generates sitemap.xml and robots.txt on build, and serves them in dev.
function seoFiles() {
  return {
    name: 'seo-files',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/sitemap.xml') return res.setHeader('Content-Type', 'application/xml').end(buildSitemap())
        if (req.url === '/robots.txt') return res.setHeader('Content-Type', 'text/plain').end(robots)
        next()
      })
    },
    generateBundle() {
      if (this.environment?.config?.build?.ssr) return // only for the client build
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFiles()],
})
