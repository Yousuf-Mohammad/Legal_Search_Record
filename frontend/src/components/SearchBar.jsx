import { useState } from 'react'

export default function SearchBar({ onSearch, disabled }) {
  const [value, setValue] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [focused, setFocused] = useState(false)

  function handleSubmit() {
    const q = value.trim()
    if (!q) { setShowHint(true); return }
    setShowHint(false)
    onSearch(q)
  }

  function handleChange(e) {
    setValue(e.target.value)
    if (showHint) setShowHint(false)
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`flex items-center bg-ink-900 rounded-xl border transition-all duration-200 ${
          focused
            ? 'border-amber-400 ring-2 ring-amber-400/10'
            : 'border-ink-800'
        }`}
      >
        {/* Search icon */}
        <span className="pl-4 flex-shrink-0">
          <svg
            className={`w-4 h-4 transition-colors duration-200 ${focused ? 'text-amber-400' : 'text-zinc-600'}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>

        <input
          className="flex-1 px-3 py-3.5 text-sm text-ink-100 bg-transparent outline-none disabled:text-ink-500 disabled:cursor-not-allowed"
          type="text"
          placeholder="e.g. non-disclosure obligations, lease termination…"
          value={value}
          onChange={handleChange}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          aria-label="Search query"
          aria-describedby="search-hint"
        />

        <div className="p-2 flex-shrink-0">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase bg-amber-400 text-zinc-950 transition-all duration-150 hover:bg-amber-300 disabled:opacity-60 disabled:hover:bg-amber-400 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            onClick={handleSubmit}
            disabled={disabled}
            aria-label={disabled ? 'Searching…' : 'Search'}
          >
            {disabled && (
              <span
                className="w-3 h-3 rounded-full border-2 border-ink-600 border-t-ink-300 animate-spin flex-shrink-0"
                aria-hidden="true"
              />
            )}
            {disabled ? 'Searching' : 'Search'}
          </button>
        </div>
      </div>

      <div
        id="search-hint"
        className="mt-2 text-xs flex items-center gap-1.5 justify-center text-red-400"
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
        {showHint && <><span aria-hidden="true">⚠</span> Please enter a search term.</>}
      </div>
    </div>
  )
}
