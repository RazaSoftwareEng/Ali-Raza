// Services shown on /services and each /services/:slug detail page.
// The first 6 are also shown on the home page. `features` → first 4 appear on the cards.
// `projectCategory` pulls related live projects from the portfolio onto the detail page.
export const services = [
  {
    slug: 'full-stack-web-development',
    title: 'Full Stack Web Development',
    icon: 'layers',
    description:
      'Complete web applications built end to end — from the database and APIs to a fast, polished interface — ready for real users.',
    seoTitle: 'Full Stack Web Development Services | Hire Ali Raza',
    seoDescription:
      'Hire Ali Raza, a freelance full stack developer in Lahore, for custom web applications built with Next.js, React, Node.js and Python Django — for clients in Pakistan, the UAE and the UK.',
    keywords: [
      'full stack web development services',
      'hire full stack developer',
      'freelance full stack developer',
      'custom web application development',
      'Next.js and Django developer',
      'Ali Raza full stack developer',
    ],
    intro: [
      'A full stack developer handles every layer of your product: the user interface your customers see, the server logic that powers it, the database that stores your data, and the deployment that keeps it online. Working with one engineer across all of these means fewer handoffs, faster decisions and a product that fits together cleanly.',
      'I build complete web applications with Next.js and React on the frontend and Node.js or Python Django on the backend, backed by PostgreSQL or MongoDB. Whether you need a new product from scratch or want to extend an existing system, I focus on clean architecture, security and performance from day one.',
    ],
    features: [
      'Custom web apps and SaaS products',
      'Authentication, dashboards and admin panels',
      'Responsive on every device',
      'Clean, maintainable and documented code',
      'Third-party integrations and payments',
      'Deployment, monitoring and handover',
    ],
    benefits: [
      { title: 'One point of contact', text: 'Frontend, backend and database decisions made together, without gaps between teams.' },
      { title: 'Built to scale', text: 'A structure that supports new features and more users without a rewrite.' },
      { title: 'Fast and secure', text: 'Performance and security best practices applied from the first commit.' },
      { title: 'Easy to maintain', text: 'Readable code and documentation so your team can take it forward.' },
    ],
    useCases: [
      'Startups launching a new web product or MVP',
      'Businesses replacing spreadsheets with a custom web app',
      'Companies extending or modernizing an existing system',
      'Agencies that need a reliable full stack partner',
    ],
    faqs: [
      {
        q: 'Which technologies do you use for full stack projects?',
        a: 'Mostly Next.js and React for the frontend, Node.js or Python Django for the backend, and PostgreSQL or MongoDB for data. I choose the stack based on your project, team and budget.',
      },
      {
        q: 'Can you work on an existing codebase?',
        a: 'Yes. I can review your current application, fix issues, add features or gradually modernize it without stopping your business.',
      },
      {
        q: 'How do we get started?',
        a: 'Send me a short description of your idea or problem. We discuss goals and scope, then I share a clear plan and estimate before any development begins.',
      },
    ],
    tech: ['Next.js', 'React', 'Node.js', 'Django'],
    projectCategory: 'Web Apps',
  },
  {
    slug: 'saas-product-development',
    title: 'SaaS Product Development',
    icon: 'cloud',
    description:
      'Subscription-ready SaaS products — from MVP to scale — with user accounts, billing, dashboards and multi-tenant architecture.',
    seoTitle: 'SaaS Product Development | Hire a SaaS Developer — Ali Raza',
    seoDescription:
      'SaaS product development by Ali Raza: MVPs and full SaaS platforms with Next.js, Node.js and Django, including subscriptions, billing, multi-tenant dashboards and cloud deployment.',
    keywords: [
      'SaaS product development',
      'hire SaaS developer',
      'SaaS MVP development',
      'Next.js SaaS developer',
      'SaaS development Pakistan',
      'subscription web app development',
    ],
    intro: [
      'Software as a Service lets you sell your software to many customers on a subscription, without installing anything on their machines. Building a SaaS product well means getting more than features right: user accounts, team workspaces, plans and billing, data isolation between customers, and an onboarding flow that turns sign-ups into paying users.',
      'I help founders and businesses go from idea to a working MVP quickly, then grow it into a stable, scalable platform. I focus on the parts that matter most early on — a sharp core feature, a smooth sign-up and a reliable billing setup — while keeping the architecture ready for growth.',
    ],
    features: [
      'MVP planning and rapid development',
      'User accounts, teams and roles',
      'Subscription plans and online billing',
      'Admin and customer dashboards',
      'Multi-tenant data architecture',
      'Analytics, emails and notifications',
    ],
    benefits: [
      { title: 'Launch faster', text: 'Ship a focused MVP to real users and validate your idea before investing heavily.' },
      { title: 'Recurring revenue', text: 'Plans, trials and subscriptions built in, so you can charge from day one.' },
      { title: 'Ready to grow', text: 'An architecture that handles more customers and features without starting over.' },
      { title: 'Secure by design', text: 'Each customer’s data kept separate and protected with proper access control.' },
    ],
    useCases: [
      'Founders validating a new SaaS idea with an MVP',
      'Businesses turning an internal tool into a product they can sell',
      'Agencies offering software to their clients on subscription',
      'Existing SaaS products that need new features or a rebuild',
    ],
    faqs: [
      {
        q: 'What is an MVP and why start with one?',
        a: 'A Minimum Viable Product is the smallest version of your product that solves the core problem for real users. It lets you launch sooner, learn from feedback and spend your budget on what customers actually want.',
      },
      {
        q: 'Can you add subscriptions and online payments?',
        a: 'Yes. I integrate subscription billing with plans, trials, upgrades and invoices using established payment providers.',
      },
      {
        q: 'Will my SaaS be able to scale?',
        a: 'I design the database and architecture for growth from the start and deploy on cloud infrastructure that can scale as your customer base grows.',
      },
    ],
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    projectCategory: 'Web Apps',
  },
  {
    slug: 'custom-crm-development',
    title: 'Custom CRM Development',
    icon: 'briefcase',
    description:
      'A CRM built around how your business actually works — leads, clients, deals, follow-ups and reports in one place.',
    seoTitle: 'Custom CRM Development | CRM Software Developer — Ali Raza',
    seoDescription:
      'Custom CRM development by Ali Raza for real estate agencies, clinics and service businesses: lead tracking, sales pipelines, follow-ups, roles and reports tailored to your workflow.',
    keywords: [
      'custom CRM development',
      'CRM software developer',
      'custom CRM for real estate',
      'CRM development Pakistan',
      'hire CRM developer Dubai',
      'lead management system development',
    ],
    intro: [
      'Off-the-shelf CRMs are built for everyone, which often means they fit nobody perfectly. Teams end up paying for features they never use while working around the ones they actually need. A custom CRM is shaped around your exact sales process, your terminology and your reports.',
      'I build custom CRM systems that bring leads, clients, deals, tasks and communication into one clear dashboard. With experience building websites for many real estate agencies in Dubai and the UK, as well as clinic and business management systems, I understand the workflows these teams rely on every day.',
    ],
    features: [
      'Lead capture and tracking',
      'Visual sales pipelines and deal stages',
      'Follow-up reminders and task management',
      'Team roles and permissions',
      'Website, form and email integrations',
      'Reports and performance dashboards',
    ],
    benefits: [
      { title: 'Fits your process', text: 'Stages, fields and reports designed around how your team already works.' },
      { title: 'No lost leads', text: 'Every enquiry captured automatically, assigned and followed up on time.' },
      { title: 'No per-user fees', text: 'Own your CRM instead of paying a growing monthly fee for every seat.' },
      { title: 'Clear visibility', text: 'Real-time dashboards show sales, team performance and pipeline health.' },
    ],
    useCases: [
      'Real estate agencies managing property enquiries and viewings',
      'Clinics and healthcare providers tracking patients and appointments',
      'Service businesses handling quotes, clients and follow-ups',
      'Sales teams outgrowing spreadsheets or generic CRMs',
    ],
    faqs: [
      {
        q: 'Why choose a custom CRM over an existing one?',
        a: 'A custom CRM matches your workflow exactly, integrates with your website and tools, and avoids per-user subscription costs. It is a strong choice when generic CRMs feel too complex or too limiting.',
      },
      {
        q: 'Can the CRM capture leads from my website?',
        a: 'Yes. Website forms, landing pages and other sources can send leads straight into the CRM, where they are assigned and tracked automatically.',
      },
      {
        q: 'Can you build a CRM for a real estate agency?',
        a: 'Yes. Property enquiries, listings, viewings, agents and follow-ups are a natural fit, and I have built websites for many real estate agencies in Dubai and the UK.',
      },
    ],
    tech: ['Next.js', 'Django', 'PostgreSQL', 'REST APIs'],
    projectCategory: 'Real Estate',
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation & Chatbots',
    icon: 'gauge',
    description:
      'AI chatbots and automated workflows that answer customers, qualify leads and remove repetitive manual work.',
    seoTitle: 'AI Automation & Chatbot Development | Ali Raza',
    seoDescription:
      'AI automation services by Ali Raza: custom AI chatbots, OpenAI integrations and automated business workflows that save time, respond to customers instantly and qualify leads.',
    keywords: [
      'AI automation services',
      'AI chatbot development',
      'business process automation',
      'OpenAI integration developer',
      'AI automation developer Pakistan',
      'workflow automation for small business',
    ],
    intro: [
      'Many businesses spend hours every week on repetitive work: answering the same customer questions, copying data between tools, sending follow-ups and preparing reports. AI and automation can take over much of this work, so your team can focus on the tasks that need a human.',
      'I build practical AI solutions that connect to the tools you already use — AI chatbots trained on your business information, smart lead qualification, document and data processing, and automated workflows between your website, CRM, email and spreadsheets.',
    ],
    features: [
      'AI chatbots for websites and WhatsApp',
      'OpenAI and LLM integrations',
      'Automated lead qualification',
      'Workflow automation between your tools',
      'Document and data processing',
      'Automated reports and notifications',
    ],
    benefits: [
      { title: 'Save hours every week', text: 'Repetitive tasks handled automatically, accurately and around the clock.' },
      { title: 'Instant responses', text: 'Customers get answers in seconds instead of waiting for office hours.' },
      { title: 'More qualified leads', text: 'AI asks the right questions and passes your team the most promising enquiries.' },
      { title: 'Fewer errors', text: 'Automated data handling removes copy-and-paste mistakes.' },
    ],
    useCases: [
      'Businesses receiving many repeated customer questions',
      'Real estate and service companies qualifying incoming leads',
      'Teams moving data manually between apps and spreadsheets',
      'Companies wanting to add AI features to their product',
    ],
    faqs: [
      {
        q: 'What can an AI chatbot do for my business?',
        a: 'It can answer common questions using your own business information, capture contact details, qualify leads and hand conversations to your team when a human is needed.',
      },
      {
        q: 'Can automation work with the tools I already use?',
        a: 'In most cases, yes. I connect your website, CRM, email, spreadsheets and other apps through their APIs so data flows between them automatically.',
      },
      {
        q: 'Is my business data kept private?',
        a: 'I design every integration with data privacy in mind, share only what the AI needs to do its job, and follow the data policies of the AI providers we use.',
      },
    ],
    tech: ['Python', 'Node.js', 'OpenAI API', 'REST APIs'],
  },
  {
    slug: 'frontend-development',
    title: 'Frontend Development',
    icon: 'layout',
    description:
      'Modern, accessible user interfaces that turn designs into pixel-perfect, lightning-fast experiences.',
    seoTitle: 'Frontend Development | Hire a React & Next.js Developer — Ali Raza',
    seoDescription:
      'Hire Ali Raza, a freelance React and Next.js developer, for fast, responsive and accessible user interfaces — from Figma designs to production-ready components.',
    keywords: [
      'frontend development services',
      'hire React developer',
      'freelance Next.js developer',
      'Next.js developer Pakistan',
      'Figma to React',
      'Ali Raza Next.js developer',
    ],
    intro: [
      'Your interface is the first thing customers judge. A slow, confusing or broken frontend costs trust and sales, no matter how good the product behind it is. Great frontend development combines accurate design, smooth interactions, accessibility and speed.',
      'I turn designs into clean, reusable React and Next.js components styled with Tailwind CSS and written in TypeScript. Every interface is responsive on all devices, accessible, and optimized for Core Web Vitals so it feels instant to your users.',
    ],
    features: [
      'Figma / design to code',
      'Reusable component libraries',
      'Smooth animations and interactions',
      'Light and dark themes',
      'Accessibility best practices',
      'Core Web Vitals optimization',
    ],
    benefits: [
      { title: 'Pixel-perfect', text: 'Designs implemented accurately, on every screen size.' },
      { title: 'Lightning fast', text: 'Optimized loading and rendering for a smooth experience.' },
      { title: 'Consistent UI', text: 'A reusable component system keeps every page on brand.' },
      { title: 'SEO friendly', text: 'Next.js rendering and clean markup help search engines understand your pages.' },
    ],
    useCases: [
      'Converting Figma or Adobe XD designs into a working website',
      'Rebuilding an outdated interface with modern React',
      'Building dashboards and complex interactive screens',
      'Teams that need extra frontend capacity',
    ],
    faqs: [
      {
        q: 'Do you work from Figma designs?',
        a: 'Yes. I convert Figma designs into responsive, pixel-accurate React or Next.js components, and can also design simple interfaces when no design exists yet.',
      },
      {
        q: 'Why Next.js instead of plain React?',
        a: 'Next.js adds server rendering, routing and performance features out of the box, which makes sites faster and better for SEO.',
      },
      {
        q: 'Will the website work on mobile?',
        a: 'Every interface I build is mobile-first and tested across screen sizes and modern browsers.',
      },
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    slug: 'backend-api-development',
    title: 'Backend & API Development',
    icon: 'server',
    description:
      'Secure, scalable server-side systems and REST APIs that power web apps, mobile apps and integrations.',
    seoTitle: 'Backend & API Development | Node.js & Django Developer — Ali Raza',
    seoDescription:
      'Backend and REST API development by Ali Raza with Node.js, Express, Python and Django: secure authentication, integrations, payments and scalable server-side systems.',
    keywords: [
      'backend development services',
      'REST API development',
      'hire Node.js developer',
      'freelance Python Django developer',
      'Django developer Pakistan',
      'Ali Raza Python Django developer',
    ],
    intro: [
      'The backend is the engine of your application. It handles business logic, stores and protects data, talks to payment providers and other services, and serves your web and mobile apps through APIs. When it is well built, nobody notices it; when it is not, everything else suffers.',
      'I design and build backends and REST APIs with Node.js and Express or Python and Django, following consistent conventions for resources, errors, validation and security. The result is an API that is easy for frontend and mobile developers to use and easy for your team to maintain.',
    ],
    features: [
      'RESTful API design and documentation',
      'Authentication and role-based access',
      'Third-party and payment integrations',
      'Input validation and error handling',
      'Background jobs and scheduled tasks',
      'Performance tuning and caching',
    ],
    benefits: [
      { title: 'Secure', text: 'Authentication, authorization and validation on every endpoint.' },
      { title: 'Scalable', text: 'Efficient queries, caching and architecture that grows with your traffic.' },
      { title: 'Well documented', text: 'Clear API documentation so any developer can integrate quickly.' },
      { title: 'Reliable', text: 'Consistent error handling, logging and monitoring.' },
    ],
    useCases: [
      'Backends for web and mobile applications',
      'Integrations with payment, shipping or messaging services',
      'APIs for partners and third-party developers',
      'Migrating or refactoring a slow, fragile backend',
    ],
    faqs: [
      {
        q: 'Node.js or Django — which is better for my project?',
        a: 'Both are excellent. Node.js suits real-time and JavaScript-heavy teams; Django shines for data-rich applications and rapid admin tools. I recommend one based on your needs.',
      },
      {
        q: 'Do you document the APIs you build?',
        a: 'Yes. I provide clear documentation with endpoints, example requests and responses so your team or partners can integrate easily.',
      },
      {
        q: 'Can you integrate payment gateways?',
        a: 'Yes, I integrate payment providers along with webhooks, invoices and order handling.',
      },
    ],
    tech: ['Python', 'Django', 'Node.js', 'Express'],
    projectCategory: 'Web Apps',
  },
  {
    slug: 'business-website-development',
    title: 'Business Websites',
    icon: 'globe',
    description:
      'Professional websites for hotels, clinics, restaurants, real estate, retail and more that build trust and bring in customers.',
    seoTitle: 'Business Website Development | Real Estate, Restaurant & Hotel Websites',
    seoDescription:
      'Professional business website development by Ali Raza: real estate websites in Dubai and the UK, restaurant, hotel and clinic websites that are fast, mobile-friendly and SEO-ready.',
    keywords: [
      'business website development',
      'real estate website developer Dubai',
      'real estate website development UK',
      'restaurant website developer',
      'hotel website developer',
      'web developer Dubai',
    ],
    intro: [
      'Your website often makes the first impression on a new customer. A professional, fast and mobile-friendly website builds trust, explains your services clearly and turns visitors into enquiries, bookings and orders.',
      'I have built websites for real estate agencies in Dubai, Abu Dhabi and London, restaurants and beach clubs, hotels, clinics, retailers and service companies. Each one is designed around a clear goal — more calls, more bookings or more sales — and built to load fast and rank well on Google.',
    ],
    features: [
      'Conversion-focused page design',
      'Contact, booking and enquiry forms',
      'Online ordering and catalogs',
      'Easy-to-update content',
      'On-page SEO and fast loading',
      'WhatsApp and social media integration',
    ],
    benefits: [
      { title: 'More enquiries', text: 'Clear calls to action and forms that turn visitors into leads.' },
      { title: 'Trusted brand', text: 'A professional design that reflects the quality of your business.' },
      { title: 'Found on Google', text: 'SEO-friendly structure, speed and content from launch.' },
      { title: 'Mobile first', text: 'Looks and works great on every phone, tablet and desktop.' },
    ],
    useCases: [
      'Real estate agencies and property developers',
      'Restaurants, cafés, hotels and beach clubs',
      'Clinics, hospitals and doctors',
      'Retail shops, gyms and local service businesses',
    ],
    faqs: [
      {
        q: 'Have you built real estate websites before?',
        a: 'Yes — many, for agencies in Dubai, Abu Dhabi, Ras Al Khaimah and London. You can see them in my portfolio.',
      },
      {
        q: 'Will my website be optimized for Google?',
        a: 'Yes. Every website includes on-page SEO basics: page titles, descriptions, fast loading, mobile-friendliness, sitemaps and clean structure.',
      },
      {
        q: 'Can I update the website content myself?',
        a: 'Yes. I can build on a content management system or provide simple editing so you can update text, images and listings without a developer.',
      },
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'WordPress'],
    projectCategory: 'Real Estate',
  },
  {
    slug: 'business-management-systems',
    title: 'Business Management Systems',
    icon: 'database',
    description:
      'Custom software that runs day-to-day operations — like the POS billing and clinic management systems in my portfolio.',
    seoTitle: 'POS, Billing & Clinic Management System Development | Ali Raza',
    seoDescription:
      'Custom business management software by Ali Raza: POS billing systems, clinic management systems, inventory and invoicing tools built for businesses in Pakistan, the UAE and the UK.',
    keywords: [
      'clinic management system developer',
      'POS billing software developer Pakistan',
      'inventory management system development',
      'custom business software development',
      'billing software developer',
      'custom web application development',
    ],
    intro: [
      'Many businesses still run on paper registers, spreadsheets and disconnected tools. That leads to errors, lost data and hours of manual work every week. A custom management system brings sales, billing, stock, patients or appointments into one secure place.',
      'I build web-based management systems tailored to how your business operates — including POS billing software for retail and trading businesses and clinic management systems for healthcare providers. They run in the browser, work on any device and give owners real-time reports.',
    ],
    features: [
      'POS, billing and invoicing',
      'Clinic and appointment management',
      'Inventory and sales reporting',
      'Secure multi-user access',
      'Printable receipts and invoices',
      'Data backups and export',
    ],
    benefits: [
      { title: 'Save time', text: 'Automate billing, stock updates and reports that used to take hours.' },
      { title: 'Fewer mistakes', text: 'Accurate calculations and records instead of manual entries.' },
      { title: 'Real-time insight', text: 'See sales, stock and performance at a glance, from anywhere.' },
      { title: 'Made for you', text: 'Screens and reports that match your exact workflow.' },
    ],
    useCases: [
      'Retail shops and trading businesses needing POS billing',
      'Clinics and hospitals managing patients and appointments',
      'Businesses tracking inventory across locations',
      'Owners who want real-time reports on their phone',
    ],
    faqs: [
      {
        q: 'Do you build POS and billing software?',
        a: 'Yes. My portfolio includes a live POS billing system for a trading business with secure login, sales and invoicing.',
      },
      {
        q: 'Can you build a clinic management system?',
        a: 'Yes. I have built clinic management software for handling patients, appointments and invoices, as well as several clinic and hospital websites.',
      },
      {
        q: 'Does it work on mobile and tablets?',
        a: 'Yes. The systems are web-based and responsive, so they work on desktops, tablets and phones without installing anything.',
      },
    ],
    tech: ['Next.js', 'Django', 'PostgreSQL'],
    projectCategory: 'Web Apps',
  },
  {
    slug: 'wordpress-development',
    title: 'WordPress Development',
    icon: 'code',
    description:
      'Fast, secure and easy-to-manage WordPress websites, plus ongoing maintenance and improvements for existing sites.',
    seoTitle: 'WordPress Development in Lahore | Freelance WordPress Developer',
    seoDescription:
      'Hire Ali Raza, a freelance WordPress developer in Lahore, for fast, secure and easy-to-manage WordPress websites, custom themes, speed optimization and ongoing maintenance.',
    keywords: [
      'freelance WordPress developer',
      'WordPress website developer Lahore',
      'WordPress speed optimization',
      'custom WordPress theme development',
      'WordPress maintenance services',
      'hire WordPress developer',
    ],
    intro: [
      'WordPress powers a large share of the web because it makes publishing and editing content easy. But many WordPress sites become slow, insecure and hard to manage after years of plugins and quick fixes.',
      'As a Full Stack and WordPress Developer, I build clean, fast WordPress websites with custom themes, and I improve existing sites — speeding them up, hardening their security and keeping them updated so they keep working for your business.',
    ],
    features: [
      'Custom themes and page builds',
      'Speed and security hardening',
      'Plugin setup and customization',
      'Updates, backups and fixes',
      'WooCommerce and forms',
      'Migration and hosting setup',
    ],
    benefits: [
      { title: 'Easy to edit', text: 'Update pages, posts and images yourself from a familiar dashboard.' },
      { title: 'Faster pages', text: 'Optimized themes, images and caching for quick loading.' },
      { title: 'Secure', text: 'Hardened setup, updates and backups to protect your website.' },
      { title: 'Cared for', text: 'Ongoing maintenance so your site never falls behind.' },
    ],
    useCases: [
      'Businesses that want to manage their own content',
      'Slow or outdated WordPress sites that need a refresh',
      'Sites that were hacked or need security hardening',
      'Ongoing WordPress maintenance and support',
    ],
    faqs: [
      {
        q: 'Can you speed up my existing WordPress site?',
        a: 'Yes. I audit themes, plugins, images and hosting, then remove the bottlenecks to improve loading speed and Core Web Vitals.',
      },
      {
        q: 'Do you offer WordPress maintenance?',
        a: 'Yes. I can keep WordPress, themes and plugins updated, run backups and fix issues as they come up.',
      },
      {
        q: 'WordPress or a custom Next.js website?',
        a: 'WordPress is great when you want to edit content often with minimal cost; a custom Next.js site is better for maximum speed and custom functionality. I will recommend the right fit.',
      },
    ],
    tech: ['WordPress', 'PHP', 'Tailwind CSS'],
  },
  {
    slug: 'database-design',
    title: 'Database Design',
    icon: 'database',
    description:
      'Well-structured databases that keep your data consistent, secure and fast as your business grows.',
    seoTitle: 'Database Design & Optimization | PostgreSQL, MongoDB, MySQL — Ali Raza',
    seoDescription:
      'Database design and optimization by Ali Raza: PostgreSQL, MongoDB and MySQL schema design, query performance tuning, migrations and secure backups.',
    keywords: [
      'database design services',
      'PostgreSQL developer',
      'MongoDB developer',
      'database optimization',
      'database migration services',
      'MySQL developer Pakistan',
    ],
    intro: [
      'Your data is one of your most valuable assets. A poorly designed database leads to slow pages, inconsistent records and painful changes later. A good design keeps data accurate, makes queries fast and lets your application grow without trouble.',
      'I design and optimize databases with PostgreSQL, MongoDB and MySQL — from modeling your data and relationships to indexing, query tuning, migrations and reliable backups.',
    ],
    features: [
      'Schema and data modeling',
      'Query and index optimization',
      'Migrations and data import',
      'Backups and data safety',
      'Reporting queries and views',
      'Access control and security',
    ],
    benefits: [
      { title: 'Faster apps', text: 'Indexes and efficient queries make pages and reports load quickly.' },
      { title: 'Accurate data', text: 'Constraints and structure prevent duplicates and inconsistencies.' },
      { title: 'Safe', text: 'Regular backups and access control protect your information.' },
      { title: 'Ready to grow', text: 'A structure that handles more data without slowing down.' },
    ],
    useCases: [
      'New applications that need a solid data model',
      'Slow applications with heavy database queries',
      'Moving data from spreadsheets or old systems',
      'Setting up reliable backups and reporting',
    ],
    faqs: [
      {
        q: 'SQL or NoSQL — which should I use?',
        a: 'PostgreSQL or MySQL suit structured, related data like orders and invoices; MongoDB suits flexible, document-style data. Many projects are best served by PostgreSQL.',
      },
      {
        q: 'Can you speed up a slow database?',
        a: 'Yes. I analyze slow queries, add the right indexes and restructure data where needed to improve performance.',
      },
      {
        q: 'Can you migrate data from Excel or an old system?',
        a: 'Yes. I clean, map and import existing data into the new database with validation, so nothing important is lost.',
      },
    ],
    tech: ['PostgreSQL', 'MongoDB', 'MySQL'],
  },
  {
    slug: 'devops-deployment',
    title: 'DevOps & Deployment',
    icon: 'cloud',
    description:
      'Reliable deployments and automated pipelines so your application ships quickly and stays online.',
    seoTitle: 'DevOps & Deployment Services | Docker, AWS, CI/CD — Ali Raza',
    seoDescription:
      'DevOps and deployment services by Ali Raza: Docker containerization, CI/CD with GitHub Actions, cloud hosting on AWS, Vercel and Netlify, domains, SSL and monitoring.',
    keywords: [
      'DevOps services',
      'Docker deployment',
      'CI/CD setup GitHub Actions',
      'AWS deployment services',
      'website deployment and hosting',
      'remote full stack developer',
    ],
    intro: [
      'Building an application is only half the job; it also needs to be deployed, kept online and updated safely. Manual deployments are slow and risky, and a server nobody monitors is a problem waiting to happen.',
      'I set up reliable deployment pipelines with Docker and GitHub Actions, host applications on AWS, Vercel or Netlify, and configure domains, SSL and monitoring — so every update ships quickly and your site stays fast and available.',
    ],
    features: [
      'Docker containerization',
      'CI/CD with GitHub Actions',
      'Cloud hosting and domain setup',
      'Monitoring and uptime',
      'SSL, security and backups',
      'Staging and preview environments',
    ],
    benefits: [
      { title: 'Ship faster', text: 'Automated builds and deployments on every update.' },
      { title: 'Fewer outages', text: 'Monitoring, health checks and safe rollbacks.' },
      { title: 'Consistent environments', text: 'Docker makes development, staging and production behave the same.' },
      { title: 'Lower costs', text: 'Right-sized hosting instead of paying for resources you do not use.' },
    ],
    useCases: [
      'Moving an app from manual uploads to automated deployment',
      'Containerizing an application with Docker',
      'Setting up hosting, domains and SSL for a new product',
      'Adding monitoring and backups to an existing app',
    ],
    faqs: [
      {
        q: 'Where can you host my application?',
        a: 'Depending on the project: Vercel or Netlify for frontends, and AWS or other cloud providers for full applications and databases.',
      },
      {
        q: 'What is CI/CD?',
        a: 'Continuous Integration and Continuous Deployment automatically test and deploy your code whenever it changes, making releases faster and safer.',
      },
      {
        q: 'Can you take over an existing server?',
        a: 'Yes. I can review your current setup, improve security and reliability, and automate the deployment process.',
      },
    ],
    tech: ['Docker', 'AWS', 'CI/CD', 'Vercel', 'Netlify'],
  },
  {
    slug: 'performance-seo-optimization',
    title: 'Performance & SEO Optimization',
    icon: 'gauge',
    description:
      'Faster load times and stronger technical SEO, so more visitors find your site and stay on it.',
    seoTitle: 'Website Speed & SEO Optimization Services | Ali Raza',
    seoDescription:
      'Website speed and technical SEO optimization by Ali Raza: Core Web Vitals, image and code optimization, metadata, sitemaps, structured data and Google Search Console setup.',
    keywords: [
      'website speed and SEO optimization',
      'Core Web Vitals optimization',
      'technical SEO services',
      'website speed optimization',
      'Google Search Console setup',
      'SEO friendly website development',
    ],
    intro: [
      'A slow website loses visitors before they even see your content, and a website Google cannot understand will not rank. Speed and technical SEO work together: faster pages keep people engaged and are favored in search results.',
      'I audit and optimize websites for Core Web Vitals, fix technical SEO issues and set up the metadata, sitemaps and structured data search engines need — then track the results in Google Search Console.',
    ],
    features: [
      'Core Web Vitals improvements',
      'Image, code and caching optimization',
      'Technical SEO, sitemaps and metadata',
      'Google Search Console setup',
      'Structured data (schema.org)',
      'Social sharing previews',
    ],
    benefits: [
      { title: 'Faster pages', text: 'Better Lighthouse scores and a smoother experience for every visitor.' },
      { title: 'Better rankings', text: 'Technical SEO foundations that help Google index and rank your pages.' },
      { title: 'More conversions', text: 'Fast, clear pages keep visitors around long enough to contact you.' },
      { title: 'Measurable', text: 'Before-and-after reports and Search Console tracking.' },
    ],
    useCases: [
      'Websites with poor Lighthouse or PageSpeed scores',
      'Sites not appearing on Google for their brand or services',
      'React or single-page apps with indexing problems',
      'New websites that need SEO set up correctly from launch',
    ],
    faqs: [
      {
        q: 'How do you measure website speed?',
        a: 'I use Lighthouse, PageSpeed Insights and real-user Core Web Vitals data to find bottlenecks and confirm improvements.',
      },
      {
        q: 'Do you guarantee first place on Google?',
        a: 'No honest developer can guarantee rankings. I fix the technical foundations, speed and structure that give your content the best possible chance to rank.',
      },
      {
        q: 'Can you fix SEO for a React website?',
        a: 'Yes. I add per-page metadata, pre-rendering, sitemaps and structured data so search engines can read every page of a React or Next.js site.',
      },
    ],
    tech: ['Lighthouse', 'Next.js', 'Search Console'],
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)
