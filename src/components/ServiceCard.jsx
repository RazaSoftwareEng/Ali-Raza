import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { TechTag } from './TechIcon'

// The whole card links to the service's detail page.
export default function ServiceCard({ service, detailed = false }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="card group flex h-full flex-col hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-indigo-500/10 text-accent transition group-hover:bg-indigo-600 group-hover:text-white">
        <Icon name={service.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-fg group-hover:text-accent">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>

      {detailed && (
        <>
          <ul className="mt-5 space-y-2">
            {service.features.slice(0, 4).map((f) => (
              <li key={f} className="flex gap-2 text-sm text-body">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
            {service.tech.map((t) => (
              <TechTag key={t} name={t} />
            ))}
          </div>
        </>
      )}

      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-accent">
        Learn more <Icon name="arrowRight" className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
