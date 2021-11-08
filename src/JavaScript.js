function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Today", "Sunday", "Monday", "Tuesday", "Wednesday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
              <div class="col predicted">
                <div class="day today"><strong> ${day} </strong></div>
                <div class="weatherEmoji">⛅️</div>
                <div class="highlow">
                  <span>
                    <strong> <span id="today-highest"> 12</span>° </strong>
                  </span>
                  <span> <span id="today-lowest"> 8</span>°</span>
                </div>
              </div>
            `;
  });

  forecast.innerHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f3bef9023a23b4fd07956b5566d08cb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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

function showTemp(response) {
  let city = response.data.name;
  let tempC = Math.round(response.data.main.temp);
  celciusTemperature = response.data.main.temp;
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let country = response.data.sys.country;
  let feelsLike = Math.round(response.data.main.feels_like);
  feelsLikeTempC = feelsLike;
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
  getForecast(response.data.coord);
  let changeIcon = document.querySelector("#icon");
  if (
    response.data.weather[0].icon === "04n" ||
    response.data.weather[0].icon === "04d"
  ) {
    changeIcon.innerHTML = "☁️";
  } else {
    if (
      response.data.weather[0].icon === "03n" ||
      response.data.weather[0].icon === "03d"
    ) {
      changeIcon.innerHTML = "🌥";
    } else {
      if (
        response.data.weather[0].icon === "13n" ||
        response.data.weather[0].icon === "13d"
      ) {
        changeIcon.innerHTML = "❄️";
      } else {
        if (
          response.data.weather[0].icon === "50n" ||
          response.data.weather[0].icon === "50d"
        ) {
          changeIcon.innerHTML = "🌫";
        } else {
          if (
            response.data.weather[0].icon === "02n" ||
            response.data.weather[0].icon === "02d"
          ) {
            changeIcon.innerHTML = "⛅️";
          } else {
            if (
              response.data.weather[0].icon === "01n" ||
              response.data.weather[0].icon === "01d"
            ) {
              changeIcon.innerHTML = "☀️";
            } else {
              if (
                response.data.weather[0].icon === "09n" ||
                response.data.weather[0].icon === "09d"
              ) {
                changeIcon.innerHTML = "🌧";
              } else {
                if (
                  response.data.weather[0].icon === "10n" ||
                  response.data.weather[0].icon === "10d"
                ) {
                  changeIcon.innerHTML = "🌦";
                } else {
                  if (
                    response.data.weather[0].icon === "11n" ||
                    response.data.weather[0].icon === "11d"
                  ) {
                    changeIcon.innerHTML = "🌩";
                  } else {
                    if (description === "tornado") {
                      changeIcon.innerHTML = "🌪";
                    } else {
                      if (
                        description === "thunderstorm with light rain" ||
                        description === "thunderstorm with rain" ||
                        description === "thunderstorm with heavy rain" ||
                        description === "thunderstorm with heavy drizzle"
                      ) {
                        changeIcon.innerHTML = "⛈";
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;

  let apiKey = "f3bef9023a23b4fd07956b5566d08cb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

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

function changeToCelsius(event) {
  event.preventDefault();
  tempCelcius.classList.add("active");
  tempFahrenheit.classList.remove("active");
  let displayCelcius = document.querySelector("#temperature");
  displayCelcius.innerHTML = Math.round(celciusTemperature);
  let displayFeelsLikeC = document.querySelector("#feels-like");
  displayFeelsLikeC.innerHTML = Math.round(feelsLikeTempC);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  tempCelcius.classList.remove("active");
  tempFahrenheit.classList.add("active");
  let tempF = Math.round((celciusTemperature * 9) / 5 + 32);
  let displayFahrenheit = document.querySelector("#temperature");
  displayFahrenheit.innerHTML = tempF;
  let feelsLikeTempF = Math.round((feelsLikeTempC * 9) / 5 + 32);
  let displayFeelsLikeF = document.querySelector("#feels-like");
  displayFeelsLikeF.innerHTML = feelsLikeTempF;
}

let now = new Date();
showDate(now);

navigator.geolocation.getCurrentPosition(getCurrentCoords);

let currentLocation = document.querySelector("#submit-input");
currentLocation.addEventListener("click", searchCurrentLocation);

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCity);

let tempCelcius = document.querySelector("#temp-celsius");
tempCelcius.addEventListener("click", changeToCelsius);

let tempFahrenheit = document.querySelector("#temp-fahrenheit");
tempFahrenheit.addEventListener("click", changeToFahrenheit);

let celciusTemperature = "null";
let feelsLikeTempC = "null";
