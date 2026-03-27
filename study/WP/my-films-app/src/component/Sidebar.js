import React from 'react';
import { initialFilms } from '../data/films';

function calculateTotalMinutes(films) {
    return films.reduce((sum, film) => sum + (film.time || 0), 0);
}

function formatTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
}

const totalMinutes = calculateTotalMinutes(initialFilms);
const totalTimeFormatted = formatTime(totalMinutes);

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Manage films</h2> {/* Заголовок для Sidebar */}

            <label htmlFor="sort-by">Sort by:</label>
            <select id="sort-by">
                <option value="length">Lenght</option>
                <option value="imdb">IMDb rating</option>
                <option value="reviews">Reviews</option>
            </select>

            <button className="count-btn">Count total time</button>

            <div className="total-time">
                {/* Відображення коректного часу */}
                <p>Total Time: <span>{totalTimeFormatted}</span></p>
            </div>
        </div>
    );
};

export default Sidebar;
