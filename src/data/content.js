// Central place for all portfolio content — edit this file to update the site.

export const profile = {
  name: 'Ali Raza',
  title: 'Software Engineer',
  roles: [
    'Senior Software Engineer',
    'Fullstack Developer',
    'DevOps Engineer',
    'Backend Developer',
    'Frontend Developer',
  ],
  tagline: 'I build fast, reliable and user-friendly web applications.',
  summary:
    'Full-stack software engineer working with Python, Django, Node.js, Next.js and TypeScript. I enjoy turning complex problems into simple, elegant and scalable solutions — from pixel-perfect interfaces to robust APIs and cloud deployments.',
  // Shown in the code card on the home page — keep each list short so lines fit the card.
  stack: {
    frontend: ['Next.js', 'React', 'TS'],
    backend: ['Python', 'Django', 'Node'],
    database: ['PostgreSQL', 'MongoDB'],
    devops: ['Docker', 'AWS', 'CI/CD'],
  },
  location: 'Pakistan',
  email: 'aliraza.devtech@gmail.com',
  phone: '+92 304 330 9005',
  available: true,
  socials: {
    github: 'https://github.com/RazaSoftwareEng',
    linkedin: 'https://www.linkedin.com/in/aliraza-software-eng/',
    facebook: 'https://www.facebook.com/aliraza.software.eng',
    tiktok: 'https://www.tiktok.com/@aliraza.software.eng',
  },
}

export const stats = [
  { value: '3+', label: 'Years experience' },
  { value: '25+', label: 'Projects delivered' },
  { value: '15+', label: 'Happy clients' },
  { value: '10+', label: 'Technologies' },
]

