//!!NEXT STEPS!! 
//format cards for 5-day forecast
//format current weather display
//Make local storage data persist display last searched
//Make search history buttons search the city it displays in text

//Global Variables
var searchedCities = [];
var currentWeatherContainerEl=document.querySelector("#current-weather-container");
var citySearchedInputEl = document.querySelector("#searched-city");
var forecastContainerEl = document.querySelector("#forecast-container");
var forecastTitle = document.querySelector("#forecast");
var searchHistoryEl;
var searchHistoryButtonEl = document.querySelector("#search-history-button");

//Variable to store API key
var APIKey = "61575cadc8adff6b8ca0fdec73b15a2d";

//Search bar click action function - reads user input from search bar, calls currentCityWeatherFunction and saveSearch function
$("#submit").click(function(event){
    event.preventDefault();

var city = $("#searchBar").val();
if(city){
    currentCityWeather(city);
    searchedCities.unshift({city});
    searchHistory(city);
    
}else{
    alert("Please Enter City Name");
}

saveSearch();

});

//Function to save user input to local storage
var saveSearch = function(){
    localStorage.setItem("searchedCities",JSON.stringify(searchedCities));
};

//Function to save user input as buttons
var searchHistory = function(searchHistory){

    searchHistoryEl = document.createElement("button");
    searchHistoryEl.textContent = searchHistory;
    searchHistoryEl.classList = "d-flex w-100 justify-content-center border btn-light rounded p-2 mb-3 mt-3"
    searchHistoryEl.setAttribute("data-city", searchHistory)
    searchHistoryEl.setAttribute("type","submit");

    searchHistoryButtonEl.prepend(searchHistoryEl);

};

//Function for Current Weather API Call
var currentCityWeather = function(city){
var queryCurrentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
fetch(queryCurrentWeatherURL)
.then(function(response){
    response.json().then(function(data){
        displayCurrentWeather(data,city);
        });
    });
};

//Function for displaying current weather data for searched city inline at top of Weather Dashboard
var displayCurrentWeather =function(weather,searchedCity){
    currentWeatherContainerEl.textContent="";
    citySearchedInputEl.textContent=searchedCity;

//Format date element and append to searched city
var currentDate = document.createElement("SPAN");
currentDate.textContent=" (" + moment(weather.dt.value).format('L')+ ") ";
citySearchedInputEl.appendChild(currentDate);

//Create image element and append to searched city
var weatherIcon = document.createElement("img");
weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`);
citySearchedInputEl.appendChild(weatherIcon);

//Create span element to hold Temperature data
var temperatureEl = document.createElement("SPAN");
temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
currentWeatherContainerEl.appendChild(temperatureEl);

//Create a span element to hold Windspeed data
var windSpeedEl = document.createElement("SPAN");
windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
currentWeatherContainerEl.appendChild(windSpeedEl);

//Create a span element to hold Humidity data
var humidityEl = document.createElement("SPAN");
humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
currentWeatherContainerEl.appendChild(humidityEl);

//Select lat and lon needed for the 5-day forecast API call
var lat = weather.coord.lat;
var lon = weather.coord.lon;
getLatLon(lat,lon)

};

//API Call - Five-Day Forecast
var getLatLon = function(lat,lon){
    var apiFiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
    fetch(apiFiveDayURL)
    .then(function(response){
        response.json().then(function(data){
            displayFiveDayForecast(data);
        })
    })

};

//Function for displaying five-day forecast data for searched city
var displayFiveDayForecast =function(weather){
    forecastContainerEl.textContent="";
    forecastTitle.textContent= "5-Day Forecast:";

    var forecast = weather.list;
    for(var i=5; i< forecast.length; i=i+8){
        var dailyForecast = forecast[i];

        var forecastEl=document.createElement("div");
        forecastEl.classList = "card justify-content-center bg-info text-light m-2"

        //Date
        var forecastDate = document.createElement("h5")
        forecastDate.textContent= moment.unix(dailyForecast.dt).format('L');
        forecastDate.classList = "card-header m-2"
        forecastEl.appendChild(forecastDate);

        //Icon
        var weatherIcon = document.createElement("img")
        weatherIcon.classList = "card-body";
        weatherIcon.setAttribute("src",`https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);
        forecastEl.appendChild(weatherIcon);

        //Temperature
        var forecastTempEl=document.createElement("SPAN");
        forecastTempEl.classList = "card-body text-left h6";
        forecastTempEl.textContent = "Temp: " + dailyForecast.main.temp + " °F";
        forecastEl.appendChild(forecastTempEl);

        //Wind
        var forecastWindEl=document.createElement("SPAN");
        forecastWindEl.classList="card-body text-left h6";
        forecastWindEl.textContent = "Wind: "+dailyForecast.wind.speed + " MPH";
        forecastEl.appendChild(forecastWindEl);

        //Humidity
        var forecastHumidityEl=document.createElement("SPAN");
        forecastHumidityEl.classList="card-body text-left h6";
        forecastHumidityEl.textContent = "Humidity: "+dailyForecast.main.humidity + " %";
        forecastEl.appendChild(forecastHumidityEl);



        forecastContainerEl.appendChild(forecastEl);

    };

};