# 🌤️ Simple Weather App (Brighton & Beyond)

A lightweight, modern, and responsive client-side weather application built with **Vanilla HTML, CSS, and JavaScript**, powered by the free **[Open-Meteo API](https://open-meteo.com/)**.

No external dependencies, build tools, or API keys required — just pure web technologies.

---

## ✨ Features

- 🔍 **City Search:** Look up the current weather for any town or city worldwide via Open-Meteo Geocoding API.
- 🌡️ **Accurate Forecasts:** Real-time temperature (°C), WMO weather condition descriptions, and wind speed (km/h).
- 🎨 **Dynamic Atmosphere:** The background color and theme dynamically adapt to current weather conditions (sunny, rainy, cloudy, snowy, foggy, thunderstorm).
- ⛅ **Animated Weather Icons:** Floating weather emojis matching official WMO weather codes.
- 🕒 **Human-Readable Timestamps:** Clean European date and time formatting (`DD/MM/YYYY HH:MM`).
- 🔄 **Live Refresh:** Instantly fetch the latest data without reloading the browser.
- 🛡️ **Robust Error Handling:** Graceful error messages and network fault tolerance (`try...catch`).
- 💎 **Modern Card Design:** Centered glassmorphic card with backdrop blur, smooth shadows, and Google Fonts (Outfit).

---

## 🚀 Live Demo & How to Run

Because this project uses vanilla client-side technologies, **no web server or Node.js runtime is needed**.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tabalamari/simple-weather-app.git
   cd simple-weather-app
   ```

2. **Open the application:**
   - Simply double-click `index.html` in your file explorer, OR
   - Open it directly in your favorite browser:
     ```bash
     open index.html # On macOS
     # or
     xdg-open index.html # On Linux
     # or
     start index.html # On Windows
     ```

---

## 🛠️ Project Structure

```
simple-weather-app/
├── assets/
│   ├── css/
│   │   └── styles.css       # Design tokens, glassmorphism, responsive styles & keyframes
│   └── js/
│       └── app.js           # API integration, geocoding, WMO mapping & DOM handlers
├── index.html               # Main semantic HTML5 markup
└── README.md                # Project documentation
```

---

## 📚 Development Journey (Tutorial Stages)

This project was built incrementally across 5 git branches following the **Technical Tutorial Step-by-Step Guide**:

| Branch | Stage | Description |
| :--- | :--- | :--- |
| [`stage-1`](https://github.com/Tabalamari/simple-weather-app/tree/stage-1) | **Stage 1: Setup & API Test** | Built the `CONFIG` object, implemented `buildUrl()` with string concatenation, and tested the forecast endpoint. |
| [`stage-2`](https://github.com/Tabalamari/simple-weather-app/tree/stage-2) | **Stage 2: Fetch & Raw JSON** | Integrated `fetch()` using `async/await` and displayed formatted raw JSON in a `<pre>` element. |
| [`stage-3`](https://github.com/Tabalamari/simple-weather-app/tree/stage-3) | **Stage 3: Data Parsing** | Extracted specific fields into spans, added safe DOM manipulation, and included `try...catch` error handling. |
| [`stage-4`](https://github.com/Tabalamari/simple-weather-app/tree/stage-4) | **Stage 4: Formatting & Refresh** | Added a `"Refresh data"` button, implemented `formatDate()` via `.split()`, and converted WMO codes into words with `describeWeather()`. |
| [`stage-5`](https://github.com/Tabalamari/simple-weather-app/tree/stage-5) | **Stage 5: Polish & Extras** | Styled the card UI, added dynamic emojis/backgrounds (`weatherIcon()`), added worldwide city search, and modularized assets into `/assets`. |

---

## ⚙️ Technical Details

- **WMO Code Mapping:** Uses the World Meteorological Organization code table (Clear Sky `0`, Cloudy `1-3`, Fog `45-48`, Rain `51-67`, Snow `71-77`, Showers `80-82`, Storms `95+`).
- **Geocoding Flow:** Translates user queries (e.g. `Lewes`) into GPS coordinates via `geocoding-api.open-meteo.com/v1/search`, updates `CONFIG`, and immediately calls the forecast endpoint.
- **Client-Side Rendering:** Manipulates DOM using `textContent` for XSS protection.

---

## 📜 Credits & Attribution

- Weather forecasts and Geocoding APIs provided by **[Open-Meteo.com](https://open-meteo.com/)** (Free for non-commercial use, no API key required).
- Typography by **Google Fonts** ([Outfit](https://fonts.google.com/specimen/Outfit)).
