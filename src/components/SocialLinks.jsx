import { profile } from '../data/content'
import { FacebookIcon, GithubIcon, Icon, LinkedinIcon, TiktokIcon } from './Icons'

const items = [
  { href: profile.socials.github, label: 'GitHub', icon: <GithubIcon /> },
  { href: profile.socials.linkedin, label: 'LinkedIn', icon: <LinkedinIcon /> },
  { href: profile.socials.facebook, label: 'Facebook', icon: <FacebookIcon /> },
  { href: profile.socials.tiktok, label: 'TikTok', icon: <TiktokIcon /> },
  { href: `mailto:${profile.email}`, label: 'Email', icon: <Icon name="mail" /> },
]

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target={s.href.startsWith('mailto') ? undefined : '_blank'}
          rel="noreferrer"
          aria-label={s.label}
          className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition hover:border-indigo-500 hover:text-fg"
        >
          {s.icon}
        </a>
      ))}
    </div>
  )
}
