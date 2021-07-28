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
var swiperImage = document.querySelector(".swiper-wrapper");
var bestMovieBtn = document.querySelector(".bestmovie-container");
var bestMoviesBtn = document.querySelector(".swiper-slide");
var bestMoviesSwiperWrapper = document.getElementById("bestMoviesSwiper");
var bestActionMoviesSwiperWrapper = document.getElementById("bestActionMoviesSwiper");
var bestRomanceMoviesSwiperWrapper = document.getElementById("bestRomanceMoviesSwiper");
var bestComedyMoviesSwiperWrapper = document.getElementById("bestComedyMoviesSwiper");


bestComedyMoviesSwiperWrapper.addEventListener("click", function(){
    modal.style.display = "block";
    getBestRatedComedyMovies();
})

bestRomanceMoviesSwiperWrapper.addEventListener("click", function(){
    modal.style.display = "block";
    getBestRatedRomanceMovies();
})

bestActionMoviesSwiperWrapper.addEventListener("click", function(){
    modal.style.display = "block";
    getBestRatedActionMovies();
})

bestMoviesSwiperWrapper.addEventListener('click', function() {
    modal.style.display = "block";
    getBestRatedMovies();
  })
  
  // When the user clicks on <span> (x), close the modal
  span.addEventListener('click', function() {
    modal.style.display = "none";
  })

bestMovieBtn.onclick = function() {
    modal.style.display = "block";
    getBestMovie();
  }


/* Gets the image of the movie and prints it on the left
   Gets the data of the movie and prints it on the right
   of the modal 
function getMovie(){
    getMovieImage();
    getMovieData();
}*/

/* get the best rated movie */
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
            imgElem.setAttribute('src', data.results[i].image_url);
            newDiv.appendChild(imgElem);
            bestMoviesSwiperWrapper.appendChild(newDiv);
        }
    })
    getBestRatedMovies2();
}

function getBestRatedMovies2(){
    fetch("http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score&page=2")
    .then(res => res.json())
    .then(data => {
        for (let i=1; i<4; i++){
            var imgElem = document.createElement("img");
            var newDiv = document.createElement("div");
            newDiv.className = "swiper-slide" ;
            imgElem.setAttribute('src', data.results[i].image_url);
            newDiv.appendChild(imgElem);
            bestMoviesSwiperWrapper.appendChild(newDiv);
        }
    })
}

function getBestRatedActionMovies(){
    fetch("http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score&genre=Action")
    .then(res => res.json())
    .then(data => {
        for (let i=1; i<data.results.length; i++){
            var imgElem = document.createElement("img");
            var newDiv = document.createElement("div");
            newDiv.className = "swiper-slide";
            imgElem.setAttribute('src', data.results[i].image_url);
            newDiv.appendChild(imgElem);
            bestActionMoviesSwiperWrapper.appendChild(newDiv);
        }
    })
    getBestRatedActionMovies2();
}

function getBestRatedActionMovies2(){
    fetch("http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score&genre=Action&page=2")
    .then(res => res.json())
    .then(data => {
        for (let i=1; i<4; i++){
            var imgElem = document.createElement("img");
            var newDiv = document.createElement("div");
            newDiv.className = "swiper-slide" ;
            imgElem.setAttribute('src', data.results[i].image_url);
            newDiv.appendChild(imgElem);
            bestActionMoviesSwiperWrapper.appendChild(newDiv);
        }
    })
}

function getBestRatedRomanceMovies(){
    fetch("http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score&genre=Romance")
    .then(res => res.json())
    .then(data => {
        for (let i=1; i<data.results.length; i++){
            var imgElem = document.createElement("img");
            var newDiv = document.createElement("div");
            newDiv.className = "swiper-slide";
            imgElem.setAttribute('src', data.results[i].image_url);
            newDiv.appendChild(imgElem);
            bestRomanceMoviesSwiperWrapper.appendChild(newDiv);
        }
    })
    getBestRatedRomanceMovies2();
}

function getBestRatedRomanceMovies2(){
    fetch("http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score&genre=Romance&page=2")
    .then(res => res.json())
    .then(data => {
        for (let i=1; i<4; i++){
            var imgElem = document.createElement("img");
            var newDiv = document.createElement("div");
            newDiv.className = "swiper-slide" ;
            imgElem.setAttribute('src', data.results[i].image_url);
            newDiv.appendChild(imgElem);
            bestRomanceMoviesSwiperWrapper.appendChild(newDiv);
        }
    })
}

function getBestRatedComedyMovies(){
    fetch("http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score&genre=Comedy")
    .then(res => res.json())
    .then(data => {
        for (let i=1; i<data.results.length; i++){
            var imgElem = document.createElement("img");
            var newDiv = document.createElement("div");
            newDiv.className = "swiper-slide";
            imgElem.setAttribute('src', data.results[i].image_url);
            newDiv.appendChild(imgElem);
            bestComedyMoviesSwiperWrapper.appendChild(newDiv);
        }
    })
    getBestRatedComedyMovies2();
}

function getBestRatedComedyMovies2(){
    fetch("http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score&genre=Comedy&page=2")
    .then(res => res.json())
    .then(data => {
        for (let i=1; i<4; i++){
            var imgElem = document.createElement("img");
            var newDiv = document.createElement("div");
            newDiv.className = "swiper-slide" ;
            imgElem.setAttribute('src', data.results[i].image_url);
            newDiv.appendChild(imgElem);
            bestComedyMoviesSwiperWrapper.appendChild(newDiv);
        }
    })
}


bestMovieImage();
getBestRatedMovies();
getBestRatedActionMovies();
getBestRatedRomanceMovies();
getBestRatedComedyMovies();