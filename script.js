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
    li.innerHTML = `<div class='movie-item card'>
        <span>${movie.title}</span>${
        movie.updated_at
            ? ' edited: ' + moment(movie.updated_at).format('MMM,DD,YYYY')
            : movie.created_at
            ? ' created at: ' + moment(movie.created_at).format('MMM,DD,YYYY')
            : ''
    }
        <button class='delete error'>DELETE</button>
        <button class='edit'>EDIT</button>
        <button id="${movie.id}" class='watched warning'>NOT WATCHED</button>
        </div>

        `;
}

console.log(document.querySelectorAll('.watched').parentElement);

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

function deleteMovie(data) {
    fetch(url + '/' + `${data.parentElement.parentElement.id}`, {
        method: 'DELETE',
    }).then(() => data.parentElement.parentElement.remove());
}

function updateMovie(edited) {
    const movieText = document.getElementById('movie-field').value;
    fetch(url + '/' + `${edited.parentElement.parentElement.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: movieText,
            updated_at: moment().format(),
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            renderMovieText(edited.parentElement.parentElement, data);
        });
}

movieList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        deleteMovie(e.target);
    }
    if (e.target.classList.contains('edit')) {
        updateMovie(e.target);
    }
    if (e.target.classList.contains('watched')) {
        watchedButton(e.target);
        e.target.innerText === 'NOT WATCHED' ? (e.target.innerText = 'WATCHED', e.target.classList.remove('warning'), e.target.classList.add('success')): e.target.innerText = 'NOT WATCHED'


    }
});

function watchedButton(movieObj) {
    console.log(movieObj);
    const buttontext = document.getElementById(`${movieObj.id}`);
        fetch(url + '/' + `${movieObj.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.watched === true) {
                    fetch(url + '/' + `${movieObj.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            watched: false

                    })
                }
                )} else {
                    fetch(url + '/' + `${movieObj.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        watched: true

                    })}) 
            
                    
            
    
}})}

listMovies();
