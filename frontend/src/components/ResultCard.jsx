function scoreClasses(pct) {
  if (pct >= 65) return {
    accent:  'bg-emerald-600',
    iconBox: 'bg-emerald-500/10 text-emerald-500',
    badge:   'bg-emerald-500/10 text-emerald-500 border-emerald-500/25',
    bar:     'bg-emerald-600',
  }
  if (pct >= 35) return {
    accent:  'bg-amber-400',
    iconBox: 'bg-amber-400/10 text-amber-400',
    badge:   'bg-amber-400/10 text-amber-400 border-amber-400/25',
    bar:     'bg-amber-400',
  }
  return {
    accent:  'bg-zinc-600',
    iconBox: 'bg-zinc-600/10 text-zinc-400',
    badge:   'bg-zinc-600/20 text-zinc-400 border-zinc-600/30',
    bar:     'bg-zinc-600',
  }
}

function DocIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  )
}

export default function ResultCard({ result, index = 0 }) {
  const { title, snippet, score, source } = result
  const pct   = Math.round(score * 100)
  const s     = scoreClasses(pct)
  const delay = `${index * 0.08}s`

  return (
    <article
      className="group relative bg-ink-900 rounded-xl border border-ink-700 px-6 py-5 mb-3 overflow-hidden transition-all duration-300 hover:border-ink-600 shadow-[0_1px_4px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.55)]"
      style={{ animationDelay: delay }}
    >
     

      {/* Header row */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center mt-0.5 ${s.iconBox}`}>
          <DocIcon />
        </div>

        <h3 className="flex-1 font-serif text-lg font-semibold text-ink-100 leading-snug pt-0.5">
          {title}
        </h3>

        <div className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap border ${s.badge}`}>
          {pct}% match
        </div>
      </div>

      {/* Snippet */}
      <p className="text-sm text-ink-400 leading-relaxed mb-4 pl-10">
        {snippet}
      </p>

     
    </article>
  )
}
