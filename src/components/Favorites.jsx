import React from 'react'

export default function Favorites({ favorites, onToggleFavorite, onShowDetails }) {
  if (!favorites || favorites.length === 0) return null
  return (
    <section className="favorites">
      <h2>Favorites</h2>
      <div className="fav-list">
        {favorites.map(f => (
          <div key={f.imdbID} className="fav-item">
            <button className="thumb" onClick={() => onShowDetails(f)}>
              <img src={f.Poster && f.Poster !== 'N/A' ? f.Poster : '/placeholder.svg'} alt={f.Title} />
            </button>
            <div className="fav-meta">
              <strong>{f.Title}</strong>
              <small>{f.Year}</small>
              <button className="small-fav" onClick={() => onToggleFavorite(f)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
