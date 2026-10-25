import { useState } from 'react'
import { projects } from '../data/content'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'

const categories = ['All', ...new Set(projects.map((p) => p.category))]

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const list = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Live projects I've built"
        description="Websites and web apps built for real businesses — hotels, clinics, restaurants, retail and more. Click any project to open the live site in a new tab."
      />
      <section className="container-page py-12">
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                active === c
                  ? 'bg-indigo-600 text-white'
                  : 'border border-line-strong text-muted hover:border-faint hover:text-fg'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
