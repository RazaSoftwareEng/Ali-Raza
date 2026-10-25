import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-7xl font-extrabold text-indigo-500">404</p>
      <h1 className="mt-4 text-2xl font-bold text-fg">Page not found</h1>
      <p className="mt-2 text-muted">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary mt-8">Back to Home</Link>
    </section>
  )
}
