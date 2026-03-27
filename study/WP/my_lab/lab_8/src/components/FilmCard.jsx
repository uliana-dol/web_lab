import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from './PrimaryButton.jsx';

const FilmCard = ({ film }) => {
    if (!film) return null;
    return (
        <article className="film-card">
            <div className="thumb" aria-hidden>
                {/* If image exists, show it; otherwise a placeholder */}
                {film.image ? (
                    <img src={film.image} alt={film.name} onError={(e) => { e.target.onerror = null; e.target.src = '/films_photo/placeholder.jpg'; }} />
                ) : (
                    <div className="placeholder-img">🎬</div>
                )}
            </div>
            <h4 className="film-card-title">{film.name}</h4>
            <p className="meta">{film.time} min • IMDb {film.IMDb_rating} • {film.number_reviews.toLocaleString()} reviews</p>
            <div style={{ marginTop: 8 }}>
                <Link to={`/films/${film.id}`} style={{ textDecoration: 'none' }}>
                    <PrimaryButton>View more</PrimaryButton>
                </Link>
            </div>
        </article>
    );
};

export default FilmCard;
