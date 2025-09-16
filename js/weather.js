const searchBar = document.querySelector(".weather .search .searchbar");
const searchBarIcon = document.querySelector(".weather .search .fa-magnifying-glass");
const citySpan = document.querySelector(".weather .current-weather .city");
const weatherNowIcon = document.querySelector(".weather-now .weather-now-icon");
const temperatureSpan = document.querySelector(".weather-now .temperature");
const forecastDays = document.querySelectorAll('.forecast-day');
const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const weatherIcons = {
  Thunderstorm: "fa-solid fa-cloud-bolt",
  Drizzle: "fa-solid fa-cloud-drizzle",
  Rain: "fa-solid fa-cloud-showers-heavy",
  Snow: "fa-solid fa-snowflake",
  Clear: "fa-solid fa-sun-bright",
  Clouds: "fa-solid fa-cloud",
  Mist: "fa-solid fa-smog",
  Smoke: "fa-solid fa-smog",
  Haze: "fa-solid fa-smog",
  Dust: "fa-solid fa-smog",
  Fog: "fa-solid fa-smog",
  Sand: "fa-solid fa-smog",
  Ash: "fa-solid fa-smog",
  Squall: "fa-solid fa-wind",
  Tornado: "fa-solid fa-tornado",
  NoData: "fa-solid fa-cloud-question"
};

function setWeather(city, weather, temp) {
  citySpan.textContent = city;
  if (temp === null || temp === undefined) {
    temperatureSpan.textContent = "Not found";
  } else {
    temperatureSpan.textContent = `${Math.round(temp)}°C`;
  }
  const iconClass = weatherIcons[weather] || "fa-solid fa-question";
  weatherNowIcon.innerHTML = `<i class="${iconClass}"></i>`;
}

async function fetchWeather(city, showNotFound = false) {
  const apiKey = "4f91d01bf628ee6b33156de0a0248545";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    const weatherMain = data.weather[0].main;
    const temp = data.main.temp;
    setWeather(data.name, weatherMain, temp);
  } catch (e) {
    if (showNotFound) {
      setWeather(null, "NoData", null);
    }
  }
}

const lastCity = localStorage.getItem("lastCity");
if (lastCity) {
  fetchWeather(lastCity);
  searchBar.value = lastCity;
} else {
  fetchWeather("New York");
}

searchBar.addEventListener("input", () => {
  if (searchBar.value.trim() === "") {
    searchBarIcon.className = "fa-sharp fa-solid fa-magnifying-glass";
  } else {
    searchBarIcon.className = "fa-sharp fa-solid fa-xmark";
  }
});

searchBarIcon.addEventListener("click", () => {
  if (searchBarIcon.classList.contains("fa-xmark")) {
    searchBar.value = "";
    searchBar.dispatchEvent(new Event("input"));
    searchBar.focus();
  }
});

function updateCity() {
  const city = searchBar.value.trim();
  if (city) {
    localStorage.setItem("lastCity", city);
    fetchWeather(city, true);
  }
}

searchBar.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    updateCity();
    searchBar.blur();
  }
});

function getDayLetter(date) {
  return dayNames[date.getDay()];
}

async function fetchForecast(city) {
  const apiKey = "4f91d01bf628ee6b33156de0a0248545";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    const days = [];
    let currentDay = null;
    let temps = [];
    let icons = [];

    data.list.forEach(item => {
      const date = new Date(item.dt_txt);
      const day = date.getDate();
      if (currentDay === null) currentDay = day;

      if (day !== currentDay) {
        days.push({
          date: new Date(date.getFullYear(), date.getMonth(), currentDay),
          temp: Math.round(temps.reduce((a, b) => a + b, 0) / temps.length),
          icon: icons.length ? icons[0] : "Clouds"
        });
        currentDay = day;
        temps = [];
        icons = [];
      }
      temps.push(item.main.temp);
      icons.push(item.weather[0].main);
    });

    if (temps.length) {
      days.push({
        date: new Date(data.list[data.list.length - 1].dt_txt),
        temp: Math.round(temps.reduce((a, b) => a + b, 0) / temps.length),
        icon: icons.length ? icons[0] : "Clouds"
      });
    }

    for (let i = 0; i < 5; i++) {
      const dayData = days[i];
      if (!dayData) continue;
      const forecastDay = forecastDays[i];
      forecastDay.querySelector('.day-forecast').textContent = getDayLetter(dayData.date);
      forecastDay.querySelector('.icon-forecast').innerHTML = `<i class="${weatherIcons[dayData.icon] || weatherIcons.Clouds}"></i>`;
      forecastDay.querySelector('.temperature-forecast').textContent = dayData.temp;
    }
  } catch (e) {
    forecastDays.forEach((forecastDay, i) => {
      forecastDay.querySelector('.day-forecast').textContent = dayNames[(new Date().getDay() + i) % 7];
      forecastDay.querySelector('.icon-forecast').innerHTML = `<i class="${weatherIcons.NoData}"></i>`;
      forecastDay.querySelector('.temperature-forecast').textContent = "-";
    });
  }
}

async function fetchWeather(city, showNotFound = false) {
  const apiKey = "4f91d01bf628ee6b33156de0a0248545";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    const weatherMain = data.weather[0].main;
    const temp = data.main.temp;
    setWeather(data.name, weatherMain, temp);
    fetchForecast(city);
  } catch (e) {
    if (showNotFound) {
      setWeather(null, "NoData", null);
      fetchForecast(city);
    }
  }
}

searchBar.addEventListener("blur", updateCity);