import { useState } from 'react'
import { Link } from 'react-router-dom'
import { profile, skills, stats } from '../data/content'
import PageHeader from '../components/PageHeader'
import { TechTag } from '../components/TechIcon'
import SectionHeading from '../components/SectionHeading'
import { Icon } from '../components/Icons'

const values = [
  { title: 'Clean Code', text: 'Readable, tested and maintainable code that teams can build on with confidence.' },
  { title: 'User First', text: 'Every technical decision starts with the experience of the people using the product.' },
  { title: 'Always Learning', text: 'I keep up with the ecosystem and enjoy sharing what I learn through writing.' },
  { title: 'Clear Communication', text: 'Transparent updates, realistic estimates and no surprises on delivery.' },
]

// Shows public/ali-raza.jpg; falls back to "AR" initials if the photo is missing.
function ProfilePhoto() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="relative grid aspect-[3/4] place-items-center rounded-3xl border border-line bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
        <span className="bg-gradient-to-br from-indigo-600 to-violet-600 bg-clip-text text-8xl font-extrabold text-transparent dark:from-indigo-400 dark:to-violet-400">
          AR
        </span>
      </div>
    )
  }
  return (
    <img
      src={profile.photo}
      alt={`${profile.name} — full stack developer and software engineer in ${profile.location}`}
      width="600"
      height="800"
      onError={() => setFailed(true)}
      className="relative aspect-[3/4] w-full rounded-3xl border border-line object-cover object-top shadow-2xl"
    />
  )
}

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About me" title={`About ${profile.name}`} description={profile.tagline} />

      <section className="container-page grid items-center gap-12 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-indigo-500/30 to-violet-500/20 blur-xl" />
          <ProfilePhoto />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-fg">I'm {profile.name}, a full stack developer.</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.workTypes.map((w) => (
              <span key={w} className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-accent">
                <Icon name="check" className="h-3.5 w-3.5" /> {w}
              </span>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-faint">
            <Icon name="location" className="h-4 w-4" /> Based in {profile.location} · Working with clients worldwide
          </p>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              My journey into software started with curiosity about how websites work, and quickly turned into a
              passion for building products that solve real problems. Today I work across the full stack — designing
              intuitive interfaces in React and Next.js and building robust back-end services with Node.js, Python and
              Django.
            </p>
            <p>
              I care deeply about performance, accessibility and code quality. Whether I'm collaborating with a team or
              working directly with a client, my goal is the same: deliver software that is reliable, scalable and a
              joy to use.
            </p>
            <p>
              Outside of coding, I enjoy writing technical articles, contributing to open source and exploring new
              technologies.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-fg">{s.value}</p>
                <p className="text-xs text-faint">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">Contact Me</Link>
            <Link to="/resume" className="btn-secondary">View Resume</Link>
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        <SectionHeading eyebrow="Values" title="How I work" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="card">
              <Icon name="check" className="h-6 w-6 text-accent" />
              <h3 className="mt-4 font-semibold text-fg">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading eyebrow="Skills" title="Technical expertise" />
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
    </>
  )
}
