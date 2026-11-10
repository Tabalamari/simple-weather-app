Brighton Weather (Open-Meteo): Stage Instructions

Software Development Bootcamp · HTML and JavaScript · 28/10/2026
In each stage, type the prompt into an AI assistant, save the code as one HTML file, open it in a browser and test it. Then compare it with that stage's demo page.
Before you start
No API key needed. Open-Meteo is free for non-commercial use, with no sign-up.
One file per stage. The JavaScript goes inside a <script> tag in the HTML. No server is needed: just double-click the file.
Credit: add "Weather data by Open-Meteo.com" to your page.
Start every prompt with: Write one HTML file with the JavaScript inside a script tag. Use plain HTML and JavaScript only, no libraries. Keep the code simple for a beginner, with a comment above each function.
Stage 1: Set up and test the API
Goal: test the API in a browser, with no code, then store the settings in the page.
Find Brighton. Paste into the browser address bar:
https://geocoding-api.open-meteo.com/v1/search?name=Brighton&count=1&countryCode=GB
Note the latitude and longitude (about 50.83 and -0.14).
Get Brighton's weather. Paste into the address bar:
https://api.open-meteo.com/v1/forecast?latitude=50.8284&longitude=-0.1395&current=temperature_2m,weather_code,wind_speed_10m&timezone=Europe%2FLondon
Firefox shows the JSON neatly. In Chrome, tick "Pretty-print". Or use Hoppscotch, a free API tester in the browser: choose GET, paste the URL, click Send.
About keys: many APIs need a secret key. We keep settings in one CONFIG object, which is where a key would go. A key in a web page can still be seen by anyone in DevTools, so real secret keys need a server.
Prompt: Create a CONFIG object with town "Brighton", latitude 50.8284 and longitude -0.1395. Add a comment saying Open-Meteo needs no key, but this is where a key would go. Write a buildUrl function that joins strings with + to make the Open-Meteo forecast URL, asking for current temperature_2m, weather_code and wind_speed_10m with timezone Europe/London. Show the town on the page, and show the URL as a link that opens in a new tab.
Test: click the link. You see the same JSON as step 2.
Demo: stage1-setup.html
Stage 2: Fetch the data and show it
Goal: use fetch to get the data and show it on the page.
Prompt: Keep CONFIG and buildUrl from Stage 1. Add a loadWeather function that uses fetch with async and await, and shows the raw JSON on the page in a pre tag. Call loadWeather when the page loads.
Test: open the file. The raw JSON shows on the page. In DevTools > Network, find the request.
Demo: stage2-fetch.html
Stage 3: Pick out the weather, on page load
Goal: read the JSON and show only the parts we need, as they come.
Prompt: Change the page so loadWeather passes the data to a new showWeather function. showWeather shows the town, data.current.weather_code, data.current.temperature_2m and data.current.time in separate spans, unformatted. Run it on page load. Use try and catch to show "Could not load the weather." if it fails.
Test: you see values like weather code 61, temperature 13.4 and time 2026-10-28T12:45. Turn off Wi-Fi and reload: the error message shows.
Demo: stage3-parse.html
Stage 4: Refresh button and formatting
Goal: reuse the same function on a button, and make the data readable.
Prompt: Add a "Refresh data" button that calls the same loadWeather function, without copying it. Add a formatDate function that uses split to turn 2026-10-28T12:45 into 28/10/2026 12:45. Add a describeWeather function that turns the weather code into words: 0 Clear sky, 1-3 Cloudy, 45-48 Fog, 51-67 Rain, 71-77 Snow, 80-82 Rain showers, 95+ Thunderstorm. Add °C to the temperature.
Test: the date reads DD/MM/YYYY HH:MM and the weather shows in words. Click Refresh with DevTools > Network open: a new request appears each time. The data updates every 15 minutes, so values may not change straight away.
Demo: stage4-refresh.html
Stage 5: Optional extras
Do any of these on top of your Stage 4 file. One demo shows all three.
Extra
Prompt
Skin the page
Add a style tag to make the page look like a weather app: a centred white card, rounded corners, a shadow and a clear font.
Move the assets into their own folders
/assets/js and /assets/css
Weather graphic
Add a weatherIcon function that shows a large emoji for the weather code (sun, cloud, fog, rain, snow, storm), and change the page background colour to match.
Choose the town
Add a text box and Search button. Use the Open-Meteo geocoding API to find the town's latitude and longitude, update CONFIG, then call loadWeather.

Test: search for Lewes. The town, icon and background change.
Demo: stage5-extras.html
Debugging in DevTools
Press F12 (Cmd+Option+I on a Mac).
Console: type a function name to run it, e.g. buildUrl() or formatDate("2026-10-28T12:45").
Sources: open the file, click a line number to add a breakpoint, then reload or click Refresh.
Step: F10 runs the next line, F11 steps into a function, F8 carries on. Hover over a variable to see its value.
Troubleshooting
Problem
Fix
Nothing shows
Open the Console and read the red error and its line number
Cannot set properties of null
A span id in the HTML doesn't match the JavaScript
HTTP 400
Typo in the URL: test it in the browser first
Values don't change on Refresh
Normal: the data updates every 15 minutes


