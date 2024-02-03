async function getWeather(city) {
  const apiKey = '535409ae683e3a76e2a081d95cbf3989';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const weatherinfo = document.getElementById('weatherinfo');
    if (data.cod === 200) {
      const { name, sys, main, weather } = data;

      // Get current date
      const currentDate = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const dayName = days[currentDate.getDay()];
      const day = currentDate.getDate();
      const monthName = months[currentDate.getMonth()];
      const year = currentDate.getFullYear();

      const cityWithCountry = `${name}, ${sys.country}`;

      weatherinfo.innerHTML = `
        <p id="city">${cityWithCountry}</p>
        <p id="date">${dayName} ${day} ${monthName} ${year}</p>
        <h2>${main.temp}°C</h2>
        <p>${weather[0].main}</p>
        <p>${main.temp-1}°C/${main.temp+1}°C</p>
      `;
    } else {
      weatherinfo.innerHTML = `<p>${data.message}</p>`;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    const city = document.getElementById('cityInput').value;
    getWeather(city);
  }
}

function resetWeather() {
  const weatherinfo = document.getElementById('weatherinfo');
  const cityInput = document.getElementById('cityInput');

  // Clear weather information and input field
  weatherinfo.innerHTML = '';
  cityInput.value = '';
}