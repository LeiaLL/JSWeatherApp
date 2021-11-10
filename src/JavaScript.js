function changeIcon(icon, description) {
  let emoji = "";

  if (icon === "04n" || icon === "04d") {
    emoji = "☁️";
  } else if (icon === "03n" || icon === "03d") {
    emoji = "🌥";
  } else if (icon === "13n" || icon === "13d") {
    emoji = "❄️";
  } else if (icon === "50n" || icon === "50d") {
    emoji = "🌫";
  } else if (icon === "02n" || icon === "02d") {
    emoji = "⛅️";
  } else if (icon === "01d") {
    emoji = "☀️";
  } else if (icon === "01n") {
    emoji = "🌙 ";
  } else if (icon === "09n" || icon === "09d") {
    emoji = "🌧";
  } else if (icon === "10n" || icon === "10d") {
    emoji = "🌦";
  } else if (icon === "11n" || icon === "11d") {
    emoji = "🌩";
  } else if (description === "tornado") {
    emoji = "🌪";
  } else if (
    description === "thunderstorm with light rain" ||
    description === "thunderstorm with rain" ||
    description === "thunderstorm with heavy rain" ||
    description === "thunderstorm with heavy drizzle"
  ) {
    emoji = "⛈";
  }

  return emoji;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  let weatherForecast = response.data.daily;
  let forecast = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  weatherForecast.forEach(function (forecastDay, index) {
    if (index === 0) {
      forecastHTML =
        forecastHTML +
        ` 
              <div class="col predicted">
                <div class="day today" id="today" > <strong> Today </strong>
               </div>
                <div class="weatherEmoji"> 
                ${changeIcon(
                  forecastDay.weather[0].icon,
                  forecastDay.weather[0].description
                )} </div>
                <div class="highlow">
                  <span>
                    <strong> <span id="today-highest"> ${Math.round(
                      forecastDay.temp.max
                    )}</span>° </strong>
                  </span>
                  <span> <span id="today-lowest"> ${Math.round(
                    forecastDay.temp.min
                  )}</span>°</span>
                </div>
              </div>
            `;
    } else {
      if (index === 1) {
        forecastHTML =
          forecastHTML +
          ` 
              <div class="col predicted">
                <div class="day today" id="today" > Tommorow
               </div>
                <div class="weatherEmoji"> 
                ${changeIcon(
                  forecastDay.weather[0].icon,
                  forecastDay.weather[0].description
                )} </div>
                <div class="highlow">
                  <span>
                    <strong> <span id="today-highest"> ${Math.round(
                      forecastDay.temp.max
                    )}</span>° </strong>
                  </span>
                  <span> <span id="today-lowest"> ${Math.round(
                    forecastDay.temp.min
                  )}</span>°</span>
                </div>
              </div>
            `;
      } else {
        if (index > 0 && index < 5) {
          forecastHTML =
            forecastHTML +
            ` 
              <div class="col predicted">
                <div class="day today" id="today" > ${formatDay(
                  forecastDay.dt
                )} </div>
                <div class="weatherEmoji"> 
                ${changeIcon(
                  forecastDay.weather[0].icon,
                  forecastDay.weather[0].description
                )} </div>
                <div class="highlow">
                  <span>
                    <strong> <span id="today-highest"> ${Math.round(
                      forecastDay.temp.max
                    )}</span>° </strong>
                  </span>
                  <span> <span id="today-lowest"> ${Math.round(
                    forecastDay.temp.min
                  )}</span>°</span>
                </div>
              </div>
            `;
        }
      }
    }
  });

  forecast.innerHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "f3bef9023a23b4fd07956b5566d08cb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  feelsLikeTempC = feelsLike;

  getForecast(response.data.coord);
  changeIcon(response.data.weather[0].icon, description);

  let changeMainIcon = document.querySelector("#current-icon");
  let icon = response.data.weather[0].icon;
  if (icon === "04n" || icon === "04d") {
    changeMainIcon.innerHTML = "☁️";
  } else {
    if (icon === "03n" || icon === "03d") {
      changeMainIcon.innerHTML = "🌥";
    } else {
      if (icon === "13n" || icon === "13d") {
        changeMainIcon.innerHTML = "❄️";
      } else {
        if (icon === "50n" || icon === "50d") {
          changeMainIcon.innerHTML = "🌫";
        } else {
          if (icon === "02n" || icon === "02d") {
            changeMainIcon.innerHTML = "⛅️";
          } else {
            if (icon === "01d") {
              changeMainIcon.innerHTML = "☀️";
            } else {
              if (icon === "01n") {
                changeMainIcon.innerHTML = "🌙 ";
              } else {
                if (icon === "09n" || icon === "09d") {
                  changeMainIcon.innerHTML = "🌧";
                } else {
                  if (icon === "10n" || icon === "10d") {
                    changeMainIcon.innerHTML = "🌦";
                  } else {
                    if (icon === "11n" || icon === "11d") {
                      changeMainIcon.innerHTML = "🌩";
                    } else {
                      if (description === "tornado") {
                        changeMainIcon.innerHTML = "🌪";
                      } else {
                        if (
                          description === "thunderstorm with light rain" ||
                          description === "thunderstorm with rain" ||
                          description === "thunderstorm with heavy rain" ||
                          description === "thunderstorm with heavy drizzle"
                        ) {
                          changeMainIcon.innerHTML = "⛈";
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

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;

  let apiKey = "f3bef9023a23b4fd07956b5566d08cb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
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
