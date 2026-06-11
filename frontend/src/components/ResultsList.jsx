import ResultCard from './ResultCard'
import StatusBanner from './StatusBanner'

export default function ResultsList({ results, query, summary }) {
  if (results.length === 0) {
    return (
      <StatusBanner
        variant="empty"
        message={summary || 'No documents matched your query. Try different keywords.'}
      />
    )
  }


  return (
    <section aria-label="Search results">
      <div className="flex items-center gap-4 mb-6">
        <p className="text-[14px] font-semibold  text-ink-500 whitespace-nowrap">
          {results.length} results
        </p>
        <div className="flex-1 h-px bg-ink-700" />
        <p className="text-[14px] text-ink-600 truncate max-w-[200px]" title={query}>
          &ldquo;{query}&rdquo;
        </p>
      </div>
      {results.map((r, i) => (
        <ResultCard key={r.id} result={r} index={i} />
      ))}
    </section>
  )
}
