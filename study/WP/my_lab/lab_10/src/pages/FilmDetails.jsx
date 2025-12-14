import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFilms } from '../context/FilmContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';
import PrimaryButton from '../components/PrimaryButton.jsx';

const FilmDetails = () => {
    const { id } = useParams();
    const { getById } = useFilms();
    const film = getById(id);
    const dispatch = useDispatch();

    if (!film) return <div className="container"><h2>Film not found</h2></div>;

    return (
        <section className="container film-details">
        <h2>{film.name}</h2>
        <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ width: 300 }}>
            <img src={film.image} alt={film.name} style={{ width: '100%', borderRadius: 8 }} />
            </div>
            <div>
            <p><strong>Length:</strong> {film.time} min</p>
            <p><strong>IMDb:</strong> {film.IMDb_rating}</p>
            <p><strong>Reviews:</strong> {film.number_reviews.toLocaleString()}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Use this space for a longer description.</p>
            <div style={{ marginTop: 12 }}>
                <PrimaryButton onClick={() => dispatch(addToCart(film))}>Add to cart</PrimaryButton>
            </div>
            <div style={{ marginTop: 8 }}>
                <Link to="/films">← Back to library</Link>
            </div>
            </div>
        </div>
        </section>
    );
};

export default FilmDetails;
