export default function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <div className={`mb-10 ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      {eyebrow && (
        <p className="mb-2 font-mono text-sm font-medium uppercase tracking-widest text-accent">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-muted">{description}</p>}
    </div>
  )
}
