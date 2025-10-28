import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import MovieCard from './components/MovieCard'
import Favorites from './components/Favorites'
import MovieModal from './components/MovieModal'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import InstallPrompt from './components/InstallPrompt'
import './App.css'

const API_KEY = import.meta.env.VITE_OMDB_KEY || ''

function MovieSearch() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [selected, setSelected] = useState(null)
  const { logout } = useAuth()

  useEffect(() => {
    const raw = localStorage.getItem('favorites')
    if (raw) setFavorites(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  async function handleSearch(term) {
    if (!term) return
    setQuery(term)
    setLoading(true)
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(term)}`)
      const data = await res.json()
      if (!data || data.Response === 'False' || !data.Search) {
        setMovies([])
        alert('No movies found for "' + term + '"')
        setLoading(false)
        return
      }

      // Fetch details for each search result to get genre, etc.
      const detailsPromises = data.Search.map(m =>
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${m.imdbID}&plot=short`).then(r => r.json())
      )
      const detailed = await Promise.all(detailsPromises)
      setMovies(detailed)
    } catch (err) {
      console.error(err)
      alert('Error fetching movies')
    } finally {
      setLoading(false)
    }
  }

  // Load the provided sample movie into results (dev helper)
  async function loadSample() {
    try {
      // dynamic import so tooling doesn't break if file absent
      const mod = await import('./data/sampleMovie')
      const movie = mod.default
      if (movie) {
        setMovies([movie])
        setQuery(movie.Title || '')
      }
    } catch (err) {
      console.error('Could not load sample movie', err)
      alert('Sample movie not available')
    }
  }

  function isFavorite(movie) {
    return favorites.some(f => f.imdbID === movie.imdbID)
  }

  function toggleFavorite(movie) {
    if (isFavorite(movie)) {
      setFavorites(prev => prev.filter(f => f.imdbID !== movie.imdbID))
    } else {
      setFavorites(prev => [movie, ...prev])
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>Movie Search</h1>
          <p className="subtitle">Search movies, view details, and save favorites</p>
        </div>
        <button className="logout-btn" onClick={logout}>
          Sign Out
        </button>
      </header>

      <main>
  <SearchBar onSearch={handleSearch} loading={loading} onLoadSample={loadSample} />

        <section className="results">
          {loading ? (
            <div className="spinner" aria-hidden="true"></div>
          ) : (
            <div className="grid">
              {movies.map(movie => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onToggleFavorite={() => toggleFavorite(movie)}
                  isFavorite={isFavorite(movie)}
                  onShowDetails={() => setSelected(movie)}
                />
              ))}
            </div>
          )}
        </section>

        <Favorites
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onShowDetails={m => setSelected(m)}
        />

        {selected && (
          <MovieModal movie={selected} onClose={() => setSelected(null)} onToggleFavorite={toggleFavorite} isFavorite={isFavorite(selected)} />
        )}
      </main>

      <footer className="footer">
        <small>Data from OMDb API. Provide your key in <code>.env</code>.</small>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MovieSearch />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <InstallPrompt />
      </AuthProvider>
    </Router>
  )
}
