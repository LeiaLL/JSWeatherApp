function showDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let displayDate = `${day}, ${hours}:${min}`;

  let currentDate = document.querySelector("#currently");
  currentDate.innerHTML = displayDate;
}

let now = new Date();
showDate(now);

function showTemp(response) {
  let city = response.data.name;
  let tempC = Math.round(response.data.main.temp);
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let country = response.data.sys.country;
  let feelsLike = Math.round(response.data.main.feels_like);
  let displayTemp = document.querySelector("#temperature");
  displayTemp.innerHTML = Math.round(tempC);
  let displayHumidity = document.querySelector("#humidity-percentage");
  displayHumidity.innerHTML = humidity;
  let displayWind = document.querySelector("#wind-speed");
  displayWind.innerHTML = wind;
  let displayCountry = document.querySelector("#country");
  displayCountry.innerHTML = country;
  let displayCity = document.querySelector("#current-city");
  displayCity.innerHTML = city;
  let displayMaxTemp = document.querySelector("#today-highest");
  displayMaxTemp.innerHTML = maxTemp;
  let displayMinTemp = document.querySelector("#today-lowest");
  displayMinTemp.innerHTML = minTemp;
  let displayDescription = document.querySelector("#weather-description");
  displayDescription.innerHTML = description;
  let displayFeelsLike = document.querySelector("#feels-like");
  displayFeelsLike.innerHTML = feelsLike;
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;

  let apiKey = "f3bef9023a23b4fd07956b5566d08cb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCity);

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentCoords);
}

function getCurrentCoords(response) {
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  let apiKey = "f3bef9023a23b4fd07956b5566d08cb0";
  let apiUrlByCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlByCoords).then(showTemp);
}

let currentLocation = document.querySelector("#submit-input");
currentLocation.addEventListener("click", searchCurrentLocation);

navigator.geolocation.getCurrentPosition(getCurrentCoords);

function changeToCelsius(event) {
  let tempC = 24;
  event.preventDefault();
  let displayCelcius = document.querySelector("#temperature");
  displayCelcius.innerHTML = Math.round(tempC);
}

let tempCelcius = document.querySelector("#temp-celsius");
tempCelcius.addEventListener("click", changeToCelsius);

function changeToFahrenheit(event) {
  event.preventDefault();
  let tempC = 24;
  let tempF = Math.round((tempC * 9) / 5 + 32);
  let displayFahrenheit = document.querySelector("#temperature");
  displayFahrenheit.innerHTML = tempF;
}

let tempFahrenheit = document.querySelector("#temp-fahrenheit");
tempFahrenheit.addEventListener("click", changeToFahrenheit);
