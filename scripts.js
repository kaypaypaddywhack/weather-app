// OpenWeatherMap API key. 
const api_weather = '047c6459533f365f633c95c9662f64f8';
const api_location = 'a16895ed12d74948937105b0e0c6f7c4';

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
            const base_location = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&type=city&format=json&apiKey=a16895ed12d74948937105b0e0c6f7c4`;

            const fetchWeather = fetch(base_weather)
                .then((response) => response.json());
            const fetchLocation = fetch(base_location)
                .then((response) => response.json());

            const allData = Promise.all([fetchWeather, fetchLocation]);

            allData.then((data) => {
                const { temp, feels_like } = data[0].current;
                console.log(data);
                const { address_line1 } = data[1].results[0];
                const { description } = data[0].current.weather[0];
                const { icon } = data[0].current.weather[0];
                const { sunrise } = data[0].current;
                const { sunset } = data[0].current;
    
                const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                const fahrenheit = (temp * 9) / 5 + 32;

                // Converting Epoch(Unix) time to GMT
                const sunriseGMT = new Date(sunrise * 1000);
                const sunsetGMT = new Date(sunset * 1000);
        
                // Interacting with DOM to show data
                iconImg.src = iconUrl;
                loc.textContent = `${address_line1}`;
                desc.textContent = `${description}`;
                tempC.textContent = `${temp.toFixed(0)}°C`;
                tempF.textContent = `${fahrenheit.toFixed(0)}°F`;
                sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
              });
        });
    }

});

