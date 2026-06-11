// falls back to localhost so you don't need a .env file for local dev
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export async function searchDocuments(query) {
  let res
  try {
    res = await fetch(`${BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
  } catch {
    throw new Error('Unable to connect to the server. Please check your connection and try again.')
  }

  if (!res.ok) {
    let detail = `Server error (HTTP ${res.status}). Please try again.`
    try {
      const body = await res.json()
      if (body?.detail) detail = body.detail
    } catch {
      // non-JSON error body, keep the fallback message
    }
    throw new Error(detail)
  }

  return res.json()
}
