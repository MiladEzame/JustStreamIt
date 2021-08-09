const swiper = new Swiper(".swiper-container", {
    slidesPerView: 5,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: true,
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});
const api_url = "http://localhost:8000/api/v1/titles/"
const base_url = "http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score";
const sorted_by_score = "sort_by=+-imdb_score";

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var bestMovieBtn = document.getElementById("bestmovie-image");
var bestMoviesSwiperGenre = document.querySelector(".swiper-wrapper");

bestMovieBtn.onclick = function() {
    getBestMovie();
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function() {
    modal.style.display = "none";
});


function getBestMovie(){
    fetch(base_url)
    .then(res => res.json())
    .then(data => {
        document.getElementById("img-modal").src = data.results[0].image_url;
        var id = data.results[0].id;
        bestMovieImage(id);
        getBestMovieData(id);
    });
}

function bestMovieImage(id){
    fetch(api_url + id)
    .then(res => res.json())
    .then(data => {
        document.getElementById("bestmovie-image").src = data.image_url;
        document.getElementById("bestmovie-description").innerHTML = data.description;
    });
}

function getBestMovieData(id){
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
        document.getElementById("modal-description").innerHTML = "Description: " + data.long_description;
        document.getElementById("modal-casting").innerHTML = "Casting: " + data.actors;  
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

function getMovieImagesByGenre(genre, swiperGenre){
    for (let page_image=1; page_image<3; page_image++){
        cpt = 1;
        if(genre == "bestRatedMovies"){
            genre = ""
        }
        fetch(base_url + "&genre=" + genre + "&page=" + page_image)
        .then(res => res.json())
        .then(data => {
            for (let i=0; i<data.results.length; i++){
                var imgElem = document.createElement("img");
                var newDiv = document.createElement("div");
                newDiv.className = "swiper-slide";
                imgElem.setAttribute('src', data.results[i].image_url);
                imgElem.setAttribute("id", ("swiper-slide"+cpt))
                newDiv.appendChild(imgElem);
                swiperGenre.appendChild(newDiv);
                document.getElementById(("swiper-slide"+cpt)).addEventListener("click", function(){
                    var movie_id = data.results[i].id;
                    modal.style.display = "block";
                    return getMovieGenreData(movie_id);
                });
                cpt++;
                if(page_image == 2 && i == 1){
                    break;
                }
            }
        })
    }
}


function getMovieGenreData(id){
    getMovieImageid(id);
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
        document.getElementById("modal-description").innerHTML = "Description: " + data.long_description;
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
getBestMovie();