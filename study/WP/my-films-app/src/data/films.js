export const initialFilms = [
    {
        id: 1,
        name: "Taylor Swift: The Eras Tour",
        time: 169,
        IMDb_rating: 8.0,
        number_reviews: 25000,
        image: require('./films_photo/Taylor Swift_ The Eras Tour (2023).jpg')
    },
    {
        id: 2,
        name: "All Too Well",
        time: 15,
        IMDb_rating: 8.4,
        number_reviews: 19000,
        image: require('./films_photo/All Too Well (2021).jpg')
    },
    {
        id: 3,
        name: "Miss Americana",
        time: 85,
        IMDb_rating: 7.4,
        number_reviews: 26000,
        image: require('./films_photo/Miss Americana (2020).jpg')
    },
    {
        id: 4,
        name: "Taylor Swift: Reputation Stadium Tour",
        time: 125,
        IMDb_rating: 8.4,
        number_reviews: 8300,
        image: require('./films_photo/Taylor Swift_ Reputation Stadium Tour (2018).jpg')
    },
    {
        id: 5,
        name: "Taylor Swift: The 1989 World Tour Live",
        time: 132,
        IMDb_rating: 8.8,
        number_reviews: 2600,
        image: require('./films_photo/Taylor Swift_ The 1989 World Tour Live (2015).jpg')
    },
    {
        id: 6,
        name: "Green Book",
        time: 130,
        IMDb_rating: 8.2,
        number_reviews: 657000,
        image: require('./films_photo/Green Book (2018).jpg')
    },
    {
        id: 7,
        name: "Oppenheimer",
        time: 180,
        IMDb_rating: 8.3,
        number_reviews: 948000,
        image: require('./films_photo/Oppenheimer (2023).jpg')
    },
    {
        id: 8, name: "Forrest Gump",
        time: 142,
        IMDb_rating: 8.8,
        number_reviews: 2400000,
        image: require('./films_photo/Forrest Gump (1994).jpg')
    },
    {
        id: 9,
        name: "Lucy",
        time: 89,
        IMDb_rating: 6.4,
        number_reviews: 567000,
        image: require('./films_photo/Lucy (2014).jpg')
    }
];

export function calculateTotalMinutes(films) {
    return films.reduce((sum, film) => sum + (film.time || 0), 0);
}
