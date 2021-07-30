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
const sorted_by_score = "sort_by=+-imdb_score";
const sort_genre = "genre="
const nb_page = "page="

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var bestMovieBtn = document.getElementById("bestmovie-image");
var bestMoviesSwiperGenre = document.getElementById("swiperGenre");
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
        swiperGenre = moviegenres.children[i].querySelector("#swiperGenre");
        console.log(swiperGenre);
        getMovieImagesByGenre(genre, swiperGenre);
    }
}



function getMovieImagesByGenre(genre, swiperGenre){
    for (let page_image=2; page_image>0; page_image--){
        if(genre == "sort_by=+-imdb_score"){
            genre = ""
        }
        fetch(base_url + "?genre=" + genre + "&page=" + page_image + "&" + sorted_by_score)
        .then(res => res.json())
        .then(data => {
            for (let i=0; i<data.results.length; i++){
                var imgElem = document.createElement("img");
                var newDiv = document.createElement("div");
                newDiv.className = "swiper-slide";
                imgElem.setAttribute('id', "img-swiper");
                imgElem.setAttribute('src', data.results[i].image_url);
                var movie_id = data.results[i].id;
                newDiv.appendChild(imgElem);
                swiperGenre.appendChild(newDiv);
                console.log(data.results[i].title)
                /*getMovieData(movie_id);*/
                if(page_image == 2 && i == 2){
                    break;
                }
            }
        })
        /* une fois l'id récupéré, appeler la fonction getMovieByGenre(id) */
    }
}

function getMovieData(id){
    full_url = base_url + id
    console.log(full_url)
    fetch(full_url)
    .then(res => res.json())
    .then(data => {
        for (let i=0; i<data.results.length; i++){
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
getGenre();