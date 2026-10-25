import { profile } from '../data/content'
import { Icon, WhatsappIcon } from './Icons'
import { openCv } from '../lib/openCv'

const message = encodeURIComponent(`Hi ${profile.name}, I visited your portfolio and would like to discuss a project.`)

// Fixed buttons in the bottom corners: Download CV (left) and WhatsApp chat (right).
export default function FloatingActions() {
  return (
    <div className="print:hidden">
      <a
        href={profile.cv}
        onClick={(e) => openCv(e, profile.cv)}
        aria-label="Download CV"
        className="group fixed bottom-5 left-5 z-40 flex h-14 items-center gap-2 rounded-full bg-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:-translate-y-0.5 hover:bg-indigo-500 sm:px-5"
      >
        <Icon name="download" className="h-5 w-5" />
        <span className="hidden sm:inline">Download CV</span>
      </a>

      <a
        href={`https://wa.me/${profile.whatsapp}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-600/30 transition hover:-translate-y-0.5 hover:bg-[#1ebe5b]"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" aria-hidden="true" />
        <WhatsappIcon className="relative h-7 w-7" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  )
}
