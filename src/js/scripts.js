// * ------------------------------------------------ VARIABLES
// const noSpecificOrder, alpahticalOrder;
let xhr, monJSON, currentUrl;
let logo = document.querySelector('.header h1');
let movieWrap = document.querySelector('.movies-wrapper');
let btn1 = document.querySelector('.btn1');
let btn2 = document.querySelector('.btn2');
let btn3 = document.querySelector('.btn3');
let btn4 = document.querySelector('.btn4');
let searchRequest = document.querySelector('[name="search-movie"]');
let sortBtn = document.querySelectorAll('.sort .sort-btn');
let noPoster = 'http://underscoremusic.co.uk/site/wp-content/uploads/2014/05/no-poster.jpg';
let movieFramesArray = document.querySelectorAll('.movie-frame')
    // * ------------------------------------------------- FUNCTIONS
function initFrame() {
    myCallAjax('https://api.themoviedb.org/3/movie/upcoming?api_key=4250bfd9b87434db15ff28ef57ec3c08&language=en-US&page-1');
}

function cleanWrapper() {
    movieWrap.innerHTML = '';
}

function newFrame(movie) {
    let curDiv = document.createElement('div');
    curDiv.classList.add('movie-frame');
    curDiv.id = movie.id;
    curDiv.innerHTML =
        '<h2 class="movie-title">' + (movie.original_title ? movie.original_title : movie.original_name) + '</h2>' +
        '<img src=' + (movie.poster_path ? ('"https://image.tmdb.org/t/p/w500' + movie.poster_path) : noPoster) + '" alt="" class="movie-img">' +
        '<p class="movie-synop">' + movie.overview + '</p>' +
        '<div class="rate-wrap">' +
        '   <div class="movie-rate" style="width:' + (movie.vote_average * 10) + '%"></div>' +
        '</div>';
    movieWrap.appendChild(curDiv);
}

function mySort(a, b, sortOrder) {
    switch (sortOrder) {
        case 0:
            { return (a.original_title ? a.original_title.localeCompare(b.original_title) : a.original_name.localeCompare(b.original_name)); }
        case 1:
            { return a.vote_count < b.vote_count ? 1 : a.vote_count > b.vote_count ? -1 : 0; }
        case 2:
            {
                a = (a.release_date ? a.release_date.split('/').join('') : a.first_air_date.split('/').join(''));
                b = (b.release_date ? b.release_date.split('/').join('') : b.first_air_date.split('/').join(''));
                return a < b ? 1 : a > b ? -1 : 0;
            }
        default:

            return;
    }
}

function arrangeFrame(sortOrder) {
    if (sortOrder == -1) {
        cleanWrapper();
    }
    monJSON.results.sort((a, b) => { return mySort(a, b, sortOrder) }).forEach((movie, i) => {
        if (sortOrder == -1) {
            newFrame(movie);
        } else
            document.getElementById(movie.id).style.order = i;
    });
}

function myAjaxFunction(sortOrder, caller) {
    if (caller.status == 200 && caller.readyState == 4) {
        monJSON = JSON.parse(caller.responseText);
        arrangeFrame(sortOrder);
    }
}

function myCallAjax(url, sortOrder = -1) {
    xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
        myAjaxFunction(sortOrder, this);
    });
    xhr.open('GET', url, true);
    xhr.send();
    currentUrl = url;
}

function watchForSearch() {
    let requestUrl = 'https://api.themoviedb.org/3/search/movie?api_key=4250bfd9b87434db15ff28ef57ec3c08&language=en-US&query=' + searchRequest.value + '&page=1&include_adult=false';
    myCallAjax(requestUrl);
    this.addEventListener('focusout', () => this.value = '');
}

// function showDetails() {
//     evenTarget.classList.add('show-details');
// }
// * ------------------------------------------------------ APPLICATION
btn1.addEventListener('click', () => { myCallAjax('https://api.themoviedb.org/3/movie/popular?api_key=4250bfd9b87434db15ff28ef57ec3c08&language=en-US&page=1') });
btn2.addEventListener('click', () => { myCallAjax('https://api.themoviedb.org/3/movie/top_rated?api_key=4250bfd9b87434db15ff28ef57ec3c08&language=en-US&page=1') });
btn3.addEventListener('click', () => { myCallAjax('https://api.themoviedb.org/3/tv/popular?api_key=4250bfd9b87434db15ff28ef57ec3c08&language=en-US&page=1') });
btn4.addEventListener('click', () => { myCallAjax('https://api.themoviedb.org/3/tv/top_rated?api_key=4250bfd9b87434db15ff28ef57ec3c08&language=en-US&page=1') });
sortBtn.forEach((item, i) => {
    item.addEventListener('click', () => { arrangeFrame(i) });
});
// sortBtn.forEach = arrangeFrame;
searchRequest.addEventListener('keyup', watchForSearch);
movieFramesArray.forEach((movieFrame) => movieFrame.addEventListener('click', showDetails));