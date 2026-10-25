import { Link } from 'react-router-dom'
import { services, skills, workProcess } from '../data/content'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import { TechTag } from '../components/TechIcon'
import { Icon } from '../components/Icons'

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Services I offer"
        description="Hire a freelance full stack developer for SaaS products, custom CRMs, AI automation, web apps, business and real estate websites — serving clients in Pakistan, the UAE and the UK."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact" className="btn-primary">
            Start a Project <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
          <Link to="/portfolio" className="btn-secondary">
            See My Work
          </Link>
        </div>
      </PageHeader>

      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} detailed />
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="container-page py-8">
        <SectionHeading
          eyebrow="How I work"
          title="A simple, transparent process"
          description="Clear communication at every step, so there are no surprises on delivery."
        />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workProcess.map((step, i) => (
            <li key={step.title} className="card relative">
              <span className="font-mono text-4xl font-extrabold text-indigo-500/30">0{i + 1}</span>
              <h3 className="mt-3 font-semibold text-fg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Tech */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="Technologies" title="Built with a modern stack" />
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((s) => (
            <div key={s.group} className="card">
              <h3 className="font-semibold text-fg">{s.group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <TechTag key={i} name={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-600/20 via-page to-violet-600/20 px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold text-fg sm:text-4xl">Not sure which service you need?</h2>
          <p className="mx-auto mt-4 max-w-xl text-body">
            Tell me about your idea or problem, and I'll recommend the right approach for your goals.
          </p>
          <Link to="/contact" className="btn-primary mt-8">
            Let's Talk <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
