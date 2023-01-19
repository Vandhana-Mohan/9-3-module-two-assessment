// To ensure Cypress tests work as expected, add any code/functions that you would like to run on page load inside this function
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
//const { generate } = require("fast-glob/out/managers/tasks");
// So that testing can work as expected for now A non-hacky solution is being researched

 const BASE_URL = "https://resource-ghibli-api.onrender.com";
 const PEOPLE_URL = `${BASE_URL}/people`
 const FILMS_URL = `${BASE_URL}/films`
 const movieTitles = document.querySelector("#titles")
 const display__movieInfo = document.querySelector("#display-info")
 const display__movieHeading = document.querySelector("#movie__heading")
 const display__movieReleaseYear = document.querySelector("#movie__release")           
 const display__movieDescription = document.querySelector("#movie__description")              

 function run() {
 // Add code you want to run on page load here
    fetch (FILMS_URL)
        .then((response)=>response.json())
        .then((results)=>{
            console.log(results)
            generateMovieTitles(results)
    })
}
setTimeout(run, 1000);

function generateMovieTitles(results){
    results.forEach((movie) => {
        const option__title = document.createElement("option");
        option__title.value = movie.id;
        option__title.textContent = movie.title
        movieTitles.append(option__title)
    });
    movieTitles.addEventListener("change", (event) => { updateMovieInfo(results, event) });
}

function updateMovieInfo(results, event) {
    event.preventDefault();
    const selectedId = event.target.value
    const movie = results.find((movie) => movie.id === selectedId)
    display__movieHeading.textContent = movie.title;
    display__movieReleaseYear.textContent = movie.release_date;
    display__movieDescription.textContent = movie.description;
}





