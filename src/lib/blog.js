import { posts } from '../data/content'

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[`*]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

export const wordCount = (post) => post.body.split(/\s+/).filter(Boolean).length

export const readingTime = (post) => `${Math.max(1, Math.round(wordCount(post) / 200))} min read`

export const getPost = (slug) => posts.find((p) => p.slug === slug)

// Parses the small Markdown subset used by the posts into renderable blocks.
export function parseMarkdown(md) {
  const blocks = []
  const ids = new Set()
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  let para = []

  const uniqueId = (text) => {
    let id = slugify(text)
    for (let n = 2; ids.has(id); n++) id = `${slugify(text)}-${n}`
    ids.add(id)
    return id
  }
  const flush = () => {
    if (para.length) blocks.push({ type: 'p', text: para.join(' ') })
    para = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('```')) {
      flush()
      const lang = line.slice(3).trim()
      const code = []
      while (++i < lines.length && !lines[i].startsWith('```')) code.push(lines[i])
      blocks.push({ type: 'code', lang, text: code.join('\n') })
    } else if (/^#{2,3} /.test(line)) {
      flush()
      const level = line.startsWith('### ') ? 'h3' : 'h2'
      const text = line.replace(/^#{2,3} /, '')
      blocks.push({ type: level, text, id: uniqueId(text) })
    } else if (line.startsWith('> ')) {
      flush()
      const quote = [line.slice(2)]
      while (lines[i + 1]?.startsWith('> ')) quote.push(lines[++i].slice(2))
      blocks.push({ type: 'callout', text: quote.join(' ') })
    } else if (/^(- |\d+\. )/.test(line)) {
      flush()
      const ordered = /^\d+\. /.test(line)
      const marker = ordered ? /^\d+\. / : /^- /
      const items = [line.replace(marker, '')]
      while (lines[i + 1] && marker.test(lines[i + 1])) items.push(lines[++i].replace(marker, ''))
      blocks.push({ type: ordered ? 'ol' : 'ul', items })
    } else if (line.trim() === '') {
      flush()
    } else {
      para.push(line.trim())
    }
  }
  flush()
  return blocks
}

// Posts sharing the most tags first, then newest.
export function getRelated(post, count = 3) {
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score || new Date(b.p.date) - new Date(a.p.date))
    .slice(0, count)
    .map(({ p }) => p)
}

// posts are sorted newest first: "newer" is the previous index, "older" the next.
export function getAdjacent(post) {
  const i = posts.findIndex((p) => p.slug === post.slug)
  return { newer: posts[i - 1], older: posts[i + 1] }
}
