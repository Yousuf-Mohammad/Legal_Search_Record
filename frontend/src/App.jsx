import { useState } from 'react'
import SearchBar from './components/SearchBar'
import ResultsList from './components/ResultsList'
import StatusBanner from './components/StatusBanner'
import Loader from './components/Loader'
import { searchDocuments } from './api/client'

export default function App() {
  const [phase, setPhase] = useState('idle')
  const [data, setData] = useState(null)
  const [errorMsg, setError] = useState(null)

  async function handleSearch(query) {
    setPhase('loading')
    setData(null)
    setError(null)
    try {
      const result = await searchDocuments(query)
      setData(result)
      setPhase('success')
    } catch (err) {
      setError(err.message)
      setPhase('error')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-ink-950">

      <header className="relative px-6 sm:px-12 pt-16 pb-6 sm:pt-24 sm:pb-24 overflow-hidden">
        
        <div className="relative max-w-2xl mx-auto text-center">
         
          <h1 className="font-serif text-[2.8rem] sm:text-[3.8rem] font-semibold text-ink-100 leading-[1.1] tracking-tight mb-5">
            Search the{' '}
            <em className="not-italic text-amber-400">Record</em>
          </h1>

          <p className="text-sm text-ink-400 mb-10 max-w-xs mx-auto leading-relaxed">
            Surface relevant clauses and obligations across contracts, policies, and agreements.
          </p>

          <SearchBar onSearch={handleSearch} disabled={phase === 'loading'} />
        </div>
      </header>


      {/* ── Results ── */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 sm:px-8 py-6 pb-20">
        {phase === 'loading' && <Loader />}

        {phase === 'success' && data && (
          <div >
            {data.results.length > 0 && (
              <StatusBanner variant="summary" message={data.summary} />
            )}
            <ResultsList results={data.results} query={data.query} summary={data.summary} />
          </div>
        )}

        {phase === 'error' && errorMsg && (
          <div >
            <StatusBanner variant="error" message={errorMsg} />
          </div>
        )}

        {phase === 'idle' && (
          <p className="text-center font-serif italic text-2xl text-ink-200 mt-8 select-none">
            Enter a query above to begin
          </p>
        )}
      </main>

      
    </div>
  )
}
