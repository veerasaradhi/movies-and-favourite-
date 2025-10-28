import React from 'react'

export default function MovieCard({ movie, onToggleFavorite, isFavorite, onShowDetails }) {
  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'
  return (
    <article className="card">
      <div className="poster" onClick={onShowDetails} role="button" tabIndex={0}>
        <img src={poster} alt={`${movie.Title} poster`} />
      </div>
      <div className="card-body">
        <h3>{movie.Title}</h3>
        <p className="meta">{movie.Year} • {movie.Genre || 'N/A'}</p>
        <div className="card-actions">
          <button className={`fav ${isFavorite ? 'active' : ''}`} onClick={onToggleFavorite} aria-pressed={isFavorite}>
            {isFavorite ? '★ Favorite' : '☆ Add'}
          </button>
          <button className="details" onClick={onShowDetails}>Details</button>
        </div>
      </div>
    </article>
  )
}
