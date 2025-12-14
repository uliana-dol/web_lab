import React from 'react';
import FilmCard from './FilmCard';

const sampleFilms = [
    { id: 1, title: 'The Dawn', year: 2021, img: '/films_photo/film1.jpg' },
    { id: 2, title: 'Blue River', year: 2022, img: '/films_photo/film2.jpg' },
    { id: 3, title: 'Silent Echo', year: 2020, img: '/films_photo/film3.jpg' },
    { id: 4, title: 'Midnight Run', year: 2019, img: '/films_photo/film4.jpg' }
];

const FilmsGallery = () => (
    <section id="films" className="gallery container">
        <h3>Featured Films</h3>
        <div className="grid">
            {sampleFilms.map((f) => (
                <FilmCard key={f.id} film={f} />
            ))}
        </div>
    </section>
);

export default FilmsGallery;
