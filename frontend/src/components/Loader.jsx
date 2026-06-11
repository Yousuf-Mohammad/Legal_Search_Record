function SkeletonCard() {
  return (
    <div className="bg-ink-900 rounded-xl border border-ink-800 px-6 py-5 mb-3 animate-pulse">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-7 h-7 rounded-md bg-ink-700" />
        <div className="flex-1 pt-1 space-y-2">
          <div className="h-4 bg-ink-700 rounded w-3/4" />
          <div className="h-3 bg-ink-800 rounded w-2/5" />
        </div>
        <div className="h-6 w-16 bg-ink-800 rounded-full flex-shrink-0" />
      </div>
      <div className="pl-10 space-y-2 mb-4">
        <div className="h-3 bg-ink-800 rounded w-full" />
        <div className="h-3 bg-ink-800 rounded w-5/6" />
        <div className="h-3 bg-ink-800 rounded w-2/3" />
      </div>
      <div className="pl-10">
        <div className="h-2.5 bg-ink-800 rounded w-1/4 mb-2" />
        <div className="h-px bg-ink-700 rounded-full w-full" />
      </div>
    </div>
  )
}

export default function Loader() {
  return (
    <div role="status" aria-live="polite" aria-label="Searching documents">
      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-ink-500 mb-5">
        Searching…
      </p>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}
