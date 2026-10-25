// Build-time entry: renders each route to HTML so search engines and social
// previews see the full page content and the correct meta tags (see scripts/prerender.mjs).
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { posts } from './data/content'
import { services } from './data/services'
import { getSeo, renderHead } from './lib/seo'

export const routes = [
  '/',
  '/services',
  ...services.map((s) => `/services/${s.slug}`),
  '/portfolio',
  '/resume',
  '/blogs',
  ...posts.map((p) => `/blogs/${p.slug}`),
  '/about',
  '/contact',
]

export function render(url) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
  return { html, head: renderHead(getSeo(url)) }
}
