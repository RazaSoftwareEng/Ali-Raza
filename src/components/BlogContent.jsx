import { useState } from 'react'
import RichText from './RichText'
import { Icon } from './Icons'

function CodeBlock({ lang, text }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard can be unavailable (e.g. insecure context) — fail quietly.
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-wider text-slate-400">{lang || 'code'}</span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1 rounded px-2 py-1 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <Icon name={copied ? 'check' : 'copy'} className="h-3.5 w-3.5" /> {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6 text-slate-200">
        <code>{text}</code>
      </pre>
    </div>
  )
}

export default function BlogContent({ blocks }) {
  return (
    <div className="space-y-6 text-[17px] leading-8 text-body">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2 key={i} id={b.id} className="scroll-mt-24 pt-6 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                <RichText text={b.text} />
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i} id={b.id} className="scroll-mt-24 pt-2 text-xl font-semibold text-fg">
                <RichText text={b.text} />
              </h3>
            )
          case 'ul':
            return (
              <ul key={i} className="list-disc space-y-2 pl-6 marker:text-accent">
                {b.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i} className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-accent">
                {b.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    <RichText text={item} />
                  </li>
                ))}
              </ol>
            )
          case 'code':
            return <CodeBlock key={i} lang={b.lang} text={b.text} />
          case 'callout':
            return (
              <aside key={i} className="rounded-r-xl border-l-4 border-indigo-500 bg-indigo-500/5 px-5 py-4 text-base">
                <RichText text={b.text} />
              </aside>
            )
          default:
            return (
              <p key={i}>
                <RichText text={b.text} />
              </p>
            )
        }
      })}
    </div>
  )
}
