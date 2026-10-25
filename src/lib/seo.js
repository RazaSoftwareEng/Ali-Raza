import { posts, profile, services, skills } from '../data/content'

// Change this one value if you move to a custom domain (also update vite.config.js).
export const SITE_URL = 'https://ali-raza-software-eng.netlify.app'
// Share banner (1200x630 JPEG, kept under ~300 KB so WhatsApp shows it).
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`
const PHOTO = `${SITE_URL}/ali-raza.jpg`
const SITE_NAME = 'Ali Raza — Full Stack Developer'

// Approved keywords, grouped by intent.
const NAME = [
  'Ali Raza',
  'Ali Raza software engineer',
  'Ali Raza full stack developer',
  'Ali Raza web developer',
  'Ali Raza developer portfolio',
  'Ali Raza Next.js developer',
  'Ali Raza Python Django developer',
  'Ali Raza software engineer Lahore',
  'Ali Raza full stack developer Pakistan',
]
const HIRE = [
  'hire full stack developer',
  'freelance full stack developer',
  'hire freelance web developer',
  'freelance Next.js developer',
  'hire React developer',
  'freelance Python Django developer',
  'hire Node.js developer',
  'freelance WordPress developer',
  'remote full stack developer',
]
const LOCATION = [
  'full stack developer Lahore',
  'software engineer Lahore',
  'freelance web developer Pakistan',
  'Next.js developer Pakistan',
  'web developer Dubai',
  'web developer UAE',
  'freelance web developer UK',
]
const NICHE = [
  'real estate website developer Dubai',
  'real estate website development UAE',
  'real estate website development UK',
  'restaurant website developer',
  'hotel website developer',
  'clinic management system developer',
  'POS billing software developer Pakistan',
  'custom web application development',
  'business website development',
  'WordPress website developer Lahore',
  'website speed and SEO optimization',
]

const pages = {
  '/': {
    title: 'Ali Raza | Full Stack Developer & Software Engineer',
    description:
      'Ali Raza is a full stack developer and software engineer in Lahore, Pakistan. Hire a freelance Next.js, React, Node.js and Python Django developer for your website or web app.',
    keywords: [NAME[0], NAME[1], NAME[2], HIRE[0], HIRE[1], LOCATION[0], LOCATION[2]],
    pageType: 'WebPage',
  },
  '/about': {
    title: 'About Ali Raza | Software Engineer in Lahore, Pakistan',
    description:
      'Get to know Ali Raza — a full stack developer and software engineer from Lahore, Pakistan, building fast, secure web applications for clients in Pakistan, the UAE and the UK.',
    keywords: [...NAME.slice(0, 5), NAME[7], NAME[8]],
    pageType: 'AboutPage',
  },
  '/resume': {
    title: 'Ali Raza Resume | Full Stack Developer (Next.js, Django)',
    description:
      'Resume of Ali Raza, full stack engineer: experience with Next.js, React, Node.js, Python, Django and WordPress, a BSCS from Virtual University of Pakistan, and key skills.',
    keywords: [NAME[1], NAME[2], NAME[5], NAME[6], 'Ali Raza resume', 'Ali Raza CV'],
    pageType: 'ProfilePage',
  },
  '/services': {
    title: 'Hire a Freelance Full Stack Developer | Ali Raza Services',
    description:
      'Hire Ali Raza, a freelance full stack developer, for web apps, business and real estate websites, APIs, WordPress, DevOps and SEO — serving clients in Pakistan, the UAE and the UK.',
    keywords: [...HIRE, ...LOCATION.slice(3), ...NICHE.slice(6)],
    pageType: 'WebPage',
  },
  '/portfolio': {
    title: 'Ali Raza Portfolio | Real Estate, Restaurant & Web App Projects',
    description:
      'Portfolio of Ali Raza: real estate websites in Dubai and the UK, restaurant and hotel websites, clinic management systems, POS billing software and custom web apps.',
    keywords: [NAME[4], ...NICHE.slice(0, 6)],
    pageType: 'CollectionPage',
  },
  '/blogs': {
    title: 'Blog | Web Development Tutorials by Ali Raza',
    description:
      'In-depth web development tutorials by Ali Raza on React performance, REST APIs, Docker, Git, TypeScript and Tailwind CSS — practical lessons from real projects.',
    keywords: ['Ali Raza blog', 'web development blog', ...posts.flatMap((p) => p.keywords.slice(0, 1))],
    pageType: 'CollectionPage',
  },
  '/contact': {
    title: 'Contact Ali Raza | Hire a Full Stack Developer',
    description:
      'Contact Ali Raza to hire a freelance full stack developer. Get in touch by email, phone or WhatsApp to discuss your website, web app or software project.',
    keywords: [HIRE[0], HIRE[2], 'contact Ali Raza', NAME[2], LOCATION[2]],
    pageType: 'ContactPage',
  },
}

export function getSeo(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (pages[path]) return { ...pages[path], path, type: 'website' }

  const serviceSlug = path.match(/^\/services\/([^/]+)$/)?.[1]
  const service = serviceSlug && services.find((s) => s.slug === serviceSlug)
  if (service) {
    return {
      title: service.seoTitle,
      description: service.seoDescription,
      keywords: [...service.keywords, 'Ali Raza'],
      path,
      type: 'website',
      pageType: 'Service',
      service,
    }
  }

  const slug = path.match(/^\/blogs\/([^/]+)$/)?.[1]
  const post = slug && posts.find((p) => p.slug === slug)
  if (post) {
    return {
      title: `${post.title} | Ali Raza`,
      description: post.excerpt,
      keywords: [...post.keywords, ...post.tags, 'Ali Raza blog'],
      path,
      type: 'article',
      pageType: 'BlogPosting',
      post,
    }
  }

  return {
    title: 'Page not found | Ali Raza',
    description: 'The page you are looking for does not exist.',
    keywords: [],
    path,
    type: 'website',
    pageType: 'WebPage',
    noindex: true,
  }
}

const absoluteUrl = (path) => SITE_URL + (path === '/' ? '/' : path)

// [attribute, name, content] for every <meta> tag on the page.
export function metaTags(seo) {
  const url = absoluteUrl(seo.path)
  const tags = [
    ['name', 'description', seo.description],
    ['name', 'keywords', seo.keywords.join(', ')],
    ['name', 'author', profile.name],
    ['name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'],
    ['property', 'og:type', seo.type],
    ['property', 'og:site_name', SITE_NAME],
    ['property', 'og:locale', 'en_US'],
    ['property', 'og:title', seo.title],
    ['property', 'og:description', seo.description],
    ['property', 'og:url', url],
    ['property', 'og:image', OG_IMAGE],
    ['property', 'og:image:secure_url', OG_IMAGE],
    ['property', 'og:image:type', 'image/jpeg'],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['property', 'og:image:alt', 'Ali Raza — Full Stack Developer & Software Engineer'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', seo.title],
    ['name', 'twitter:description', seo.description],
    ['name', 'twitter:image', OG_IMAGE],
  ]
  if (seo.post) {
    tags.push(['property', 'article:published_time', seo.post.date], ['property', 'article:author', profile.name])
  }
  return tags
}

// schema.org structured data: who Ali is, the website, the freelance service, and this page.
export function structuredData(seo) {
  const url = absoluteUrl(seo.path)
  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: profile.name,
    jobTitle: 'Full Stack Developer & Software Engineer',
    description: profile.summary,
    url: `${SITE_URL}/`,
    image: PHOTO,
    email: `mailto:${profile.email}`,
    telephone: `+${profile.whatsapp}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Virtual University of Pakistan' },
    knowsAbout: skills.flatMap((s) => s.items),
    sameAs: Object.values(profile.socials),
  }
  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: 'en',
    publisher: { '@id': person['@id'] },
  }
  const service = {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: 'Ali Raza — Freelance Full Stack Development',
    url: `${SITE_URL}/services`,
    image: OG_IMAGE,
    email: profile.email,
    telephone: `+${profile.whatsapp}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK' },
    areaServed: ['Pakistan', 'United Arab Emirates', 'United Kingdom'].map((name) => ({ '@type': 'Country', name })),
    founder: { '@id': person['@id'] },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web development services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
          url: `${SITE_URL}/services/${s.slug}`,
        },
      })),
    },
  }
  const page = seo.service
    ? {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: seo.service.title,
        serviceType: seo.service.title,
        description: seo.description,
        url,
        image: OG_IMAGE,
        provider: { '@id': person['@id'] },
        areaServed: service.areaServed,
        isPartOf: { '@id': website['@id'] },
      }
    : seo.post
    ? {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: seo.post.title,
        description: seo.post.excerpt,
        datePublished: seo.post.date,
        dateModified: seo.post.date,
        keywords: seo.keywords.join(', '),
        image: OG_IMAGE,
        url,
        mainEntityOfPage: url,
        author: { '@id': person['@id'] },
        publisher: { '@id': person['@id'] },
        isPartOf: { '@id': website['@id'] },
      }
    : {
        '@type': seo.pageType,
        '@id': `${url}#webpage`,
        url,
        name: seo.title,
        description: seo.description,
        isPartOf: { '@id': website['@id'] },
        about: { '@id': person['@id'] },
      }
  return { '@context': 'https://schema.org', '@graph': [person, website, service, page] }
}

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Full <head> tag markup — used by the build-time pre-renderer.
export function renderHead(seo) {
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    ...metaTags(seo).map(([attr, name, content]) => `<meta ${attr}="${name}" content="${escapeHtml(content)}" />`),
    `<link rel="canonical" href="${absoluteUrl(seo.path)}" />`,
    `<script type="application/ld+json" id="ld-json">${JSON.stringify(structuredData(seo)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

// Updates <head> in the browser when the route changes (same tags as renderHead).
export function applySeo(seo) {
  document.title = seo.title
  for (const [attr, name, content] of metaTags(seo)) {
    let el = document.head.querySelector(`meta[${attr}="${name}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, name)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }
  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = absoluteUrl(seo.path)

  let ld = document.getElementById('ld-json')
  if (!ld) {
    ld = document.createElement('script')
    ld.type = 'application/ld+json'
    ld.id = 'ld-json'
    document.head.appendChild(ld)
  }
  ld.textContent = JSON.stringify(structuredData(seo))
}
