// Runs after `vite build`: writes a fully rendered HTML file for every route
// (dist/index.html, dist/services.html, dist/blogs/<slug>.html, …) with that page's
// title, meta tags and structured data. Netlify serves /services from services.html.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = resolve('dist')
const ssrDir = resolve('dist-ssr')
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const { render, routes } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)

for (const url of routes) {
  const { html, head } = render(url)
  const page = template
    .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  const file = resolve(dist, url === '/' ? 'index.html' : `${url.slice(1)}.html`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page)
}

rmSync(ssrDir, { recursive: true, force: true })
console.log(`Pre-rendered ${routes.length} pages.`)
