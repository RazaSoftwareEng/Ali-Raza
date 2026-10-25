import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { profile } from '../data/content'
import { formatDate, getAdjacent, getPost, getRelated, parseMarkdown, readingTime } from '../lib/blog'
import BlogContent from '../components/BlogContent'
import BlogCard from '../components/BlogCard'
import { Icon } from '../components/Icons'
import NotFound from './NotFound'

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 print:hidden" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-indigo-500 to-violet-500"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}

function TableOfContents({ headings }) {
  const [active, setActive] = useState(headings[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px' },
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  const jump = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
    setActive(id)
  }

  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-fg">
        <Icon name="list" className="h-4 w-4" /> On this page
      </p>
      <ul className="space-y-1 border-l border-line">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => jump(e, h.id)}
              className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition ${
                active === h.id
                  ? 'border-indigo-500 font-medium text-accent'
                  : 'border-transparent text-muted hover:border-line-strong hover:text-fg'
              }`}
            >
              {h.text.replace(/`/g, '')}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  const blocks = useMemo(() => (post ? parseMarkdown(post.body) : []), [post])
  const headings = useMemo(() => blocks.filter((b) => b.type === 'h2'), [blocks])

  if (!post) return <NotFound />

  const { newer, older } = getAdjacent(post)
  const related = getRelated(post)

  return (
    <>
      <ReadingProgress />

      {/* Header */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
        <div className="container-page relative max-w-4xl py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-faint">
            <Link to="/" className="hover:text-fg">Home</Link>
            <span>/</span>
            <Link to="/blogs" className="hover:text-fg">Blog</Link>
            <span>/</span>
            <span className="truncate text-muted">{post.tags[0]}</span>
          </nav>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Link key={t} to={`/blogs?tag=${encodeURIComponent(t)}`} className="tag text-accent-soft hover:border-indigo-500">
                {t}
              </Link>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{post.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-faint">
            <Link to="/about" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
                AR
              </span>
              <span>
                <span className="block font-semibold text-fg">{profile.name}</span>
                <span className="block text-xs">{profile.title}</span>
              </span>
            </Link>
            <span className="flex items-center gap-1.5">
              <Icon name="calendar" className="h-4 w-4" /> {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="clock" className="h-4 w-4" /> {readingTime(post)}
            </span>
          </div>
        </div>
      </header>

      {/* Body + sidebar */}
      <div className="container-page grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="min-w-0 max-w-3xl">
          {/* Mobile table of contents */}
          <details className="card mb-10 lg:hidden">
            <summary className="cursor-pointer text-sm font-semibold text-fg">On this page</summary>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm">
              {headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-muted hover:text-accent">
                    {h.text.replace(/`/g, '')}
                  </a>
                </li>
              ))}
            </ol>
          </details>

          <BlogContent blocks={blocks} />

          {/* Author box */}
          <div className="card mt-16 flex flex-col gap-5 sm:flex-row sm:items-center">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white">
              AR
            </span>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-faint">Written by</p>
              <p className="text-lg font-semibold text-fg">{profile.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {profile.title} building fast, reliable web applications. Read more{' '}
                <Link to="/about" className="link">about me</Link>, see my{' '}
                <Link to="/portfolio" className="link">projects</Link> or check my{' '}
                <Link to="/resume" className="link">resume</Link>.
              </p>
            </div>
            <Link to="/contact" className="btn-primary shrink-0">Hire Me</Link>
          </div>

          {/* Previous / next */}
          <nav aria-label="More articles" className="mt-10 grid gap-4 sm:grid-cols-2">
            {older ? (
              <Link to={`/blogs/${older.slug}`} className="card group hover:border-indigo-500/50">
                <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-faint">
                  <Icon name="arrowLeft" className="h-3.5 w-3.5" /> Previous article
                </span>
                <span className="mt-2 block font-semibold text-fg group-hover:text-accent">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link to={`/blogs/${newer.slug}`} className="card group text-right hover:border-indigo-500/50">
                <span className="flex items-center justify-end gap-1.5 text-xs uppercase tracking-wider text-faint">
                  Next article <Icon name="arrowRight" className="h-3.5 w-3.5" />
                </span>
                <span className="mt-2 block font-semibold text-fg group-hover:text-accent">{newer.title}</span>
              </Link>
            )}
          </nav>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <TableOfContents headings={headings} />
            <div className="card">
              <p className="font-semibold text-fg">Need help with a project?</p>
              <p className="mt-2 text-sm text-muted">I build fast, modern web apps and APIs.</p>
              <Link to="/contact" className="btn-primary mt-4 w-full">Let's Talk</Link>
            </div>
            <Link to="/blogs" className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-fg">
              <Icon name="arrowLeft" className="h-4 w-4" /> All articles
            </Link>
          </div>
        </aside>
      </div>

      {/* Related */}
      <section className="container-page border-t border-line pt-16">
        <h2 className="mb-8 text-2xl font-bold text-fg">Related articles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </>
  )
}