export const skills = [
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux', 'HTML5', 'CSS3'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'Python', 'Django'] },
  { group: 'Database', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'] },
  { group: 'Tools & DevOps', items: ['Git', 'GitHub Actions', 'Docker', 'AWS', 'Vercel', 'Linux'] },
]

export const services = [
  {
    title: 'Web Development',
    description: 'Responsive, accessible and SEO-friendly websites and web apps built with React and modern tooling.',
    icon: 'code',
  },
  {
    title: 'Backend & APIs',
    description: 'Secure, scalable REST and GraphQL APIs with Node.js, databases and authentication.',
    icon: 'server',
  },
  {
    title: 'UI / UX Implementation',
    description: 'Turning designs into clean, reusable components with attention to detail and performance.',
    icon: 'layout',
  },
]

// Live client projects — every card opens the site in a new tab.
export const projects = [
  {
    title: 'Park Lange Hotel',
    category: 'Hospitality',
    description: 'Elegant hotel website showcasing rooms, amenities, dining and gallery with a clear booking enquiry flow.',
    tags: ['Hotel', 'Room Showcase', 'Booking Enquiry'],
    url: 'https://pak-heritage-hotel.netlify.app/',
    featured: true,
  },
  {
    title: 'Stay-in Guest House',
    category: 'Hospitality',
    description: 'Warm, mobile-friendly guest house website with room details, facilities, location and easy contact options.',
    tags: ['Guest House', 'Responsive', 'Contact'],
    url: 'https://stayin-guest-house.netlify.app/',
  },
  {
    title: 'Construction Website',
    category: 'Business',
    description: 'Professional website for a construction company presenting services, completed projects and quote requests.',
    tags: ['Construction', 'Services', 'Portfolio'],
    url: 'https://build-right-constructions.netlify.app/',
  },
  {
    title: 'Fit Zone Gym',
    category: 'Business',
    description: 'Energetic gym website with membership plans, classes, trainers and a strong call-to-action to join.',
    tags: ['Fitness', 'Membership Plans', 'Landing Page'],
    url: 'https://fit-zon-gym.netlify.app/',
  },
  {
    title: 'SmileCare Dental',
    category: 'Healthcare',
    description: 'Clean dental clinic website covering treatments, the dental team, patient information and appointments.',
    tags: ['Dental Clinic', 'Treatments', 'Appointments'],
    url: 'https://smil-care-dental.netlify.app/',
  },
  {
    title: 'Real Estate Agency',
    category: 'Business',
    description: 'Property listing website for a real estate agency with featured properties, details and agent contact.',
    tags: ['Real Estate', 'Property Listings', 'Search'],
    url: 'https://real-estate-agency-pk.vercel.app/',
  },
  {
    title: 'Restaurant & Food Ordering',
    category: 'Web Apps',
    description: 'Restaurant website with an interactive menu, cart and online food ordering experience.',
    tags: ['Online Ordering', 'Menu', 'Cart'],
    url: 'https://restaurant-food-ordering-pk.vercel.app/',
    featured: true,
  },
  {
    title: 'Rizwan Stationers',
    category: 'Business',
    description: 'Business website for a stationery shop showcasing product categories, offers and store contact details.',
    tags: ['Retail', 'Product Catalog', 'Responsive'],
    url: 'https://rizwan-stationers.netlify.app/',
  },
  {
    title: 'POS Billing Software',
    category: 'Web Apps',
    description: 'Point-of-sale and billing system for a trading business with secure login, sales and invoicing.',
    tags: ['POS', 'Billing', 'Dashboard'],
    url: 'https://rizwan-global-trader-pos.vercel.app/login',
    featured: true,
  },
  {
    title: 'Umair Clinic',
    category: 'Healthcare',
    description: 'Medical clinic website presenting services, doctor information, timings and appointment contact.',
    tags: ['Clinic', 'Healthcare', 'Appointments'],
    url: 'https://umair-clinic.vercel.app/',
  },
  {
    title: 'Clinic Management System',
    category: 'Web Apps',
    description: 'Clinic management and billing software for handling patients, appointments and invoices in one place.',
    tags: ['Management System', 'Billing', 'Patients'],
    url: 'https://clinic-management-system-roan-ten.vercel.app/',
  },
  {
    title: 'Raza Clinic',
    category: 'Healthcare',
    description: 'Modern clinic website with services, specialist information and a simple way for patients to get in touch.',
    tags: ['Clinic', 'Healthcare', 'Responsive'],
    url: 'https://raza-clinic.vercel.app/',
  },
  {
    title: 'Ali Motor Sports',
    category: 'Business',
    description: 'Automotive business website showcasing vehicles, parts and services with a bold, sporty design.',
    tags: ['Automotive', 'Showcase', 'Landing Page'],
    url: 'https://ali-motor-sport-o3ex.vercel.app/',
  },
  {
    title: 'Surgical Hospital',
    category: 'Healthcare',
    description: 'Hospital website covering departments, surgical services, specialists and emergency contact information.',
    tags: ['Hospital', 'Departments', 'Specialists'],
    url: 'https://surgical-hospital.netlify.app/',
  },
  {
    title: 'Dr. Maaz Arif',
    category: 'Healthcare',
    description: 'Personal brand website for a doctor with profile, qualifications, services and appointment details.',
    tags: ['Doctor Profile', 'Personal Brand', 'Appointments'],
    url: 'https://dr-muhammad-maaz-arif.netlify.app/',
  },
]

export const experience = [
  {
    role: 'Software Engineer',
    company: 'Tech Solutions Ltd.',
    period: '2023 — Present',
    points: [
      'Lead development of customer-facing React applications used by thousands of users.',
      'Designed REST APIs in Node.js and cut average response times by 40%.',
      'Introduced CI/CD with GitHub Actions and code-review standards across the team.',
    ],
  },
  {
    role: 'Junior Web Developer',
    company: 'Digital Agency',
    period: '2022 — 2023',
    points: [
      'Built responsive websites and landing pages for 15+ clients.',
      'Converted Figma designs into reusable component libraries.',
      'Improved Lighthouse performance scores to 90+ across projects.',
    ],
  },
  {
    role: 'Freelance Developer',
    company: 'Self-employed',
    period: '2021 — 2022',
    points: [
      'Delivered custom web solutions for small businesses and startups.',
      'Managed full project lifecycle from requirements to deployment.',
    ],
  },
]

export const education = [
  {
    degree: 'BS in Software Engineering',
    school: 'University Name',
    period: '2018 — 2022',
    detail: 'Focus on software architecture, data structures, databases and web engineering.',
  },
]

export const certifications = [
  'Meta Front-End Developer Certificate',
  'AWS Cloud Practitioner Essentials',
  'MongoDB Developer Path',
]

export { posts } from './posts'
