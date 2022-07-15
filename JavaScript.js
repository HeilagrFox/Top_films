const key_API = "817350e6-d022-4793-b6c1-9772da756f9d";
const API_URL_TOP100_POPULAR_page = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";
const API_URL_Search = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
Get(API_URL_TOP100_POPULAR_page+1);
async function Get(url) {
    const promise = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": key_API,
        },
    });
    const resp = await promise.json();
    Show(resp);
    
};

function Show(resp) {
    const El = document.querySelector(".movies");
    El.innerHTML = "";
    
    resp.films.forEach((movie) => {
        
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie")
        movieEl.innerHTML = `
            <div class="bigger"><img  src="${movie.posterUrlPreview}" />
            <div class="movie__title"> ${movie.nameRu}</div></div>
            <div class="block__text">
                 <p class="i">Название: ${movie.nameRu}<br>
                 Год: ${movie.year}<br>
                 Страна: ${movie.countries.map((country) => `${country.country}`)}<br>
                 Жанр: ${movie.genres.map((genre) => " "+`${genre.genre}`)}<br>
                 Рейтинг: ${movie.rating}<br>
                 Кол-во голосов: ${movie.ratingVoteCount}<br></p> 
            </div>
           
            `;
        El.appendChild(movieEl);
        
    });
};
let mapa = new Map();
mapa.set(1, "button1");
mapa.set(2, "button2");
mapa.set(3, "button3");
mapa.set(4, "button4");
mapa.set(5, "button5");
function change(num) {
    clearing();
    Get(API_URL_TOP100_POPULAR_page + num);
    let id = document.getElementById(mapa.get(num));
    id.style.background = 'black';
    id.style.color = 'white';
};
function clearing() {
    for (let i = 1; i <= 5; i++) {
        let b = document.getElementById(mapa.get(i));
        b.style.background = '';
        b.style.color = '';
    }
}

const form = document.querySelector("form");
const search = document.querySelector(".searching");
form.addEventListener("submit", (no) => {
    no.preventDefault();
    removeButtons();
    const search_URL = `${API_URL_Search}${search.value}`
    if (search.value) {
        Get(search_URL);
    }
});
function removeButtons() {
    for (let i = 1; i <= 5; i++) {
        let b = document.getElementById(mapa.get(i));
        b.parentNode.removeChild(b);
    }
};
