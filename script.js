const { listenerCount } = require("process")

const url = "http://localhost:3000/movies"

const movieList = document.getElementById("movie-list")

let movies = document.createElement('li')

const form = document.querySelector('#movie-form')

function renderMovies(movie) {
    movies.id = movie.id
    // style here

}

function listMovies() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            for (let item of data) {
                renderMovies(item)
            }
        })
}


// unfinished function
function renderMovieText(li, movie) {
    li.innerHTML = `    <span>${movie.body}</span>${movie.updated_at ? moment(movie.updated_at).format('MMM DD,YYYY') : ""
}<i class="ml2 dark-red fas fa-times delete" ></i > <i class="ml3 fas fa-edit edit"></i>

    
    `
}