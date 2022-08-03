const key_API = "817350e6-d022-4793-b6c1-9772da756f9d"; //Необходимый ключ для получения доступа к информации на сайте
const API_URL_TOP100_POPULAR_page = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";
const API_URL_Search = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
Get(API_URL_TOP100_POPULAR_page+1);
async function Get(url) { // Делаем запрос
    const promise = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": key_API,
        },
    });
    const resp = await promise.json();
    Show(resp);
    
};

function Show(resp) { // Отражаем полученную информацию в нужной нам форме на странице 
    const El = document.querySelector(".movies");
    El.innerHTML = "";
    
    resp.films.forEach((movie) => { // Отображаем каждый фильм
        
        const movieEl = document.createElement("div"); // Каждый фильм обёртывается в div
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
           
            `; // Получаем и отображаем обложку и название фильма, а также создаем текстовый (изначально скрытый) блок с доп.информацией по фильму
        El.appendChild(movieEl);
        
    });
};
let home = true; // ориентир, где мы находимся
let mapa = new Map() // Маpа связывает id кнопки с ее номером;
mapa.set(1, "button1");
mapa.set(2, "button2");
mapa.set(3, "button3");
mapa.set(4, "button4");
mapa.set(5, "button5");
function change(num) { // Меняем цвет кнопок при нажатии на них (окрашиваем нужную нам, остальные возвращаются в исходное состояние), а также отображаем фильмы запрашиваемой страницы.
    clearing();
    Get(API_URL_TOP100_POPULAR_page + num)//отображаем фильмы запрашиваемой страницы;
    let id = document.getElementById(mapa.get(num)) //Получаем id текущей кнопки;
    id.style.background = 'black';
    id.style.color = 'white';
};
function clearing() { // Функция, возвращающая цвет кнопок в исходное состояние 
    for (let i = 1; i <= 5; i++) {
        let one_button = document.getElementById(mapa.get(i)) //Получаем id текущей кнопки;
       one_button.style.background = '';
       one_button.style.color = '';
    }
}

const form = document.querySelector("form");
const search = document.querySelector(".searching");
form.addEventListener("submit", (no) => { // Функция, занимающаяся поиском фильмов
    no.preventDefault();
    if (home) {
        removeButtons();
    }
    const search_URL = `${API_URL_Search}${search.value}` //search.value - слова, введенные в поиске
    if (search.value) {
        Get(search_URL);
    }
});
function removeButtons() { //Убираем кнопки при поиске и показываем ссылку, ведущую назад на топ-100
        for (let i = 1; i <= 5; i++) {
            let one_button = document.getElementById(mapa.get(i));
            one_button.parentNode.removeChild(one_button);
        }
        let a = document.getElementById("a") // наша ссылка; 
        a.style.display = 'block';
        home = false;
    

};
