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
const base_url = "http://localhost:8000/api/v1/titles/";
const sorted_by_score = "?sort_by=+-imdb_score";
const sort_genre = "?genre="
const nb_page = "?page="

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var bestMovieBtn = document.getElementById("bestmovie-image");
var bestMoviesSwiperWrapper = document.getElementById("bestMoviesSwiper");
var bestActionMoviesSwiperWrapper = document.getElementById("bestActionMoviesSwiper");
var bestRomanceMoviesSwiperWrapper = document.getElementById("bestRomanceMoviesSwiper");
var bestComedyMoviesSwiperWrapper = document.getElementById("bestComedyMoviesSwiper");
var imageSwiperBtn = document.getElementById("img-swiper");

bestMovieBtn.onclick = function() {
    modal.style.display = "block";
    getBestMovie();
}

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function() {
    modal.style.display = "none";
});


function getBestMovie(){
    bestMovieOutput = "";
    link = 'http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score';
    fetch(link)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.getElementById("img-modal").src = data.results[0].image_url;
    });
    getBestMovieData(link);   
}

function bestMovieImage(){
    bestMovieOutput = "";
    link = 'http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score';
    fetch(link)
    .then(res => res.json())
    .then(data => {
        document.getElementById("bestmovie-image").src = data.results[0].image_url;
    });
}

/* remettre tout le html dans le fichier html. NE pas passer de balise, juste passer l'id/class. 
   Quand je click sur une image, passer l'url + id en parametre et utiliser cet url pour alimenter la modal.
   Carousel : n'avoir plus qu'une fonction et passer le genre et nb de pages en paramètre.
   Créer les slides div + img. Faire une fonction qui affiche toutes les images.
   Créer un eventlistener onclick, appeler les méthodes de récupération de données
   et les afficher dans la modal. 

   */

function getBestMovieData(url){
    console.log(url);
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

function getBestRatedMovies(){
    fetch("http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score")
    .then(res => res.json())
    .then(data => {
        for (let i=1; i<data.results.length; i++){
            var imgElem = document.createElement("img");
            var newDiv = document.createElement("div");
            newDiv.className = "swiper-slide";
            imgElem.setAttribute('id', "img-swiper");
            imgElem.setAttribute('src', data.results[i].image_url);
            console.log(imgElem)
            newDiv.appendChild(imgElem);
            bestMoviesSwiperWrapper.appendChild(newDiv);
        }
    })
}

function getMovieImagesByGenre(){
    genre = document.querySelector(".Action").className
    var movie_id = ""
    for (let page=1; page<3; page++){
        fetch(base_url + "?genre=" + genre + "&page=" + page)
        .then(res => res.json())
        .then(data => {
            for (let i=1; i<data.results.length; i++){
                var imgElem = document.createElement("img");
                var newDiv = document.createElement("div");
                newDiv.className = "swiper-slide";
                imgElem.setAttribute('id', "img-swiper");
                imgElem.setAttribute('src', data.results[i].image_url);
                movie_id = data.results[i].id;
                console.log(imgElem)
                newDiv.appendChild(imgElem);
                bestMoviesSwiperWrapper.appendChild(newDiv);
                getMovieByGenre(id);
            }
        })
        /* une fois l'id récupéré, appeler la fonction getMovieByeGenre(id) */
    }
}

function getMovieByGenre(id){
    fetch(base_url + id)
    .then(res => res.json())
    .then(data => {
        for (let i=1; i<data.results.length; i++){
            document.getElementById("modal-title").innerHTML = data.results[i].title;
            document.getElementById("modal-genre").innerHTML = "Genre: " + data.results[0].genres;
            document.getElementById("modal-published").innerHTML = "Published: " + data.results[i].date_published;
            document.getElementById("modal-duration").innerHTML = "Duration: " + data.results[i].duration;
            document.getElementById("modal-rated").innerHTML = "Rated: " + data.results[i].rated;
            document.getElementById("modal-score").innerHTML = "Imdb Score: " + data.results[i].imdb_score;
            document.getElementById("modal-office-rating").innerHTML = "Office Rating: " + data.results[i].avg_vote;
            document.getElementById("modal-description").innerHTML = "Description: " + data.results[i].description;
            document.getElementById("modal-casting").innerHTML = "Casting: " + data.results[i].actors;  
        }
    });
}


bestMovieImage();
getBestRatedMovies();
getMovieImagesByGenre();