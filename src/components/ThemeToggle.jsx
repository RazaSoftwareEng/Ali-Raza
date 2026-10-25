import { useState } from 'react'
import { Icon } from './Icons'

// Dark is the default; the visitor's choice is remembered (see the inline script in index.html).
export default function ThemeToggle() {
  // During build-time pre-rendering there is no document; dark is the default.
  const [dark, setDark] = useState(() =>
    typeof document === 'undefined' ? true : document.documentElement.classList.contains('dark'),
  )

  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      // Storage may be blocked — the toggle still works for this visit.
    }
    setDark(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={dark ? 'Dark mode: on' : 'Dark mode: off'}
      className="relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border border-line-strong bg-subtle transition hover:border-faint focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
    >
      <span
        className={`grid h-6 w-6 place-items-center rounded-full shadow transition-transform duration-300 ${
          dark ? 'translate-x-7 bg-indigo-600 text-white' : 'translate-x-1 bg-white text-amber-500'
        }`}
      >
        <Icon name={dark ? 'moon' : 'sun'} className="h-3.5 w-3.5" />
      </span>
    </button>
  )
}
