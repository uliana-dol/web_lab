const express = require('express');
const app = express();
const PORT = 5000;

const initialFilms = [
    { id: 1, name: "Taylor Swift: The Eras Tour", time: 169, imdb: 8, reviews: 25000 },
    { id: 2, name: "All Too Well", time: 15, imdb: 8.4, reviews: 19000 }
];

app.get('/api/films', (req, res) => {
    res.json(initialFilms);
});

app.listen(PORT, () => {
    console.log(`Node.js API Server running on port ${PORT}`);
});
