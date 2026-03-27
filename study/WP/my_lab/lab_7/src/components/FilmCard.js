import React from 'react';

const FilmCard = ({ film }) => {
    const imagePath = film.image;

    return (
        <div className="film-card">
            <div className="film-card-thumb">
                {/* Використовуємо шлях із сервера, який тепер починається з / */}
                <img
                    src={imagePath}
                    alt={film.name}
                    className="film-card-img"
                    onError={(e) => { e.target.onerror = null; e.target.src = "path/to/placeholder.jpg" }}
                />
            </div>

            <h4 className="film-card-h4">{film.name}</h4>
            <p>Length: **{film.time} min**</p>
            <p>IMDb Rating: **{film.IMDb_rating}**</p>
            <p>Reviews: {film.number_reviews.toLocaleString()}</p>
            {/* Кнопки Edit та Delete, як на скріншоті (без функціоналу) */}
            <div>
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
            </div>
        </div>
    );
};

export default FilmCard;
