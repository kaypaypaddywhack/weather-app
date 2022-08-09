// OpenWeatherMap API key. 
const api_weather = '047c6459533f365f633c95c9662f64f8';

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

window.addEventListener('load', () => {
    let long;
    let lat;
    // Accessing Geolocation of User
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            // Storing Longitude and Latitude
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const base_weather = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,daily,alerts&appid=${api_weather}&units=metric`;

            fetch(base_weather)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const { temp, feels_like } = data.current;
                    const place = "Static";
                    const { description } = data.current.weather[0];
                    const { icon } = data.current.weather[0];
                    const { sunrise } = data.current;
                    const { sunset } = data.current;
        
                    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    const fahrenheit = (temp * 9) / 5 + 32;

                    // Converting Epoch(Unix) time to GMT
                    const sunriseGMT = new Date(sunrise * 1000);
                    const sunsetGMT = new Date(sunset * 1000);
          
                    // Interacting with DOM to show data
                    iconImg.src = iconUrl;
                    loc.textContent = `${place}`;
                    desc.textContent = `${description}`;
                    tempC.textContent = `${temp.toFixed(0)}°C`;
                    tempF.textContent = `${fahrenheit.toFixed(0)}°F`;
                    sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                    sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
              });
        });
    }

});

