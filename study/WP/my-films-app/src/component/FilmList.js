import React from 'react';
import FilmItem from './FilmItem';

const FilmList = ({ films }) => {
    return (
        <section className="film-list" id="films">
            {films.map(film => (
                // Використовуємо .map() для рендерингу масиву
                <FilmItem key={film.id} film={film} />
            ))}
        </section>
    );
};

export default FilmList;
