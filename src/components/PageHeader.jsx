export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
      <div className="container-page relative py-16 sm:py-20">
        <p className="mb-3 font-mono text-sm uppercase tracking-widest text-accent">{eyebrow}</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>}
        {children}
      </div>
    </section>
  )
}
