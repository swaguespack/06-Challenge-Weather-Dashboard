//Variable to store API key
var APIKey = "61575cadc8adff6b8ca0fdec73b15a2d";

//Variables to store user input
var city;
var state;
var country;

//API Call - Geocoder

//API Call - Current Weather Data
var queryCurrentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city, state, country + "&appid=" + APIKey;
fetch(queryCurrentWeatherURL);

//API Call - 5-Day Forecast

