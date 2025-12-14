import React, { useMemo, useState } from 'react';
import { useFilms } from '../context/FilmContext';
import FilmCard from '../components/FilmCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

const FilmsLibrary = () => {
    const { films, fetchFilms, loading, error } = useFilms();
    const [totalTime, setTotalTime] = useState(null);
    const [search, setSearch] = useState('');
    const [minRating, setMinRating] = useState(0);
    const [minTime, setMinTime] = useState(0);
    const [sortBy, setSortBy] = useState('time-desc');

    // fetch data from backend when filters change
    useEffect(() => {
        const params = {};
        if (minRating) params.minRating = minRating;
        if (minTime) params.minTime = minTime;
        // note: search by text is left client-side as allowed
        fetchFilms(params);
    }, [minRating, minTime]);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return films.filter((f) => {
        if (minRating && (f.IMDb_rating || 0) < minRating) return false;
        if (minTime && (f.time || 0) < minTime) return false;
        if (!q) return true;
        return (f.name || '').toLowerCase().includes(q);
        });
    }, [films, search, minRating, minTime]);

    const displayed = useMemo(() => {
        const arr = [...filtered];
        const num = (v) => {
        if (v === null || v === undefined) return 0;
        return typeof v === 'number' ? v : parseFloat(v) || 0;
        };
        const str = (v) => (v ? String(v) : '');
        arr.sort((a, b) => {
        if (sortBy === 'time-desc') return num(b.time) - num(a.time);
        if (sortBy === 'time-asc') return num(a.time) - num(b.time);
        if (sortBy === 'name-asc') return str(a.name).localeCompare(str(b.name));
        if (sortBy === 'rating-desc') return num(b.IMDb_rating) - num(a.IMDb_rating);
        return 0;
        });
        return arr;
    }, [filtered, sortBy]);

    const calcTotalTime = () => {
        const total = films.reduce((sum, f) => sum + (f.time || 0), 0);
        setTotalTime(total);
    };

    return (
        <section className="container films-library">
        <div className="library-header">
            <h2>Films Library</h2>
            <div className="controls">
            <input placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
            <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
                <option value={0}>Min rating</option>
                <option value={7}>7+</option>
                <option value={8}>8+</option>
            </select>
            <select value={minTime} onChange={(e) => setMinTime(Number(e.target.value))}>
                <option value={0}>Min length</option>
                <option value={60}>60m+</option>
                <option value={120}>120m+</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="time-desc">Length (Descending)</option>
                <option value="time-asc">Length (Ascending)</option>
                <option value="rating-desc">IMDb Rating (Descending)</option>
                <option value="name-asc">Name (A-Z)</option>
            </select>
            <PrimaryButton onClick={calcTotalTime}>Count total time</PrimaryButton>
            <div className="total-time">Total Time: {totalTime !== null ? `${totalTime} min` : '—'}</div>
            </div>
        </div>

        {loading ? (
            <div style={{ textAlign: 'center' }}>
            <div className="loader-wrap"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
            </div>
        ) : error ? (
            <div style={{ color: 'red' }}>Error: {error}</div>
        ) : (
            <div className="films-list-container grid">
            {displayed.map((film) => (
                <FilmCard key={film.id} film={film} />
            ))}
            </div>
        )}
        </section>
    );
};

export default FilmsLibrary;
