let films = [];

const modal = document.getElementById("modal");
const createBtn = document.getElementById("create-btn");
const closeModal = document.getElementById("close-modal");
const filmForm = document.getElementById("film-form");
const filmListContainer = document.getElementById("films");
const totalTimeElement = document.getElementById("total-time");

const alertModal = document.getElementById("alert-modal");
const closeAlertModal = document.getElementById("close-alert-modal");
const alertMessage = document.getElementById("alert-message");

let editFilmId = null;

createBtn.onclick = function() {
    document.getElementById("modal-title").innerText = "Create Film";
    filmForm.reset();
    editFilmId = null;
    modal.style.display = "block";
}

closeModal.onclick = function() {
    modal.style.display = "none";
}

function showStyledModal(message) {
    alertMessage.innerText = message;
    alertModal.style.display = "block";
}

closeAlertModal.onclick = function() {
    alertModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == alertModal) {
        alertModal.style.display = "none";
    }
}

filmForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (filmForm.checkValidity()) {
        saveFilm();
    } else {
        showStyledModal("Please check the input fields! All fields are required and must meet the format (IMDb: 1.0-10.0, Minutes: 0-59).");
    }
});


function saveFilm() {
    const filmName = document.getElementById("film-name").value;
    const filmHours = parseFloat(document.getElementById("film-hours").value); 
    const filmMinutes = parseFloat(document.getElementById("film-minutes").value); 
    
    const totalMinutes = (filmHours * 60) + filmMinutes;

    const filmIMDbRating = parseFloat(document.getElementById("film-IMDb-rating").value);
    const filmNumberReviews = parseFloat(document.getElementById("film-number-reviews").value);
    const filmImage = document.getElementById("film-image").value;

    if (totalMinutes < 0) {
        showStyledModal("Total time cannot be negative!");
        return;
    }

    if (editFilmId !== null) {
        const filmIndex = films.findIndex(film => film.id === editFilmId);
        if (filmIndex !== -1) {
            films[filmIndex] = { 
                id: editFilmId, 
                name: filmName, 
                time: totalMinutes,
                IMDb_rating: filmIMDbRating, 
                number_reviews: filmNumberReviews, 
                image: filmImage
            };
        }
    } else {
        const newFilm = {
            id: Date.now(),
            name: filmName,
            time: totalMinutes,
            IMDb_rating: filmIMDbRating, 
            number_reviews: filmNumberReviews, 
            image: filmImage
        };
        films.push(newFilm);
    }

    renderFilms(films); 
    modal.style.display = "none";
}


function renderFilms(filmArray = films) {
    filmListContainer.innerHTML = "";
    filmArray.forEach(film => { 
        const filmHours = Math.floor(film.time / 60);
        const filmMinutes = film.time % 60;
        const displayTime = `${filmHours}h ${filmMinutes}m`;
        
        const filmElement = document.createElement("div");
        filmElement.className = "film-item";
        filmElement.innerHTML = `
            <img src="${film.image}" alt="${film.name}" class="film-image">
            <h3 class="film-name">${film.name}</h3>
            <p class="film-info">Time: ${displayTime}</p>
            <p class="film-info">IMDb rating: ${film.IMDb_rating}</p>
            <p class="film-info">Reviews: ${film.number_reviews} reviews</p>
            <div class="btn-container">
                <button class="edit-btn" onclick="editFilm(${film.id})">Edit</button>
                <button class="remove-btn" onclick="deleteFilm(${film.id})">Delete</button>
            </div>
        `;
        filmListContainer.appendChild(filmElement);
    });
    calculateTotalTime();
}


function editFilm(id) {
    const film = films.find(film => film.id === id);
    if (film) {
        document.getElementById("modal-title").innerText = "Edit Film";
        
        const hours = Math.floor(film.time / 60);
        const minutes = film.time % 60;
        
        document.getElementById("film-name").value = film.name;
        document.getElementById("film-hours").value = hours;
        document.getElementById("film-minutes").value = minutes;
        
        document.getElementById("film-IMDb-rating").value = film.IMDb_rating;
        document.getElementById("film-number-reviews").value = film.number_reviews;
        document.getElementById("film-image").value = film.image;
        editFilmId = id;
        modal.style.display = "block";
    }
}

function deleteFilm(id) {
    if (confirm("Are you sure you want to delete this film?")) {
        films = films.filter(film => film.id !== id);
        renderFilms();
    }
}

function searchFilms() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const filteredFilms = films.filter(film => film.name.toLowerCase().includes(searchInput));
    renderFilms(filteredFilms); 
}

function clearSearch() {
    document.getElementById("search-input").value = "";
    renderFilms();
}

function sortFilms() {
    const sortOption = document.getElementById("sort").value;
    if (sortOption === "time") {
        films.sort((a, b) => b.time - a.time);
    } else if (sortOption === "IMDb-rating") {
        films.sort((a, b) => b['IMDb_rating'] - a['IMDb_rating']);
    } else if (sortOption === "number-reviews") {
        films.sort((a, b) => b['number_reviews'] - a['number_reviews']);
    }
    renderFilms();
}


function calculateTotalTime() {
    const totalMinutes = films.reduce((sum, film) => sum + film.time, 0);

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    totalTimeElement.innerText = `${totalHours}h ${remainingMinutes}m`;
}

window.onload = function() {
    films = [
        { id: 1, name: "Taylor Swift: The Eras Tour", time: 169, IMDb_rating: 8.0, number_reviews: 25000, image: "films_photo/Taylor Swift_ The Eras Tour (2023).jpg" },
        { id: 2, name: "All Too Well", time: 15, IMDb_rating: 8.4, number_reviews: 19000, image: "films_photo/All Too Well (2021).jpg" },
        { id: 3, name: "Miss Americana", time: 85, IMDb_rating: 7.4, number_reviews: 26000, image: "films_photo/Miss Americana (2020).jpg" },
        { id: 4, name: "Taylor Swift: Reputation Stadium Tour", time: 125, IMDb_rating: 8.4, number_reviews: 8300, image: "films_photo/Taylor Swift_ Reputation Stadium Tour (2018).jpg" },
        { id: 5, name: "Taylor Swift: The 1989 World Tour Live", time: 132, IMDb_rating: 8.8, number_reviews: 2600, image: "films_photo/Taylor Swift_ The 1989 World Tour Live (2015).jpg" },
        { id: 6, name: "Green Book", time: 130, IMDb_rating: 8.2, number_reviews: 657000, image: "films_photo/Green Book (2018).jpg" },
        { id: 7, name: "Oppenheimer", time: 180, IMDb_rating: 8.3, number_reviews: 948000, image: "films_photo/Oppenheimer (2023).jpg" },
        { id: 8, name: "Forrest Gump", time: 142, IMDb_rating: 8.8, number_reviews: 2400000, image: "films_photo/Forrest Gump (1994).jpg" },
        { id: 9, name: "Lucy", time: 89, IMDb_rating: 6.4, number_reviews: 567000, image: "films_photo/Lucy (2014).jpg" }
    ];
    renderFilms();
}
