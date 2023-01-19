// To ensure Cypress tests work as expected, add any code/functions that you would like to run on page load inside this function
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
//const { generate } = require("fast-glob/out/managers/tasks");
// So that testing can work as expected for now A non-hacky solution is being researched

 const BASE_URL = "https://resource-ghibli-api.onrender.com";
 const PEOPLE_URL = `${BASE_URL}/people`
 const FILMS_URL = `${BASE_URL}/films`
 const movieTitles = document.querySelector("#titles")
 const display__movieHeading = document.querySelector("#movie__heading")
 const display__movieReleaseYear = document.querySelector("#movie__release")           
 const display__movieDescription = document.querySelector("#movie__description")              
 const submit__review = document.querySelector("#submit__review")
 const user__Reviews = document.querySelector("#ulUser__Reviews")
 const input__Review = document.querySelector("#review")
 const reset__Review = document.querySelector("#reset-reviews")
 const show__People = document.querySelector("#show-people")
 const ol__People = document.querySelector("#ol__people")

 let selectedMovie;

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
    movieTitles.addEventListener("change", (event) => { 
        updateMovieInfo(results, event)
    });
}

function updateMovieInfo(results, event) {
    event.preventDefault();
    const selectedId = event.target.value;
    selectedMovie = results.find((movie) => movie.id === selectedId);
    display__movieHeading.textContent = selectedMovie.title;
    display__movieReleaseYear.textContent = selectedMovie.release_date;
    display__movieDescription.textContent = selectedMovie.description;
}

submit__review.addEventListener("click", (event) => {
    event.preventDefault();
    if (selectedMovie === undefined) {
        alert("Please select a movie first");
        return;
    }
    displayUserReviews(selectedMovie);
});



function displayUserReviews(movie){
    const list__Reviews = document.createElement("li")
    list__Reviews.innerHTML = `<strong>${movie.title}:</strong> ${input__Review.value}`;
    user__Reviews.append(list__Reviews)
    input__Review.value = ""
    movieTitles.selectedIndex = 0;
}

reset__Review.addEventListener("click", (event) => {
    event.preventDefault()
    user__Reviews.innerHTML = "";
});
 

show__People.addEventListener("click", (event) => {
    event.preventDefault();
    if (selectedMovie === undefined) {
      alert("Please select a movie first");
      return;
    }
    fetch(PEOPLE_URL)
      .then((response) => response.json())
      .then((people) => {
        console.log(people)
        ol__People.innerHTML = "";
        people.forEach((person) => {
          const list__people = document.createElement("li")
          list__people.textContent = person.name;
          ol__People.append(list__people);
        });
    });
});
  