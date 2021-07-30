const swiper = new Swiper(".swiper-container", {
    direction: 'horizontal',
	  loop:true,
    slidesPerView: 5,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});
const api_url = "http://localhost:8000/api/v1/titles/"
const base_url = "http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score";
const sorted_by_score = "sort_by=+-imdb_score";
const sort_genre = "genre="
const nb_page = "page="

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var bestMovieBtn = document.getElementById("bestmovie-image");
var bestMoviesSwiperGenre = document.querySelector(".swiper-wrapper");
var imageSwiperBtn = document.querySelector(".swiper-slide");

bestMovieBtn.onclick = function() {
    modal.style.display = "block";
    getBestMovie();
}

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function() {
    modal.style.display = "none";
});


function getBestMovie(){
    fetch(base_url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.getElementById("img-modal").src = data.results[0].image_url;
    });
    getBestMovieData(base_url);
}

function bestMovieImage(){
    fetch(base_url)
    .then(res => res.json())
    .then(data => {
        document.getElementById("bestmovie-image").src = data.results[0].image_url;
    });
}

function getBestMovieData(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        document.getElementById("modal-title").innerHTML = data.results[0].title;
        document.getElementById("modal-genre").innerHTML = "Genre: " + data.results[0].genres;
        document.getElementById("modal-published").innerHTML = "Published: " + data.results[0].date_published;
        document.getElementById("modal-duration").innerHTML = "Duration: " + data.results[0].duration;
        document.getElementById("modal-rated").innerHTML = "Rated: " + data.results[0].rated;
        document.getElementById("modal-score").innerHTML = "Imdb Score: " + data.results[0].imdb_score;
        document.getElementById("modal-office-rating").innerHTML = "Office Rating: " + data.results[0].avg_vote;
        document.getElementById("modal-description").innerHTML = "Description: " + data.results[0].description;
        document.getElementById("modal-casting").innerHTML = "Casting: " + data.results[0].actors;  
    });
}

function getGenre(){
    var moviegenres = document.querySelector(".movie-genres");
    for(let i = 0; i < moviegenres.children.length; i++){
        genre = moviegenres.children[i].className;
        swiperGenre = moviegenres.children[i].querySelector(".swiper-wrapper");
        getMovieImagesByGenre(genre, swiperGenre);
    }
}

function createImgElement(){
    for (let k=0; k < bestMoviesSwiperGenre.children.length; i++){
        var imgEl = document.createElement("img");
        bestMoviesSwiperGenre.children[k].appendChild(imgEl);
    }
}

function getMovieImagesByGenre(genre, swiperGenre){
    for (let page_image=2; page_image>0; page_image--){
        if(genre == "bestRatedMovies"){
            genre = ""
        }
        fetch(base_url + "&genre=" + genre + "&page=" + page_image)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            for (let i=0; i<data.results.length; i++){
                var imgElem = document.createElement("img");
                var newDiv = document.createElement("div");
                newDiv.className = "swiper-slide";
                imgElem.setAttribute('src', data.results[i].image_url);
                var movie_id = data.results[i].id;
                newDiv.appendChild(imgElem);
                swiperGenre.appendChild(newDiv);
                document.querySelector(".swiper-slide").addEventListener("click", function(){
                    modal.style.display = "block";
                    getMovieGenreData(movie_id);
                    getMovieImageid(movie_id);
                });
                if(page_image == 2 && i == 1){
                    break;
                }
            }
        })
    }
}

function getMovieGenreData(id){
    fetch(api_url + id)
    .then(res => res.json())
    .then(data => {
        document.getElementById("modal-title").innerHTML = data.title;
        document.getElementById("modal-genre").innerHTML = "Genre: " + data.genres;
        document.getElementById("modal-published").innerHTML = "Published: " + data.date_published;
        document.getElementById("modal-duration").innerHTML = "Duration: " + data.duration;
        document.getElementById("modal-rated").innerHTML = "Rated: " + data.rated;
        document.getElementById("modal-score").innerHTML = "Imdb Score: " + data.imdb_score;
        document.getElementById("modal-office-rating").innerHTML = "Office Rating: " + data.avg_vote;
        document.getElementById("modal-description").innerHTML = "Description: " + data.description;
        document.getElementById("modal-casting").innerHTML = "Casting: " + data.actors;  
    });
}

function getMovieImageid(id){
    fetch(api_url + id)
    .then(res => res.json())
    .then(data => {
        document.getElementById("img-modal").src = data.image_url;
    });
}

getGenre();
bestMovieImage();
getBestMovie();

