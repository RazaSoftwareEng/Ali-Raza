import { Link } from 'react-router-dom'
import { profile } from '../data/content'
import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line print:hidden">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <div className="text-center md:text-left">
          <Link to="/" className="text-lg font-bold text-fg">
            {profile.name}
            <span className="text-accent">.</span>
          </Link>
          <p className="mt-1 text-sm text-faint">{profile.title} — building for the web.</p>
        </div>
        <SocialLinks />
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-faint">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </div>
    </footer>
  )
}
