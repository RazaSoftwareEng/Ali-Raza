import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { posts, profile, projects, services, skills, stats } from '../data/content'
import { Icon } from '../components/Icons'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import BlogCard from '../components/BlogCard'
import SocialLinks from '../components/SocialLinks'
import Typewriter from '../components/Typewriter'
import ServiceCard from '../components/ServiceCard'
import { TechTag } from '../components/TechIcon'

export default function Home() {
  const featured = projects.filter((p) => p.featured)
  const techList = skills.flatMap((s) => s.items)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.18),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b33_1px,transparent_1px),linear-gradient(to_bottom,#1e293b33_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="container-page relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {profile.available && (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for new opportunities
              </span>
            )}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-fg sm:text-6xl">
              Hi, I'm <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">{profile.name}</span>
            </h1>
            <p className="mt-3 h-8 font-mono text-lg text-muted sm:text-xl" aria-label={profile.roles.join(', ')}>
              &lt;<span className="text-accent-soft"><Typewriter words={profile.roles} /></span> /&gt;
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/portfolio" className="btn-primary">
                View My Work <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <Link to="/resume" className="btn-secondary">
                <Icon name="download" className="h-4 w-4" /> Resume
              </Link>
            </div>
            <SocialLinks className="mt-8" />
          </div>

          {/* Code card */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-mono text-xs text-slate-500">developer.js</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 text-slate-200">
                <code>
                  <span className="text-violet-400">const</span> <span className="text-sky-300">developer</span> = {'{'}
                  {'\n'}  name: <span className="text-emerald-300">'{profile.name}'</span>,
                  {'\n'}  role: <span className="text-emerald-300">'{profile.title}'</span>,
                  {Object.entries(profile.stack).map(([key, items]) => (
                    <Fragment key={key}>
                      {'\n'}  {key}: [
                      {items.map((item, i) => (
                        <Fragment key={item}>
                          {i > 0 && ', '}
                          <span className="text-emerald-300">'{item}'</span>
                        </Fragment>
                      ))}
                      ],
                    </Fragment>
                  ))}
                  {'\n'}  loves: <span className="text-emerald-300">'clean code'</span>,
                  {'\n'}  hireable: <span className="text-amber-300">true</span>,
                  {'\n'}{'}'};
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card text-center">
              <p className="text-3xl font-extrabold text-fg">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container-page mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="What I do" title="Services I offer" description="End-to-end development, from idea to production." />
          <Link to="/services" className="mb-10 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-soft">
            All services <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/services" className="btn-secondary">
            View More Services <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Tech */}
      <section className="container-page mt-24">
        <SectionHeading eyebrow="Tech stack" title="Tools I work with" center />
        <div className="flex flex-wrap justify-center gap-3">
          {techList.map((t) => (
            <TechTag key={t} name={t} size="lg" />
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="container-page mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Portfolio" title="Featured projects" />
          <Link to="/portfolio" className="mb-10 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-soft">
            View all <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* Latest posts */}
      <section className="container-page mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Blog" title="Latest articles" />
          <Link to="/blogs" className="mb-10 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-soft">
            All articles <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page mt-24">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-600/20 via-page to-violet-600/20 px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold text-fg sm:text-4xl">Have a project in mind?</h2>
          <p className="mx-auto mt-4 max-w-xl text-body">
            I'm currently open to freelance work and full-time roles. Let's build something great together.
          </p>
          <Link to="/contact" className="btn-primary mt-8">
            Let's Talk <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
