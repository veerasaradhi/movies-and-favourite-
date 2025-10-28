import React from 'react'

export default function MovieModal({ movie, onClose, onToggleFavorite, isFavorite }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <dialog open className="modal" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h3>{movie.Title} <small>({movie.Year})</small></h3>
          <button className="close" onClick={onClose}>✕</button>
        </header>
        <div className="modal-body">
          <img className="modal-poster" src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'} alt={movie.Title} />
          <div className="modal-info">
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          </div>
        </div>
        <footer className="modal-footer">
          <button className={`fav ${isFavorite ? 'active' : ''}`} onClick={() => onToggleFavorite(movie)}>
            {isFavorite ? '★ Favorite' : '☆ Add to Favorites'}
          </button>
          <button onClick={onClose}>Close</button>
        </footer>
      </dialog>
    </div>
  )
}
