import { useState } from 'react'
import { profile } from '../data/content'
import PageHeader from '../components/PageHeader'
import SocialLinks from '../components/SocialLinks'
import { Icon } from '../components/Icons'

const initial = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Please enter a valid email.'
    if (form.message.trim().length < 10) err.message = 'Message should be at least 10 characters.'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length) return

    // No backend yet: open the visitor's email client with the message pre-filled.
    // Swap this for EmailJS, Formspree or your own API when you're ready.
    const subject = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setForm(initial)
  }

  const info = [
    { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: 'phone', label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: 'location', label: 'Location', value: profile.location },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Let's work together"
        description="Have a project, a job opportunity or just want to say hi? Send a message and I'll get back to you within 24 hours."
      />

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-4">
          {info.map((i) => (
            <div key={i.label} className="card flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-indigo-500/10 text-accent">
                <Icon name={i.icon} />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-faint">{i.label}</p>
                {i.href ? (
                  <a href={i.href} className="break-all font-medium text-fg hover:text-accent-soft">{i.value}</a>
                ) : (
                  <p className="font-medium text-fg">{i.value}</p>
                )}
              </div>
            </div>
          ))}
          <div className="card">
            <p className="mb-4 text-sm font-medium text-body">Find me online</p>
            <SocialLinks />
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
          {sent && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
              <Icon name="check" className="h-4 w-4" /> Thanks! Your email client should open to send the message.
            </div>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" error={errors.name}>
              <input name="name" value={form.name} onChange={update} className="input" placeholder="John Doe" />
            </Field>
            <Field label="Email address" error={errors.email}>
              <input name="email" type="email" value={form.email} onChange={update} className="input" placeholder="john@example.com" />
            </Field>
          </div>
          <Field label="Subject">
            <input name="subject" value={form.subject} onChange={update} className="input" placeholder="Project inquiry" />
          </Field>
          <Field label="Message" error={errors.message}>
            <textarea name="message" rows={6} value={form.message} onChange={update} className="input resize-none" placeholder="Tell me about your project..." />
          </Field>
          <button type="submit" className="btn-primary w-full sm:w-auto">
            Send Message <Icon name="arrowRight" className="h-4 w-4" />
          </button>
        </form>
      </section>
    </>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-body">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-600 dark:text-rose-400">{error}</span>}
    </label>
  )
}
