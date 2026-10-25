import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { posts } from '../data/content'
import PageHeader from '../components/PageHeader'
import BlogCard from '../components/BlogCard'

const allTags = ['All', ...new Set(posts.flatMap((p) => p.tags))]

export default function Blogs() {
  // The active tag lives in the URL (?tag=React) so article tags can link straight to a filtered list.
  const [params, setParams] = useSearchParams()
  const tag = allTags.includes(params.get('tag')) ? params.get('tag') : 'All'
  const [query, setQuery] = useState('')

  const setTag = (t) => setParams(t === 'All' ? {} : { tag: t }, { replace: true })

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter(
      (p) =>
        (tag === 'All' || p.tags.includes(tag)) &&
        (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)),
    )
  }, [tag, query])

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Thoughts & tutorials"
        description="In-depth articles on React, APIs, DevOps and software engineering — practical lessons from real projects."
      />
      <section className="container-page py-12">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {allTags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag(t)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  tag === t
                    ? 'bg-indigo-600 text-white'
                    : 'border border-line-strong text-muted hover:border-faint hover:text-fg'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="input md:max-w-xs"
          />
        </div>
        {list.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-faint">No articles found.</p>
        )}
      </section>
    </>
  )
}
