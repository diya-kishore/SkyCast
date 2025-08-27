const apiKey = "aceffe999710f4c2c9902f7b9ca79a5a"; // Your API key

const activitySuggestions = {
  clear: "It's a sunny day! Great for a picnic, hiking, or cycling.",
  rain: "Rainy day! How about reading a book, visiting a cafe, or watching a movie?",
  drizzle: "Light rain outside. Don't forget your umbrella if going out!",
  thunderstorm: "Stay safe! Best to stay indoors and enjoy your favorite indoor hobbies.",
  snow: "Snow is falling! Building a snowman or cozying up by the fire sounds perfect.",
  clouds: "Cloudy skies. Maybe a calm walk or visit a museum would suit you.",
  default: "Enjoy your day, whatever the weather!"
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchBtn").addEventListener("click", getWeather);

  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", toggleTheme);

  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
});

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weatherResult");

  if (!city) {
    weatherDiv.innerHTML = '<p class="error">Please enter a city name!</p>';
    resetBackground();
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      resetBackground();
      if (response.status === 401) throw new Error("Invalid API key. Check your key.");
      else if (response.status === 404) throw new Error("City not found. Try another name.");
      else throw new Error("Unable to fetch weather data.");
    }

    const data = await response.json();

    updateBackground(data.weather[0].main);

    const suggestionText = activitySuggestions[data.weather[0].main.toLowerCase()] || activitySuggestions.default;

    weatherDiv.innerHTML = `
      <div class="temp">${Math.round(data.main.temp)}°C</div>
      <div class="desc">${data.weather[0].description}</div>
      <div>Humidity: ${data.main.humidity}%</div>
      <div>Wind: ${data.wind.speed} m/s</div>
      <div class="suggestions">${suggestionText}</div>
    `;

  } catch (error) {
    weatherDiv.innerHTML = `<p class="error">${error.message}</p>`;
    resetBackground();
  }
}

function updateBackground(weatherMain) {
  const body = document.body;
  body.classList.remove("sunny", "rainy", "winter");

  switch (weatherMain.toLowerCase()) {
    case "clear":
      body.classList.add("sunny");
      break;
    case "rain":
    case "drizzle":
    case "thunderstorm":
      body.classList.add("rainy");
      break;
    case "snow":
      body.classList.add("winter");
      break;
    default:
      // no special background
      break;
  }
}

function resetBackground() {
  const body = document.body;
  body.classList.remove("sunny", "rainy", "winter");
}

function toggleTheme() {
  const body = document.body;
  const mascot = document.getElementById("mascot");
  const themeIcon = document.getElementById("themeIcon");
  const isDark = body.classList.toggle("dark-theme");

  if (isDark) {
    mascot.classList.remove("mascot-light");
    mascot.classList.add("mascot-dark");
    themeIcon.innerHTML = `
      <path fill="#F39C12" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    `;
    localStorage.setItem("theme", "dark");
  } else {
    mascot.classList.remove("mascot-dark");
    mascot.classList.add("mascot-light");
    themeIcon.innerHTML = `
      <circle cx="12" cy="12" r="5" fill="#FFCC00"/>
      <g stroke="#FFCC00" stroke-width="2">
        <line x1="12" y1="1" x2="12" y2="4"/>
        <line x1="12" y1="20" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="4" y2="12"/>
        <line x1="20" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
      </g>
    `;
    localStorage.setItem("theme", "light");
  }
}

function setTheme(theme) {
  const body = document.body;
  const mascot = document.getElementById("mascot");
  const themeIcon = document.getElementById("themeIcon");

  if (theme === "dark") {
    body.classList.add("dark-theme");
    mascot.classList.remove("mascot-light");
    mascot.classList.add("mascot-dark");
    themeIcon.innerHTML = `
      <path fill="#F39C12" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    `;
  } else {
    body.classList.remove("dark-theme");
    mascot.classList.remove("mascot-dark");
    mascot.classList.add("mascot-light");
    themeIcon.innerHTML = `
      <circle cx="12" cy="12" r="5" fill="#FFCC00"/>
      <g stroke="#FFCC00" stroke-width="2">
        <line x1="12" y1="1" x2="12" y2="4"/>
        <line x1="12" y1="20" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="4" y2="12"/>
        <line x1="20" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
      </g>
    `;
  }
}
