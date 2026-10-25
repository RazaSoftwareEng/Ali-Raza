import {
  siCss,
  siDjango,
  siDocker,
  siExpress,
  siFirebase,
  siGit,
  siGithubactions,
  siGooglesearchconsole,
  siGraphql,
  siHtml5,
  siJavascript,
  siLighthouse,
  siLinux,
  siMongodb,
  siMysql,
  siNetlify,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siRedux,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWordpress,
} from 'simple-icons'
import { Icon } from './Icons'

// Technology name (as written in content.js) → official brand logo.
const brands = {
  React: siReact,
  'Next.js': siNextdotjs,
  TypeScript: siTypescript,
  TS: siTypescript,
  JavaScript: siJavascript,
  'Tailwind CSS': siTailwindcss,
  Redux: siRedux,
  HTML5: siHtml5,
  CSS3: siCss,
  'Node.js': siNodedotjs,
  Node: siNodedotjs,
  Express: siExpress,
  GraphQL: siGraphql,
  Python: siPython,
  Django: siDjango,
  WordPress: siWordpress,
  PHP: siPhp,
  MongoDB: siMongodb,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  Redis: siRedis,
  Firebase: siFirebase,
  Git: siGit,
  'GitHub Actions': siGithubactions,
  Docker: siDocker,
  Vercel: siVercel,
  Netlify: siNetlify,
  Linux: siLinux,
  Lighthouse: siLighthouse,
  'Search Console': siGooglesearchconsole,
}

// Technologies without a brand logo get a generic icon.
const generic = {
  'REST APIs': 'server',
  AWS: 'cloud',
  'CI/CD': 'layers',
  'Front-End Development': 'layout',
}

// Very dark brand colors (e.g. Next.js, Express) would vanish on the dark theme,
// so those use the current text color instead.
function isDark(hex) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.2
}

export function TechIcon({ name, className = 'h-4 w-4' }) {
  const brand = brands[name]
  if (!brand) return <Icon name={generic[name] ?? 'code'} className={`${className} text-accent`} />
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={isDark(brand.hex) ? 'currentColor' : `#${brand.hex}`}
      aria-hidden="true"
    >
      <path d={brand.path} />
    </svg>
  )
}

export function TechTag({ name, size = 'sm' }) {
  return size === 'lg' ? (
    <span className="inline-flex items-center gap-2.5 rounded-lg border border-line bg-surface px-4 py-2 font-mono text-sm text-body transition hover:-translate-y-0.5 hover:border-indigo-500 hover:text-fg">
      <TechIcon name={name} className="h-5 w-5" />
      {name}
    </span>
  ) : (
    <span className="tag inline-flex items-center gap-1.5">
      <TechIcon name={name} className="h-3.5 w-3.5" />
      {name}
    </span>
  )
}
