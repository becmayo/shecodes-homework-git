function currentTime() {
  let dayTime = document.querySelector("#day-time");
  let now = new Date();
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
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  dayTime.innerHTML = `${day} ${hours}:${minutes}`;
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `d34bf6dc9d2d08c43bc76d224bf2c78a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("input#city-input");
  userCity(cityInput);
}
function userCity(cityInput) {
  currentTime();
  console.log(cityInput.value);
  let city = cityInput.value;
  let apiKey = "d34bf6dc9d2d08c43bc76d224bf2c78a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response.data);
  let currentTemp = Math.round(response.data.main.temp);
  console.log(currentTemp);
  let todayTemp = document.querySelector("#today-temp");
  todayTemp.innerHTML = currentTemp;
  let city = document.querySelector("#city-title");
  city.innerHTML = response.data.name;
  let titleForecast = document.querySelector("#title-forecast");
  titleForecast.innerHTML = response.data.weather[0].main;
  let detailsHumidity = document.querySelector("#details-humidity");
  detailsHumidity.innerHTML = response.data.main.humidity;
  let detailsPressure = document.querySelector("#details-pressure");
  detailsPressure.innerHTML = response.data.main.pressure;
  let detailsWind = document.querySelector("#details-wind");
  detailsWind.innerHTML = response.data.wind.speed;
}

function celsiusConversion(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#today-temp");
  todayTemp.innerHTML = "24";
}

function fahrenheitConversion(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#today-temp");
  todayTemp.innerHTML = "75";
}

currentTime();

navigator.geolocation.getCurrentPosition(showPosition);

let citySearch = document.querySelector("#city-form");
citySearch.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", currentPosition);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsiusConversion);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheitConversion);
