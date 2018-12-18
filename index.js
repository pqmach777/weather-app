const appKey = "2e32277c0b0574984b5bed0e8eb7dcb6";

var searchButton = document.getElementById("search-btn");
var searchInput = document.getElementById("search-txt");
var cityName = document.getElementById("city-name");
var icon = document.getElementById("icon");
var temperature = document.getElementById("temp");
var humidity = document.getElementById("humidity-div");
var wind = document.getElementById("wind-div")

function xhrAsync(url, callback){
    console.log("hello world!");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => { 
        if (xhr.readyState == 4 && xhr.status == 200)
            callback(xhr.responseText);
    }
    xhr.open("GET", url, true); 
    xhr.send();
}

function jsonResponse(response) {
    var theLocation = JSON.parse(response);
    cityName.innerHTML = theLocation.name;
    icon.src = "http://openweathermap.org/img/w/" + theLocation.weather[0].icon + ".png";
    temperature.innerHTML = Math.round(10*(theLocation.main.temp - 273))/10 + "°";
    humidity.innerHTML = theLocation.main.humidity + "%";
    wind.innerHTML = "Wind Speed: " + theLocation.wind.speed + " m/s" + "<br/>" + "Wind Direction: " + Math.round(10*(theLocation.wind.deg))/10 + "°";
}
  
function weatherDetails() {
    if (searchInput.value === "") {
    
    }else {
        var searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;
        xhrAsync(searchLink, jsonResponse);
    }
}
searchButton.addEventListener("click", weatherDetails);
searchInput.addEventListener("keyup", pressedEnter);
function pressedEnter(event) {
  if (event.key === "Enter") {
    weatherDetails();
  }
}
