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
  tagline: 'Full stack developer building fast, reliable web apps, SaaS products and business websites.',
  summary:
    'Full stack developer and software engineer based in Lahore, Pakistan, working with Python, Django, Node.js, Next.js and TypeScript. I work remotely, on-site or on a project basis with businesses in Pakistan, the UAE, the UK and worldwide, turning complex problems into fast, secure and scalable web applications — from pixel-perfect interfaces to robust APIs and cloud deployments.',
  // Profile photo for the About page — save it as public/ali-raza.jpg (shows "AR" until it exists).
  photo: '/ali-raza.jpg',
  // Shown in the code card on the home page — keep each list short so lines fit the card.
  stack: {
    frontend: ['Next.js', 'React', 'TS'],
    backend: ['Python', 'Django', 'Node'],
    database: ['PostgreSQL', 'MongoDB'],
    devops: ['Docker', 'AWS', 'CI/CD'],
  },
  location: 'Lahore, Pakistan',
  workTypes: ['Remote', 'On-site', 'Project-based'],
  email: 'aliraza.devtech@gmail.com',
  phone: '+92 304 330 9005',
  available: true,
  // Number used for the WhatsApp button (country code, no + or spaces).
  whatsapp: '923043309005',
  // CV file served from /public — replace public/Ali-Raza-CV.pdf with your latest CV anytime.
  cv: '/Ali-Raza-CV.pdf',
  socials: {
    github: 'https://github.com/RazaSoftwareEng',
    instagram: 'https://www.instagram.com/aliraza.software.eng',
    linkedin: 'https://www.linkedin.com/in/aliraza-software-eng/',
    facebook: 'https://www.facebook.com/aliraza.software.eng',
    tiktok: 'https://www.tiktok.com/@aliraza.software.eng',
  },
}

export const stats = [
  { value: '3+', label: 'Years experience' },
  { value: '100+', label: 'Projects delivered' },
  { value: '15+', label: 'Happy clients' },
  { value: '10+', label: 'Technologies' },
]

