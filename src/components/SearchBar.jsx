import React, { useState } from 'react'

export default function SearchBar({ onSearch, loading, onLoadSample }) {
  const [term, setTerm] = useState('')

  function submit(e) {
    e.preventDefault()
    if (onSearch) onSearch(term.trim())
  }

  return (
    <form className="search" onSubmit={submit}>
      <input
        aria-label="Search movies"
        placeholder="Search movies by title..."
        value={term}
        onChange={e => setTerm(e.target.value)}
      />
      <button type="submit" disabled={loading || !term.trim()}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      <button type="button" className="sample-btn" onClick={() => onLoadSample && onLoadSample()} title="Load sample movie">
        Load Sample
      </button>
    </form>
  )
}
