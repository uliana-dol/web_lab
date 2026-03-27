import React, { useState } from 'react';
import { mockFilms } from '../data/mockFilms';
import FilmCard from '../components/FilmCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

const FilmsLibrary = () => {
  const [films] = useState(mockFilms);
  const [totalTime, setTotalTime] = useState(null);

  const calcTotalTime = () => {
    const total = films.reduce((sum, f) => sum + (f.time || 0), 0);
    setTotalTime(total);
  };

  return (
    <section className="container films-library">
      <div className="library-header">
        <h2>Films Library</h2>
        <div className="controls">
          <PrimaryButton onClick={calcTotalTime}>Count total time</PrimaryButton>
          <div className="total-time">Total Time: {totalTime !== null ? `${totalTime} min` : '—'}</div>
        </div>
      </div>

      <div className="films-list-container grid">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </section>
  );
};

export default FilmsLibrary;
