import { Link, useParams } from 'react-router-dom'
import { profile, projects, services, workProcess } from '../data/content'
import { getService } from '../data/services'
import { Icon, WhatsappIcon } from '../components/Icons'
import { TechTag } from '../components/TechIcon'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import ServiceCard from '../components/ServiceCard'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  if (!service) return <NotFound />

  const related = service.projectCategory ? projects.filter((p) => p.category === service.projectCategory).slice(0, 3) : []
  const others = services.filter((s) => s.slug !== slug).slice(0, 3)
  const whatsapp = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
    `Hi ${profile.name}, I'm interested in your ${service.title} service.`,
  )}`

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
        <div className="container-page relative py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-faint">
            <Link to="/" className="hover:text-fg">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-fg">Services</Link>
            <span>/</span>
            <span className="text-muted">{service.title}</span>
          </nav>
          <div className="mt-8 grid h-14 w-14 place-items-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            <Icon name={service.icon} className="h-7 w-7" />
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">{service.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{service.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Get a Quote <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <WhatsappIcon className="h-4 w-4 text-[#25D366]" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Overview + included */}
      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-bold text-fg sm:text-3xl">Overview</h2>
          <div className="mt-5 space-y-4 text-[17px] leading-8 text-body">
            {service.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="card h-fit">
          <h2 className="text-lg font-semibold text-fg">What's included</h2>
          <ul className="mt-5 space-y-3">
            {service.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm text-body">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
            {service.tech.map((t) => (
              <TechTag key={t} name={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container-page py-8">
        <SectionHeading eyebrow="Why it matters" title={`Benefits of ${service.title}`} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.benefits.map((b) => (
            <div key={b.title} className="card">
              <Icon name="check" className="h-6 w-6 text-accent" />
              <h3 className="mt-4 font-semibold text-fg">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="Who it's for" title="Is this the right service for you?" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {service.useCases.map((u) => (
            <li key={u} className="card flex items-start gap-3 p-5">
              <Icon name="arrowRight" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span className="text-body">{u}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="container-page py-8">
        <SectionHeading eyebrow="How I work" title="A simple, transparent process" />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workProcess.map((step, i) => (
            <li key={step.title} className="card">
              <span className="font-mono text-4xl font-extrabold text-indigo-500/30">0{i + 1}</span>
              <h3 className="mt-3 font-semibold text-fg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="container-page py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Related work" title="Projects I've delivered" />
            <Link to="/portfolio" className="mb-10 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-soft">
              Full portfolio <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProjectCard key={p.url} project={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <div className="max-w-3xl space-y-3">
          {service.faqs.map((f) => (
            <details key={f.q} className="card group p-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-fg">
                {f.q}
                <span className="text-xl text-accent transition group-open:rotate-45">+</span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-body">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Other services */}
      <section className="container-page py-8">
        <SectionHeading eyebrow="More services" title="Other ways I can help" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pt-16">
        <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-600/20 via-page to-violet-600/20 px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold text-fg sm:text-4xl">Ready to start your {service.title} project?</h2>
          <p className="mx-auto mt-4 max-w-xl text-body">
            Tell me about your goals and I'll get back to you with a clear plan and next steps.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">
              Contact Me <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <WhatsappIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
