const container = document.querySelector('.container');
const video = document.getElementById('video')

document.querySelector('.play').addEventListener('click', (e) => {
    if (video.paused) {
        video.play();
        e.target.innerHTML = '<i class="fa-solid fa-pause"></i>  Pause';
    } else {
        video.pause();
        e.target.innerHTML = '<i class="fa-solid fa-play"></i> Play';
    }
})


const SEARCH_URL = "http://www.omdbapi.com/?apikey=db8270ee&s=";

const getMovies = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        showMovies(data.Search);
    } catch (error) {
        return;
    }
}


const movie_search = ['movie', 'action', 'thriller', 'action', 'comedy', 'web', 'hacker', 'computer', 'crime', 'horror'];

movie_search.forEach((item) => {
    getMovies(SEARCH_URL + item);
})

let i = 0;
const showMovies = (data) => {
    const h4 = document.createElement('h4');
    h4.innerHTML = `${movie_search[i++]}`;
    container.appendChild(h4);
    const cards = document.createElement('div');
    cards.classList.add("cards");
    container.appendChild(cards);
    let cardCount = 0;
    data.forEach((movie) => {
        if (cardCount < 7) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
          <div class="card">
              <img src="${movie.Poster}">
                <div class="overlay">
                    <h2>${movie.Title}</h2>
                    <p>${movie.Year}</p>
                    <p>${movie.Type}</p>
                </div>
           </div>
            `;
            cards.appendChild(card);
        }
        cardCount++;
    });
}
