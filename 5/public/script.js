const API_URL = 'http://localhost:3000/films';

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

async function loadFilms() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        films = await response.json();
        renderFilms();
    } catch (error) {
        console.error("Error loading films:", error);
        showStyledModal("Could not load films from the server. Check if the server is running.");
    }
}

async function saveFilm() {
    const filmName = document.getElementById("film-name").value;
    const filmHours = parseFloat(document.getElementById("film-hours").value); 
    const filmMinutes = parseFloat(document.getElementById("film-minutes").value); 
    
    const time = (filmHours * 60) + filmMinutes;

    const IMDb_rating = parseFloat(document.getElementById("film-IMDb-rating").value);
    const number_reviews = parseFloat(document.getElementById("film-number-reviews").value);
    const image = document.getElementById("film-image").value;

    if (time < 0) {
        showStyledModal("Total time cannot be negative!");
        return;
    }

    const filmData = {
        name: filmName,
        time: time,
        IMDb_rating: IMDb_rating, 
        number_reviews: number_reviews, 
        image: image
    };

    let response;
    
    if (editFilmId !== null) {
        response = await fetch(`${API_URL}/${editFilmId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filmData)
        });
    } else {
        response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filmData)
        });
    }

    if (!response.ok) {
        showStyledModal(`Error saving film: ${response.statusText}`);
        return;
    }

    modal.style.display = "none";
    loadFilms();
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

async function deleteFilm(id) {
    if (confirm("Are you sure you want to delete this film?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.status === 204) {
                loadFilms();
            } else {
                throw new Error(`Error deleting film: ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting film:", error);
            showStyledModal("Could not delete film from the server.");
        }
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
    loadFilms();
}
