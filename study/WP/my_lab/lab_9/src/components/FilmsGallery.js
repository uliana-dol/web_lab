import React, { useState, useEffect, useMemo } from 'react';
import FilmCard from './FilmCard.jsx';

const formatTime = (totalMinutes) => {
    if (isNaN(totalMinutes) || totalMinutes < 0) return '0h 0m';
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
};

function FilmGallery() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalTime, setTotalTime] = useState('0h 0m'); 
    const [sortBy, setSortBy] = useState('time-desc');

    // --- ЛОГІКА ЗАВАНТАЖЕННЯ ДАНИХ ---
    // Now the app uses context/provider for catalog; keep a minimal local fetch for standalone gallery on Home
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        import('../api/films').then(({ getFilms }) => getFilms().then(data => {
            if (mounted) {
                setFilms(data);
                setLoading(false);
            }
        }).catch(err => {
            if (mounted) {
                setError('Could not load films for gallery');
                setLoading(false);
            }
            console.error(err);
        }));
        return () => { mounted = false; };
    }, []);
    
    // --- ЛОГІКА СОРТУВАННЯ ---
    const displayedFilms = useMemo(() => {
        if (!films || films.length === 0) return [];
        const sortableFilms = [...films];

        const num = (v) => {
            if (v === null || v === undefined) return 0;
            return typeof v === 'number' ? v : parseFloat(v) || 0;
        };
        const str = (v) => (v ? String(v) : '');

        sortableFilms.sort((a, b) => {
            if (sortBy === 'time-desc') {
                return num(b.time) - num(a.time);
            }
            if (sortBy === 'time-asc') {
                return num(a.time) - num(b.time);
            }
            if (sortBy === 'name-asc') {
                return str(a.name).localeCompare(str(b.name));
            }
            if (sortBy === 'rating-desc') {
                return num(b.IMDb_rating) - num(a.IMDb_rating);
            }
            return 0;
        });

        return sortableFilms;
    }, [films, sortBy]);

    // --- ЛОГІКА Підрахунку загального часу ---
    const handleCountTotalTime = () => {
        const totalMinutes = films.reduce((sum, film) => sum + (film.time || 0), 0);
        setTotalTime(formatTime(totalMinutes));
    };

    if (loading) {
        return <h2>Loading films...</h2>;
    }

    if (error) {
        return <h2 style={{ color: 'red' }}>Error: {error}</h2>;
    }

    return (
        <div className="film-list-container">
            {/* --- БЛОК УПРАВЛІННЯ (Manage films) --- */}
            <div className="manage-films-box">
                <h3>Manage films</h3>
                <div className="controls">
                    <label htmlFor="sortBy">Sort by:</label>
                    <select 
                        id="sortBy" 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="time-desc">Length (Descending)</option> 
                        <option value="time-asc">Length (Ascending)</option> 
                        <option value="rating-desc">IMDb Rating (Descending)</option>
                        <option value="name-asc">Name (A-Z)</option>
                    </select>
                </div>
                
                <button 
                    onClick={handleCountTotalTime} 
                    className="count-time-button"
                >
                    Count total time
                </button>
                <p>Total Time: **{totalTime}**</p>
            </div>
            {/* ------------------------------------------- */}

            {/* --- ВІДОБРАЖЕННЯ СПИСКУ ФІЛЬМІВ --- */}
            <h3>Films Library ({displayedFilms.length} items)</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {displayedFilms.map(film => (
                    <FilmCard key={film.id} film={film} />
                ))}
            </div>
        </div>
    );
}

export default FilmGallery;
