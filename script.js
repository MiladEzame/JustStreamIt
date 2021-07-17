// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("button1");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}

document.getElementById('button1').addEventListener('click', loadMovie);

function loadMovie(){

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/api/v1/titles/2646', true)

    xhr.onload = function(){
    if(this.status == 200){
        var movie = JSON.parse(this.responseText);
        
        var output = '';
        output += '<ul>' + 
        '<img src = "' + movie.image_url + '"</img src>' + 
        '<li>Genre(s): ' + movie.genres + '</li>' + 
        '<li>Published : ' + movie.date_published + '</li>' + 
        '<li>Title : ' + movie.title + '</li>' + 
        '<li>Rated : ' + movie.rated + '</li>' + 
        '<li>IMDB Score : ' + movie.imdb_score + '</li>' +
        '<li>Director(s) : ' + movie.directors + '</li>' + 
        '<li>Actors : ' + movie.actors + '</li>' + 
        '<li>Duration : ' + movie.duration + '</li>' + 
        '<li>Box Office Result : ' + movie.avg_vote + '</li>' + 
        '<li>Description : ' + movie.description + '</li>'        
        '</ul>';
        document.getElementById('movie').innerHTML = output;
        }
    }
    
    xhr.send();
}