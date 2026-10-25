import { certifications, education, experience, profile, skills } from '../data/content'
import PageHeader from '../components/PageHeader'
import { TechTag } from '../components/TechIcon'
import { openCv } from '../lib/openCv'
import { Icon } from '../components/Icons'

const monthName = (ym) =>
  new Date(`${ym}-01T00:00:00`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

const formatPeriod = (start, end) => `${monthName(start)} — ${end ? monthName(end) : 'Present'}`

// LinkedIn-style duration, counting both the start and end month (e.g. "2 yrs 10 mos").
function formatDuration(start, end) {
  const [sy, sm] = start.split('-').map(Number)
  const now = new Date()
  const [ey, em] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1]
  const months = (ey - sy) * 12 + (em - sm) + 1
  const y = Math.floor(months / 12)
  const m = months % 12
  const part = (n, word) => (n ? `${n} ${word}${n > 1 ? 's' : ''}` : '')
  return [part(y, 'yr'), part(m, 'mo')].filter(Boolean).join(' ')
}

function Timeline({ items, render }) {
  return (
    <ol className="relative space-y-8 border-l border-line pl-6">
      {items.map((item, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-indigo-500 bg-page" />
          {render(item)}
        </li>
      ))}
    </ol>
  )
}

export default function Resume() {
  return (
    <>
      <PageHeader eyebrow="Resume" title={`${profile.name} — ${profile.title}`} description={profile.summary}>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-2"><Icon name="mail" className="h-4 w-4" /> {profile.email}</span>
          <span className="flex items-center gap-2"><Icon name="phone" className="h-4 w-4" /> {profile.phone}</span>
          <span className="flex items-center gap-2"><Icon name="location" className="h-4 w-4" /> {profile.location}</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 print:hidden">
          <a href={profile.cv} onClick={(e) => openCv(e, profile.cv)} className="btn-primary">
            <Icon name="download" className="h-4 w-4" /> Download CV
          </a>
          <button type="button" onClick={() => window.print()} className="btn-secondary">
            Print this page
          </button>
        </div>
      </PageHeader>

      <section className="container-page grid gap-12 py-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-12">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-fg">Work Experience</h2>
            <Timeline
              items={experience}
              render={(job) => (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-fg">{job.role}</h3>
                    <span className="font-mono text-xs text-accent">
                      {formatPeriod(job.start, job.end)} · {formatDuration(job.start, job.end)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-body">
                    {job.company}
                    {job.type && ` · ${job.type}`}
                  </p>
                  {job.location && (
                    <p className="flex items-center gap-1.5 text-xs text-faint">
                      <Icon name="location" className="h-3.5 w-3.5" /> {job.location}
                    </p>
                  )}
                  <ul className="mt-3 space-y-2">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-2 text-sm leading-relaxed text-body">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  {job.skills?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.skills.map((s) => (
                        <TechTag key={s} name={s} />
                      ))}
                    </div>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-bold text-fg">Education</h2>
            <Timeline
              items={education}
              render={(ed) => (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-fg">{ed.degree}</h3>
                    <span className="font-mono text-xs text-accent">{ed.period}</span>
                  </div>
                  {ed.school && <p className="text-sm text-muted">{ed.school}</p>}
                  {ed.detail && <p className="mt-2 text-sm text-body">{ed.detail}</p>}
                </>
              )}
            />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card">
            <h2 className="mb-5 text-xl font-bold text-fg">Skills</h2>
            <div className="space-y-5">
              {skills.map((s) => (
                <div key={s.group}>
                  <p className="mb-2 text-sm font-semibold text-body">{s.group}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((i) => (
                      <TechTag key={i} name={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h2 className="mb-4 text-xl font-bold text-fg">Certifications</h2>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-body">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" /> {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h2 className="mb-4 text-xl font-bold text-fg">Languages</h2>
            <ul className="space-y-2 text-sm text-body">
              <li className="flex justify-between"><span>English</span><span className="text-faint">Professional</span></li>
              <li className="flex justify-between"><span>Urdu</span><span className="text-faint">Native</span></li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  )
}
