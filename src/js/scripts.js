// * -------------------------------- VARIABLES

let xhr = new XMLHttpRequest();
let myKey = '4250bfd9b87434db15ff28ef57ec3c08';
let upcomingUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=4250bfd9b87434db15ff28ef57ec3c08&language=en-US&page-1';
let trendingUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=4250bfd9b87434db15ff28ef57ec3c08&language=en-US&page=1';
// let filmUrl = 
// let Url = documentary
// let Url = series
let btn1 = document.querySelector('trending');
let btn2 = document.querySelector('film');
let btn3 = document.querySelector('documentary');
let btn4 = document.querySelector('serie');
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

let monJSON;

function myAjaxFunction() {
    if (this.status == 200 && this.readyState == 4) {
        monJSON = JSON.parse(this.responseText);
        monJSON.results.forEach((movie) => {
            newFrame(movie);
        });
    }
}

function myCallAjax(url) {
    xhr.addEventListener('readystatechange', myAjaxFunction);
    xhr.open('GET', url, true);
    xhr.send();
}

// function watchForSearch() {}

// * -------------------------------- APPLICATION

window.addEventListener('load', function() { myCallAjax(upcomingUrl) });
// logo.addEventListener('click', function() { myCallAjax(upcomingUrl) });



// btn1.addEventListener('click',  });
// btn2.addEventListener('click', myCallAjax);
// btn3.addEventListener('click', myCallAjax);
// btn4.addEventListener('click', myCallAjax);


// btn.addEventListener('click', myCallAjax);
// searchRequest.addEventListener('focusin', watchForSearch);



/* 
for (let i = 0; i < monJSON.results.length; i++) {
    console.log(i, monJSON.results[i].adult, );
}

monJSON.results.forEach(function(movie, i) {
    console.log(movie.original_language);
});

monJSON.results.forEach((movie) => {
   newFrame(movie);
}); 
*/
// ex 1 : faire une recherche sur TOUS les films
// ex 2 : faire un affichage par genre (upcoming(home) film docu ...))
// ex 3 : trier le résultat affiché upcoming