const swiper = new Swiper(".swiper-container", {
    direction: 'horizontal',
      slidesPerView: 3,
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

var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
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
        bestMovieOutput += '<img src = "' + data.results[0].image_url + '"></img src>';
        document.getElementById("img-movie").innerHTML = bestMovieOutput;
    });
    getBestMovieData(link);   
}

function bestMovieImage(){
    bestMovieOutput = "";
    link = 'http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score';
    fetch(link)
    .then(res => res.json())
    .then(data => {
        bestMovieOutput += '<img src = "' + data.results[0].image_url + '"></img src>';
        document.querySelector(".bestmovie-container").innerHTML = bestMovieOutput;
    });
}

function getBestMovieData(url){
    moviedata = "";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        moviedata += "<div class='movie-title'> " +
        "<h1>"  + data.results[0].title + '</h1></div><br>' + 
        "<div class='release-info'><br> " +
        "<table><tr><th>Genre: "  + data.results[0].genres + "</th>" +
        "<th>Published: "  + data.results[0].date_published + "</th>" +
        "<th>Duration: "  + data.results[0].duration + "</th></tr></table></div>" +
        "<div class='ratings'><br> " +
        "<table><tr><th>Rated: "  + data.results[0].rated + "</th>" +
        "<th>IMDB score: "  + data.results[0].imdb_score + "</th>" +
        "<th>Box Office Rating: "  + data.results[0].avg_vote + "</th></tr></table></div>" +
        "<p><br>Description: " + data.results[0].description + "</p>" +
        "<br>Casting: " + data.results[0].actors;
        document.getElementById("movie").innerHTML = moviedata;
    });
}


/* get the images of the different movies within the same page */
function getMoviesData(){
    output = ""
    fetch("http://localhost:8000/api/v1/titles/")
    .then(res => res.json())
    .then(data => {
        for (let i=0; i<data.results.length; i++){
            output += '<br><img src = "' + data.results[i].image_url + '"</img src>'
            document.querySelector(".categorythree").innerHTML = output;
        }
    })
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


function getBestMovieData(url){
    moviedata = "";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        moviedata += "<div class='movie-title'> " +
        "<h1>"  + data.results[0].title + '</h1></div><br>' + 
        "<div class='release-info'><br> " +
        "<table><tr><th>Genre: "  + data.results[0].genres + "</th>" +
        "<th>Published: "  + data.results[0].date_published + "</th>" +
        "<th>Duration: "  + data.results[0].duration + "</th></tr></table></div>" +
        "<div class='ratings'><br> " +
        "<table><tr><th>Rated: "  + data.results[0].rated + "</th>" +
        "<th>IMDB score: "  + data.results[0].imdb_score + "</th>" +
        "<th>Box Office Rating: "  + data.results[0].avg_vote + "</th></tr></table></div>" +
        "<p><br>Description: " + data.results[0].description + "</p>" +
        "<br>Casting: " + data.results[0].actors;
        document.getElementById("movie").innerHTML = moviedata;
    });
}


bestMovieImage();
getBestRatedMovies();
getBestRatedActionMovies();
getBestRatedRomanceMovies();
getBestRatedComedyMovies();