export const skills = [
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux', 'HTML5', 'CSS3'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'Python', 'Django', 'WordPress'] },
  { group: 'Database', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'] },
  { group: 'Tools & DevOps', items: ['Git', 'GitHub Actions', 'Docker', 'AWS', 'Vercel', 'Linux'] },
]

export { services } from './services'

export const workProcess = [
  { title: 'Discover', text: 'We discuss your goals, users and requirements, and agree on scope and priorities.' },
  { title: 'Design & Plan', text: 'I plan the architecture, structure and user flows before writing production code.' },
  { title: 'Develop', text: 'I build in small, reviewable steps and share progress regularly so you always know where things stand.' },
  { title: 'Launch & Support', text: 'I deploy, test in production and stay available for fixes, updates and new features.' },
]

// Live client projects — newest first; every card opens the site in a new tab.
// featured: true → also shown on the home page.
export const projects = [
  // Latest projects
  {
    title: 'GuestFlow Pro',
    category: 'Hospitality',
    description: 'Digital concierge platform showcasing handpicked luxury and boutique hotels across the UK.',
    tags: ['Hotels', 'Digital Concierge', 'Travel'],
    url: 'https://guestflowpro.com/hotels',
    featured: true,
  },
  {
    title: 'Amica Connect',
    category: 'Web Apps',
    description: 'UK care recruitment platform where care workers apply for jobs directly and providers hire verified staff with no agency fees.',
    tags: ['Recruitment', 'Job Platform', 'Care Sector'],
    url: 'https://www.amicaconnect.com/',
    featured: true,
  },
  {
    title: 'Maira Textile',
    category: 'Business',
    description: 'Corporate website for a textile business presenting the company, its products and contact details.',
    tags: ['Textile', 'Corporate', 'Responsive'],
    url: 'https://mairatextile.com/',
  },
  {
    title: 'Selections Technologies',
    category: 'Business',
    description: 'Website for a UK IT company offering AI automation, chatbots, web development and custom software.',
    tags: ['IT Services', 'AI Automation', 'Corporate'],
    url: 'https://selectionstechnologies.com/',
  },
  {
    title: 'Dodo Pizza Dubai',
    category: 'Hospitality',
    description: 'Pizza ordering website for Dodo Pizza in Dubai with menu browsing and home delivery ordering.',
    tags: ['Food Ordering', 'Restaurant', 'Delivery'],
    url: 'https://dodopizza.ae/dubai',
  },
  {
    title: 'House of Kabila',
    category: 'Business',
    description: 'Brand website for House of Kabila, presenting its new look and identity.',
    tags: ['Brand', 'Landing Page', 'Responsive'],
    url: 'https://houseofkabila.com/',
  },
  {
    title: 'The Maine Group',
    category: 'Hospitality',
    description: 'Website for a collection of iconic restaurants and beach clubs across Dubai, London and Ibiza.',
    tags: ['Restaurants', 'Beach Clubs', 'Hospitality Group'],
    url: 'https://themainegroup.com/',
    featured: true,
  },
  {
    title: 'Soul Kitchen DXB',
    category: 'Hospitality',
    description: 'Restaurant website for Soul Kitchen in Dubai.',
    tags: ['Restaurant', 'Dubai', 'Responsive'],
    url: 'https://soulkitchendxb.com/',
  },
  {
    title: "Harat's",
    category: 'Hospitality',
    description: "Website for Harat's Republic, an Irish pub in Dubai.",
    tags: ['Pub & Dining', 'Dubai', 'Responsive'],
    url: 'https://harats.ae/',
  },
  {
    title: 'The Property Agent',
    category: 'Real Estate',
    description: 'Website for an estate agency in Totteridge, London, with property listings and agent contact.',
    tags: ['Estate Agency', 'London', 'Listings'],
    url: 'https://propertyagent.co.uk/',
  },
  {
    title: 'Metropolitan Wharf',
    category: 'Real Estate',
    description: 'Property website for Metropolitan Wharf in London.',
    tags: ['Property', 'London', 'Responsive'],
    url: 'https://www.metropolitanwharf.com/',
  },
  {
    title: 'MyUKPA',
    category: 'Real Estate',
    description: 'Website for rent guarantee and property investment specialists managing hundreds of UK properties for landlords.',
    tags: ['Property Management', 'Rent Guarantee', 'UK'],
    url: 'https://www.myukpa.com/',
  },
  {
    title: 'Real Estates WSP',
    category: 'Real Estate',
    description: 'Website for an independent estate agency in Woodside Park and Totteridge, London.',
    tags: ['Estate Agency', 'London', 'Listings'],
    url: 'https://www.realestates-wsp.co.uk/',
  },
  {
    title: 'Unique Property Company',
    category: 'Real Estate',
    description: 'Website for a London agency specialising in one-of-a-kind homes to buy or rent, from warehouse conversions to listed buildings.',
    tags: ['Estate Agency', 'London', 'Property Search'],
    url: 'https://uniquepropertycompany.co.uk/',
  },
  {
    title: 'Lodhi Real Estate',
    category: 'Real Estate',
    description: 'Website for trusted real estate consultants in Lahore.',
    tags: ['Real Estate', 'Lahore', 'Consultancy'],
    url: 'https://lodhirealestate.com/',
  },
  {
    title: 'Zalmi Marketing',
    category: 'Business',
    description: 'Business website for Zalmi Marketing.',
    tags: ['Marketing', 'Corporate', 'Responsive'],
    url: 'https://www.thezalmimarketing.com/',
  },
  {
    title: 'Ellahi Associates',
    category: 'Real Estate',
    description: 'Website for real estate partners offering residential and commercial property opportunities in Lahore.',
    tags: ['Real Estate', 'Lahore', 'Commercial'],
    url: 'https://ellahiassociates.com/',
  },
  {
    title: 'Anaya Star Properties',
    category: 'Real Estate',
    description: 'Website for a Dubai real estate consultancy specialising in luxury residential, commercial and branded properties.',
    tags: ['Real Estate', 'Dubai', 'Luxury'],
    url: 'https://anayastarproperties.com/',
  },
  {
    title: 'District Real Estate',
    category: 'Real Estate',
    description: 'UAE property advisory platform to buy, sell, lease and invest in Abu Dhabi and Dubai.',
    tags: ['Property Advisory', 'Abu Dhabi', 'Dubai'],
    url: 'https://www.districtuae.com/',
  },
  {
    title: "Christie's Real Estate Dubai",
    category: 'Real Estate',
    description: "Website for Christie's International Real Estate Dubai, a luxury property agency in the UAE.",
    tags: ['Luxury Real Estate', 'Dubai', 'Listings'],
    url: 'https://www.christiesrealestatedubai.com/',
  },
  {
    title: 'Kharz',
    category: 'Real Estate',
    description: 'Dubai property website with verified apartments, villas and commercial properties to buy or invest in.',
    tags: ['Real Estate', 'Dubai', 'Investment'],
    url: 'https://dubai.kharz.ae/',
  },
  {
    title: 'White & Co Real Estate',
    category: 'Real Estate',
    description: 'Website for a Dubai real estate brokerage to buy, rent or sell property.',
    tags: ['Brokerage', 'Dubai', 'Listings'],
    url: 'https://whiteandcogroup.com/',
  },
  {
    title: 'Coldwell Banker UAE',
    category: 'Real Estate',
    description: 'Real estate website to find luxury villas, apartments and investment properties across the UAE.',
    tags: ['Real Estate', 'UAE', 'Listings'],
    url: 'https://www.coldwellbanker.ae/',
  },
  {
    title: 'Dubai International Real Estate',
    category: 'Real Estate',
    description: 'Website showcasing luxury properties and developments in Ras Al Khaimah and beyond.',
    tags: ['Luxury Property', 'Ras Al Khaimah', 'Developments'],
    url: 'https://dubaiire.ae/',
  },
  {
    title: 'Impressive Real Estate',
    category: 'Real Estate',
    description: 'Dubai real estate company website to buy, sell or rent apartments, villas and commercial property.',
    tags: ['Real Estate', 'Dubai', 'Listings'],
    url: 'https://impressiverealestate.net/',
  },
  {
    title: 'Next Level Real Estate',
    category: 'Real Estate',
    description: 'Website for a Dubai real estate agency helping clients buy, sell and rent properties.',
    tags: ['Real Estate', 'Dubai', 'Agency'],
    url: 'https://www.nextlevelrealestate.ae/',
  },
  {
    title: 'Homeland Realty',
    category: 'Real Estate',
    description: 'Website for a Dubai real estate company offering villas, apartments and guidance for investors and homebuyers.',
    tags: ['Real Estate', 'Dubai', 'Investment'],
    url: 'https://www.homeland.ae/',
  },
  {
    title: 'Provident Estate',
    category: 'Real Estate',
    description: 'Website for a Dubai real estate agency covering sales, rentals, mortgages and property management.',
    tags: ['Real Estate', 'Dubai', 'Property Services'],
    url: 'https://providentestate.com/',
  },

  // Earlier projects
  {
    title: 'Park Lange Hotel',
    category: 'Hospitality',
    description: 'Elegant hotel website showcasing rooms, amenities, dining and gallery with a clear booking enquiry flow.',
    tags: ['Hotel', 'Room Showcase', 'Booking Enquiry'],
    url: 'https://pak-heritage-hotel.netlify.app/',
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
    category: 'Real Estate',
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
  // From LinkedIn. start/end are 'YYYY-MM'; end: null means "Present" (duration is calculated automatically).
  {
    role: 'Full Stack Engineer',
    company: 'Al Merak Tax & Accounting Services',
    type: 'Full-time',
    location: 'United Arab Emirates · Remote',
    start: '2026-01',
    end: null,
    points: [
      'Developed and maintained business websites as a Full Stack and WordPress Developer.',
      'Focused on performance, security and user experience across the company’s web platforms.',
      'Worked closely with the team to plan and implement new features and improvements.',
    ],
    skills: ['Next.js', 'Tailwind CSS', 'WordPress'],
  },
  {
    role: 'Full Stack Engineer',
    company: 'Amica Connect Technologies',
    type: 'Full-time',
    location: 'Lahore District, Punjab, Pakistan · On-site',
    start: '2024-11',
    end: '2025-10',
    points: [
      'Built and maintained web applications as a full stack engineer, with a strong focus on Next.js and front-end development.',
      'Contributed to learning, building and problem-solving across the product as part of the engineering team.',
    ],
    skills: ['Next.js', 'Front-End Development'],
  },
  {
    role: 'Web Developer',
    company: 'Vital Digital Marketing',
    start: '2023-01',
    end: '2024-10',
    points: [
      'Developed and maintained websites for the company and its clients.',
      'Built responsive, user-friendly pages and kept sites updated and running smoothly.',
    ],
  },
]

export const education = [
  {
    degree: 'Bachelor of Science in Computer Science (BSCS)',
    school: 'Virtual University of Pakistan, Lahore',
    period: 'Nov 2020 — Dec 2024',
  },
  {
    degree: 'Intermediate in Computer Science (ICS)',
    school: 'Govt. Graduate Boys College, Lahore',
    period: 'Completed Aug 2020',
  },
]

export const certifications = [
  'Meta Front-End Developer Certificate',
  'AWS Cloud Practitioner Essentials',
  'MongoDB Developer Path',
]

export { posts } from './posts'
