const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5000;

// --- Middleware ---
app.use(express.json());
app.use(cors()); 

// Serve film images from the src/components/films_photo folder so frontend can load them
app.use('/films_photo', express.static(path.join(__dirname, 'src', 'components', 'films_photo')));

let films = [
    { id: 1, name: "Taylor Swift: The Eras Tour", time: 169, IMDb_rating: 8.0, number_reviews: 25000, image: "/films_photo/Taylor Swift_ The Eras Tour (2023).jpg" },
    { id: 2, name: "All Too Well", time: 15, IMDb_rating: 8.4, number_reviews: 19000, image: "/films_photo/All Too Well (2021).jpg" },
    { id: 3, name: "Miss Americana", time: 85, IMDb_rating: 7.4, number_reviews: 26000, image: "/films_photo/Miss Americana (2020).jpg" },
    { id: 4, name: "Taylor Swift: Reputation Stadium Tour", time: 125, IMDb_rating: 8.4, number_reviews: 8300, image: "/films_photo/Taylor Swift_ Reputation Stadium Tour (2018).jpg" },
    { id: 5, name: "Taylor Swift: The 1989 World Tour Live", time: 132, IMDb_rating: 8.8, number_reviews: 2600, image: "/films_photo/Taylor Swift_ The 1989 World Tour Live (2015).jpg" },
    { id: 6, name: "Green Book", time: 130, IMDb_rating: 8.2, number_reviews: 657000, image: "/films_photo/Green Book (2018).jpg" },
    { id: 7, name: "Oppenheimer", time: 180, IMDb_rating: 8.3, number_reviews: 948000, image: "/films_photo/Oppenheimer (2023).jpg" },
    { id: 8, name: "Forrest Gump", time: 142, IMDb_rating: 8.8, number_reviews: 2400000, image: "/films_photo/Forrest Gump (1994).jpg" },
    { id: 9, name: "Lucy", time: 89, IMDb_rating: 6.4, number_reviews: 567000, image: "/films_photo/Lucy (2014).jpg" }
];
let nextId = films.length > 0 ? Math.max(...films.map(f => f.id)) + 1 : 1;

// 1. READ ALL - Кінцева точка API для фронтенду
app.get('/films', (req, res) => {
    // Support simple server-side filtering via query params: minRating, minTime, q (text)
    const { minRating, minTime, q } = req.query;
    let out = films.slice();
    if (minRating) {
        const mr = parseFloat(minRating) || 0;
        out = out.filter(f => (f.IMDb_rating || 0) >= mr);
    }
    if (minTime) {
        const mt = parseFloat(minTime) || 0;
        out = out.filter(f => (f.time || 0) >= mt);
    }
    if (q) {
        const qq = String(q).toLowerCase();
        out = out.filter(f => (f.name || '').toLowerCase().includes(qq));
    }
    res.json(out);
});

// 2. READ BY ID
app.get('/films/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const film = films.find(f => f.id === id);

    if (!film) {
        return res.status(404).send('Film not found');
    }
    res.json(film);
});

// 3. CREATE
app.post('/films', (req, res) => {
    const finalNewFilm = {
        id: nextId++,
        ...req.body,
        time: parseFloat(req.body.time), 
        IMDb_rating: parseFloat(req.body.IMDb_rating)
    };
    films.push(finalNewFilm);
    res.status(201).json(finalNewFilm);
});

// 4. UPDATE
app.put('/films/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateIndex = films.findIndex(f => f.id === id);

    if (updateIndex === -1) {
        return res.status(404).send('Film not found');
    }

    const updatedFilm = {
        ...films[updateIndex],
        ...req.body,
        id: id,
        time: req.body.time ? parseFloat(req.body.time) : films[updateIndex].time,
        IMDb_rating: req.body.IMDb_rating ? parseFloat(req.body.IMDb_rating) : films[updateIndex].IMDb_rating
    };

    films[updateIndex] = updatedFilm;
    
    res.json(updatedFilm);
});

// 5. DELETE
app.delete('/films/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = films.length;
    films = films.filter(f => f.id !== id);

    if (films.length === initialLength) {
        return res.status(404).send('Film not found');
    }
    
    res.status(204).send();
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
