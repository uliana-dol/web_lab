import React, { createContext, useContext, useState } from 'react';
import { mockFilms } from '../data/mockFilms';

const FilmContext = createContext(null);

export const FilmProvider = ({ children }) => {
  const [films, setFilms] = useState(mockFilms);

  const getById = (id) => films.find((f) => f.id === Number(id));

  return (
    <FilmContext.Provider value={{ films, setFilms, getById }}>
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
