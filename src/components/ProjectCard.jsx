import { Icon } from './Icons'

const gradients = [
  'from-indigo-500/30 to-violet-500/10',
  'from-sky-500/30 to-cyan-500/10',
  'from-emerald-500/30 to-teal-500/10',
  'from-rose-500/30 to-orange-500/10',
]

export default function ProjectCard({ project, index = 0 }) {
  const initials = project.title
    .split(/[\s—&.-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — open live site in a new tab`}
      className="card group flex flex-col overflow-hidden p-0 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      <div className={`relative grid h-44 place-items-center bg-gradient-to-br ${gradients[index % gradients.length]}`}>
        <span className="font-mono text-5xl font-bold text-fg/80 transition group-hover:scale-110">{initials}</span>
        <span className="tag absolute left-4 top-4 bg-page/70">{project.category}</span>
        <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-page/70 text-fg opacity-0 transition group-hover:opacity-100">
          <Icon name="external" className="h-4 w-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-fg group-hover:text-accent">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-end border-t border-line pt-4 text-sm">
          <span className="flex items-center gap-1.5 font-semibold text-accent">
            View Live <Icon name="external" className="h-4 w-4" />
          </span>
        </div>
      </div>
    </a>
  )
}
