import React from 'react';
// import films_photo from data

const FilmItem = ({ film }) => {
    // Форматування часу для відображення (наприклад, 2h 49m)
    const timeFormatted = `${Math.floor(film.time / 60)}h ${film.time % 60}m`;

    return (
        <div className="film-item">
            {/* Використовуємо div з фоновим зображенням.
                URL-адреса 'film.image' автоматично шукається відносно папки public/.
            */}
            <div className="film-image"
                style={{
                    backgroundImage: `url(${film.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            <h3 className="film-name">{film.name}</h3>

            <p className="film-info">Time: {timeFormatted}</p>
            {/* Використовуємо назву поля IMDb_rating з ваших даних */}
            <p className="film-info">IMDb rating: {film.IMDb_rating}</p>
            {/* Використовуємо назву поля number_reviews з ваших даних */}
            <p className="film-info">Reviews: {film.number_reviews.toLocaleString()} reviews</p>

            <div className="btn-container">
                <button className="edit-btn">Edit</button>
                <button className="remove-btn">Delete</button>
            </div>
        </div>
    );
};

export default FilmItem;
