var modalBtn = document.querySelector(".modal-btn");
var modalBg = document.querySelector(".modal-bg")
var modalclose = document.querySelector(".modal-close")


modalBtn.addEventListener("click", function(){
    modalBg.classList.add('bg-active')
})

modalclose.addEventListener("click", function(){
    modalBg.classList.remove('bg-active')
})

/* SHOW INFO FOR XMLHTTPREQUEST
function show_output(output, movie){
    output += "<div class='movie-title'> " +
    "<h1>"  + movie.title + '</h1></div><br>' + 
    "<div class='release-info'><br> " +
    "<table><tr><th>Genre: "  + movie.genres + "</th>" +
    "<th>Published: "  + movie.date_published + "</th>" +
    "<th>Duration: "  + movie.duration + "</th></tr></table></div>" +
    "<div class='ratings'><br> " +
    "<table><tr><th>Rated: "  + movie.rated + "</th>" +
    "<th>IMDB score: "  + movie.imdb_score + "</th>" +
    "<th>Box Office Rating: "  + movie.avg_vote + "</th></tr></table></div>" +
    "<p><br>Description: " + movie.description + "</p>" +
    "<br>Casting: " + movie.actors;
    return output
}
*/

modalBtn.addEventListener("click", getMovie())

function loadpage(url){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true)
}

function getMovie(){
    getMovieImage();
    getMovieData();
}

function getMovieImage(){
    output2 = "";
    fetch('http://localhost:8000/api/v1/titles/2646')
    .then(res => res.json())
    .then(data => {
        output2 += '<img src = "' + data.image_url + '"</img src>';
        document.getElementById("img-movie").innerHTML = output2;
    })    
}

function getMovieData(){
    output = "";
    fetch('http://localhost:8000/api/v1/titles/2646')
    .then(res => res.json())
    .then(data => {
        output += "<div class='movie-title'> " +
        "<h1>"  + data.title + '</h1></div><br>' + 
        "<div class='release-info'><br> " +
        "<table><tr><th>Genre: "  + data.genres + "</th>" +
        "<th>Published: "  + data.date_published + "</th>" +
        "<th>Duration: "  + data.duration + "</th></tr></table></div>" +
        "<div class='ratings'><br> " +
        "<table><tr><th>Rated: "  + data.rated + "</th>" +
        "<th>IMDB score: "  + data.imdb_score + "</th>" +
        "<th>Box Office Rating: "  + data.avg_vote + "</th></tr></table></div>" +
        "<p><br>Description: " + data.description + "</p>" +
        "<br>Casting: " + data.actors;
        document.getElementById("movie").innerHTML = output;
    })    
}

/* GET INFO WITH XMLHTTPREQUEST
function loadMovie(){

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/api/v1/titles/2646', true)

    xhr.onload = function(){
    if(this.status == 200){
        var movie = JSON.parse(this.responseText);
        
        var output2 = '';
        output2 += '<img src = "' + movie.image_url + '"</img src>'
        document.getElementById("img-movie").innerHTML = output2

        var output = '';
        
        document.getElementById('movie').innerHTML = show_output(output, movie);
        }
    }
    
    xhr.send();
}
*/