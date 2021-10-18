const url = 'http://localhost:3000/movies';

const movieList = document.getElementById('movie-list');

const form = document.querySelector('#movie-form');

const submitButton = document.getElementById('submit-movie');

function renderMovies(movie) {
    let movies = document.createElement('li');
    //assigning an individual ID to each movie
    movies.id = movie.id;
    //calling the renderMovieText function
    renderMovieText(movies, movie);
    movieList.appendChild(movies);
}

//this is called once the page is loaded and lists out on the page all of your movies in your db.json
function listMovies() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            for (let item of data) {
                renderMovies(item);
            }
        });
}

// unfinished function
function renderMovieText(li, movie) {
    li.innerHTML = `<span>${movie.title}</span>${
        movie.updated_at ? moment(movie.updated_at).format('MMM DD,YYYY') : ''
    }<i class="ml2 dark-red fas fa-times delete" ></i > <i class="ml3 fas fa-edit edit"></i>`;
}

function createMovie(movieText) {
    fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            title: movieText,
            watched: false,
            created_at: moment().format(),
        }),
    })
        .then((res) => res.json())
        .then((data) => renderMovies(data));
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const movieText = document.getElementById('movie-field').value;
    console.log(movieText);
    createMovie(movieText);
    form.reset();
});

listMovies();
