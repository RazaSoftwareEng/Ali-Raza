import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { formatDate, readingTime } from '../lib/blog'

export default function BlogCard({ post }) {
  return (
    <article className="card group relative flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
      <div className="flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span key={t} className="tag text-accent-soft">
            {t}
          </span>
        ))}
      </div>
      <h3 className="mt-4 text-xl font-semibold leading-snug text-fg transition group-hover:text-accent">
        {/* The stretched link makes the whole card clickable. */}
        <Link to={`/blogs/${post.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      <div className="mt-5 flex items-center justify-between text-xs text-faint">
        <span className="flex items-center gap-1.5">
          <Icon name="calendar" className="h-3.5 w-3.5" /> {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="clock" className="h-3.5 w-3.5" /> {readingTime(post)}
        </span>
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Read article <Icon name="arrowRight" className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </article>
  )
}
