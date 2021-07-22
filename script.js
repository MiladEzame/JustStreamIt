var modalBtn = document.querySelector(".modal-btn");
var modalBg = document.querySelector(".modal-bg")
var modalclose = document.querySelector(".modal-close")


modalBtn.addEventListener("click", function(){
    modalBg.classList.add('bg-active')
})

modalclose.addEventListener("click", function(){
    modalBg.classList.remove('bg-active')
})

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

modalBtn.addEventListener("click", loadMovie);

function loadpage(url){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true)
}

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