// Blog posts: metadata lives here, the article body lives in the matching .md file.
// Supported Markdown: ## / ### headings, paragraphs, - and 1. lists, ``` code blocks,
// > callouts, and inline [links](/path), `code` and **bold**.
import reactPerformance from './react-performance-tips.md?raw'
import tailwindDesignSystem from './tailwind-design-system.md?raw'
import restApi from './rest-api-best-practices.md?raw'
import gitWorkflow from './git-workflow-for-teams.md?raw'
import docker from './docker-for-web-developers.md?raw'
import typescriptReact from './typescript-tips-for-react.md?raw'

// Newest first.
export const posts = [
  {
    slug: 'react-performance-tips',
    title: '10 Practical Tips to Speed Up Your React App',
    excerpt:
      'Code splitting, memoization, virtualization, transitions and more — ten proven techniques that make React apps feel instant in production.',
    date: '2026-09-18',
    tags: ['React', 'Performance'],
    keywords: ['how to speed up a React app', 'React performance optimization', 'React performance tips'],
    body: reactPerformance,
  },
  {
    slug: 'tailwind-design-system',
    title: 'Building a Consistent Design System with Tailwind CSS',
    excerpt:
      'Semantic tokens, reusable components, dark mode and team conventions — how to keep a growing Tailwind codebase visually consistent.',
    date: '2026-08-02',
    tags: ['CSS', 'Tailwind'],
    keywords: ['Tailwind CSS design system', 'Tailwind CSS dark mode', 'Tailwind CSS best practices'],
    body: tailwindDesignSystem,
  },
  {
    slug: 'rest-api-best-practices',
    title: 'REST API Best Practices Every Developer Should Know',
    excerpt:
      'Resource naming, versioning, status codes, error formats, validation, pagination and security — a complete checklist for APIs people love to use.',
    date: '2026-06-21',
    tags: ['Backend', 'Node.js'],
    keywords: ['REST API best practices', 'REST API design', 'Node.js API best practices'],
    body: restApi,
  },
  {
    slug: 'git-workflow-for-teams',
    title: 'A Simple Git Workflow for Small Teams',
    excerpt:
      'Deployable main, short-lived branches, small pull requests, clear commits and CI — a lightweight workflow that keeps small teams shipping.',
    date: '2026-05-10',
    tags: ['Git', 'Productivity'],
    keywords: ['Git workflow for small teams', 'Git branching strategy', 'pull request best practices'],
    body: gitWorkflow,
  },
  {
    slug: 'docker-for-web-developers',
    title: 'Docker for Web Developers: A Beginner-Friendly Guide',
    excerpt:
      'Images, containers, Dockerfiles, Compose and multi-stage builds explained simply — ship the same app on every machine.',
    date: '2026-04-02',
    tags: ['DevOps', 'Docker'],
    keywords: ['Docker for beginners', 'Docker for web developers', 'Dockerfile for Node.js'],
    body: docker,
  },
  {
    slug: 'typescript-tips-for-react',
    title: 'TypeScript Tips That Make React Code Safer',
    excerpt:
      'Strict mode, typed props, discriminated unions, API types and generics — practical patterns that catch bugs before users do.',
    date: '2026-02-14',
    tags: ['TypeScript', 'React'],
    keywords: ['TypeScript with React tips', 'TypeScript React best practices', 'React TypeScript props'],
    body: typescriptReact,
  },
]
