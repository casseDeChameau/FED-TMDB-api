// * -------------------------------- VARIABLES

let xhr = new XMLHttpRequest();
let myKey = '4250bfd9b87434db15ff28ef57ec3c08';
let tmdbApiUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=' + myKey + '&language=en-US&page-1';
let btn = document.querySelector('button');
let searchRequest = document.querySelector('[name="search-movie"]');

let movieWrap = document.querySelector('.movies-wrapper');


// * -------------------------------- METHODS

function newFrame(movie) {
    // créer une div et la remplir avec le code ci dessous
    let curDiv = document.createElement('div');
    curDiv.classList.add('movie-frame');
    curDiv.innerHTML =
        '   <h2 class="movie-title">' + movie.original_title + '</h2>' +
        '   <img src="https://image.tmdb.org/t/p/w500' + movie.poster_path + '" alt="" class="movie-img">' +
        '   <p class="movie-synop">' + movie.overview + '</p>' +
        '   <div class="rate-wrap">' +
        '      <div class="movie-rate" style="width:' + (movie.vote_average * 10) + '%"></div>' +
        '   </div>';
    movieWrap.appendChild(curDiv);
}

function myAjaxFunction() {
    if (this.status == 200 && this.readyState == 4) {
        let monJSON = JSON.parse(this.responseText);
        monJSON.results.forEach((movie) => {
            newFrame(movie);
        });
    }
}

function myCallAjax() {
    xhr.open('GET', tmdbApiUrl, true);
    xhr.send();
}

// function watchForSearch() {}

// * -------------------------------- APPLICATION

xhr.addEventListener('readystatechange', myAjaxFunction);
window.addEventListener('load', myCallAjax);
// btn.addEventListener('click', myCallAjax);
// searchRequest.addEventListener('focusin', watchForSearch);


// for (let i = 0; i < monJSON.results.length; i++) {
//     console.log(i, monJSON.results[i].adult, );
// }
// monJSON.results.forEach(function(movie, i) {
//     console.log(movie.original_language);
// });