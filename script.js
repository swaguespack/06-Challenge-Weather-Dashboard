//Variable to store API key
var APIKey = "61575cadc8adff6b8ca0fdec73b15a2d";

//Search bar click action
$("#submit").click(function(event){
    event.preventDefault();

//Read city from user input
var city = $("#searchBar").val();

//API Call - Current Weather Data
var queryCurrentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
fetch(queryCurrentWeatherURL)
.then(function(response){
    response.json().then(function(data){
        displayCurrentWeather(data,city);
        });
    });
});

var displayCurrentWeather 

//API Call - Geocoder

//API Call - 5-Day Forecast







