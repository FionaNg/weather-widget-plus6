let today = new Date();
function showDate(today) {
  let dayIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let monthIndex = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = monthIndex[today.getMonth()];
  let day = dayIndex[today.getDay()];
  let date = today.getDate();
  return `${day} ${month}, ${date}`;
}
function showTime(today) {
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes} EST`;
}
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = showDate(today);
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = showTime(today);
//

function showCity(event) {
  event.preventDefault();
  let heading = document.querySelector("h1");
  let city = document.querySelector("#city-input");
  heading.innerHTML = `${city.value}`;
  searchCity(city.value);
}
function searchCity(city) {
  let apiKey = "9b956ec7e4a1befc4d3edad1dd43b574";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", showCity);
//API log
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  console.log(response);
  let showTemp = document.querySelector("#temperature");
  showTemp.innerHTML = temperature;
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  let h3 = document.querySelector("h3");
  let showWind = response.data.wind.speed;
  h3.innerHTML = showWind;
}
//GPS Current log
function showGpsCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let cityCurrent = document.querySelector("#city-Current");
cityCurrent.addEventListener("click", showGpsCity);
function retrievePosition(position) {
  let apiKey = "9b956ec7e4a1befc4d3edad1dd43b574";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
