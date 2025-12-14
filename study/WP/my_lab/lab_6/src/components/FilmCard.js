import React from 'react';

const FilmCard = ({ film }) => (
    <article className="film-card">
        <div className="thumb">
            <img src={film.img} alt={film.title} onError={(e) => (e.target.src = '/films_photo/placeholder.jpg')} />
        </div>
        <h4>{film.title}</h4>
        <p className="year">{film.year}</p>
    </article>
);

export default FilmCard;
