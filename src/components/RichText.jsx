import { Link } from 'react-router-dom'

const TOKEN = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g

// Renders inline Markdown: [links](/path), `code` and **bold**.
// Links starting with "/" stay inside the app; others open in a new tab.
export default function RichText({ text }) {
  return text.split(TOKEN).map((part, i) => {
    if (!part) return null

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const [, label, href] = link
      return href.startsWith('/') ? (
        <Link key={i} to={href} className="link">
          {label}
        </Link>
      ) : (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="link">
          {label}
        </a>
      )
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
      return (
        <code key={i} className="rounded-md border border-line bg-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-fg">
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-fg">
          <RichText text={part.slice(2, -2)} />
        </strong>
      )
    }
    return part
  })
}
