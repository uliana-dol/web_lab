import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFilms } from '../api/films';

const FilmContext = createContext(null);

export const FilmProvider = ({ children }) => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFilms = async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getFilms(filters);
            setFilms(data);
        } catch (err) {
            setError(err.message || 'Failed to load films');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFilms();
    }, []);

    const getById = (id) => films.find((f) => f.id === Number(id));

    return (
        <FilmContext.Provider value={{ films, setFilms, getById, fetchFilms, loading, error }}>
            {children}
        </FilmContext.Provider>
    );
};

export const useFilms = () => {
    const ctx = useContext(FilmContext);
    if (!ctx) throw new Error('useFilms must be used within FilmProvider');
    return ctx;
};

export default FilmContext;
