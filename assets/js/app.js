// Configuration settings for location.
// Note: Open-Meteo does not require an API key, but if an API key were needed, this is where it would go.
const CONFIG = {
  town: "Brighton",
  latitude: 50.8284,
  longitude: -0.1395
};

// Builds the Open-Meteo forecast API URL using string concatenation (+)
function buildUrl() {
  const url = "https://api.open-meteo.com/v1/forecast" +
    "?latitude=" + CONFIG.latitude +
    "&longitude=" + CONFIG.longitude +
    "&current=temperature_2m,weather_code,wind_speed_10m" +
    "&timezone=Europe%2FLondon";
  return url;
}

// Turns ISO date string like "2026-10-28T12:45" into "28/10/2026 12:45" using split
function formatDate(dateString) {
  const parts = dateString.split("T");
  const dateParts = parts[0].split("-");
  const timePart = parts[1];
  return dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0] + " " + timePart;
}

// Converts WMO weather code into human-readable text
function describeWeather(code) {
  if (code === 0) {
    return "Clear sky";
  } else if (code >= 1 && code <= 3) {
    return "Cloudy";
  } else if (code >= 45 && code <= 48) {
    return "Fog";
  } else if (code >= 51 && code <= 67) {
    return "Rain";
  } else if (code >= 71 && code <= 77) {
    return "Snow";
  } else if (code >= 80 && code <= 82) {
    return "Rain showers";
  } else if (code >= 95) {
    return "Thunderstorm";
  } else {
    return "Unknown";
  }
}

// Returns a large emoji for the weather code and updates page background colour to match
function weatherIcon(code) {
  let emoji = "🌤️";
  let backgroundStyle = "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)";

  if (code === 0) {
    emoji = "☀️";
    backgroundStyle = "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #f59e0b 100%)";
  } else if (code >= 1 && code <= 3) {
    emoji = "⛅";
    backgroundStyle = "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)";
  } else if (code >= 45 && code <= 48) {
    emoji = "🌫️";
    backgroundStyle = "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)";
  } else if (code >= 51 && code <= 67) {
    emoji = "🌧️";
    backgroundStyle = "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #60a5fa 100%)";
  } else if (code >= 71 && code <= 77) {
    emoji = "❄️";
    backgroundStyle = "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)";
  } else if (code >= 80 && code <= 82) {
    emoji = "🌦️";
    backgroundStyle = "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #818cf8 100%)";
  } else if (code >= 95) {
    emoji = "⛈️";
    backgroundStyle = "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 50%, #475569 100%)";
  }

  // Update page background to match weather condition
  document.body.style.background = backgroundStyle;
  return emoji;
}

// Displays the formatted weather data, icon, and temperature on the page
function showWeather(data) {
  const townElement = document.getElementById("town");
  const iconElement = document.getElementById("weather-icon");
  const tempElement = document.getElementById("temperature");
  const descElement = document.getElementById("weather-description");
  const timeElement = document.getElementById("time");
  const windElement = document.getElementById("wind-speed");

  townElement.textContent = CONFIG.town;
  iconElement.textContent = weatherIcon(data.current.weather_code);
  tempElement.textContent = Math.round(data.current.temperature_2m) + "°C";
  descElement.textContent = describeWeather(data.current.weather_code);
  timeElement.textContent = formatDate(data.current.time);
  if (windElement) {
    windElement.textContent = data.current.wind_speed_10m + " km/h";
  }
}

// Fetches the weather forecast from Open-Meteo API and handles errors
async function loadWeather() {
  const errorBox = document.getElementById("error-message");
  errorBox.textContent = "";
  errorBox.classList.remove("active");

  try {
    const url = buildUrl();
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    const data = await response.json();
    showWeather(data);
  } catch (error) {
    errorBox.textContent = "Could not load the weather.";
    errorBox.classList.add("active");
  }
}

// Searches for a town using Open-Meteo Geocoding API, updates CONFIG, and reloads weather
async function searchTown(townName) {
  const trimmedName = townName.trim();
  if (!trimmedName) {
    return;
  }

  const errorBox = document.getElementById("error-message");
  errorBox.textContent = "";
  errorBox.classList.remove("active");

  const geocodeUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" +
    encodeURIComponent(trimmedName) +
    "&count=1";

  try {
    const response = await fetch(geocodeUrl);
    if (!response.ok) {
      throw new Error("Geocoding failed");
    }
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      errorBox.textContent = 'Town "' + trimmedName + '" not found. Please try another name.';
      errorBox.classList.add("active");
      return;
    }

    const firstResult = data.results[0];
    CONFIG.town = firstResult.name + (firstResult.country ? ", " + firstResult.country_code : "");
    CONFIG.latitude = firstResult.latitude;
    CONFIG.longitude = firstResult.longitude;

    // Reload weather with new location
    await loadWeather();
  } catch (error) {
    errorBox.textContent = "Could not search for town. Check your internet connection.";
    errorBox.classList.add("active");
  }
}

// Initializes event listeners and loads the initial weather forecast
function initApp() {
  const refreshButton = document.getElementById("refresh-button");
  if (refreshButton) {
    refreshButton.addEventListener("click", loadWeather);
  }

  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      searchTown(searchInput.value);
    });
  }

  // Load weather when application starts
  loadWeather();
}

// Start application when DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
