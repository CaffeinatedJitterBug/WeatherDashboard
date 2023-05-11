const APIkey = "6fad23d1c535532a6c14b68d1e5d7b64";
const searchBtn = document.querySelector('.search');
let forecast = [];
let town = '';

searchBtn.addEventListener('click', searchWeather);

function searchWeather(event) {
    event.preventDefault();
    const searchTerm = document.querySelector('.input').value;
    const splitTerm = searchTerm.split(",");
    let geoURL = 'https://api.openweathermap.org/data/2.5/forecast?q='

    for (let x=0; x<splitTerm.length; x++) {
        splitTerm[x] = splitTerm[x].trim();
    }
    
    if (!searchTerm) {
        const error = document.createElement('p');
        error.textContent = 'Please enter a valid city name';
        errorSpace = document.querySelector('#search-form');
        errorSpace.appendChild(error);
        return;
    } else if (splitTerm.length === 1) {
        geoURL = geoURL + splitTerm[0] + '&appid=' + APIkey;
    } else if (splitTerm.length === 2) {
        geoURL = geoURL + splitTerm[0] + ',' + splitTerm[1] + '&appid=' + APIkey;
    } else {
        geoURL = geoURL + splitTerm[0] + ',' + splitTerm[1] + ',' + splitTerm[2] + '&appid=' + APIkey;
    }

    fetch(geoURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(coordinates) {
            const lattitude = coordinates.city.coord.lat;
            const longitude = coordinates.city.coord.lon;
            const nextFetch = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&cnt=40&lat=' + lattitude + '&lon=' + longitude + '&appid=' + APIkey;
            
            fetch(nextFetch)
            .then(function(respond) {
                return respond.json();
            })
            .then(function(weather) {
                const weatherList = weather.list
                console.log(weatherList);
                town = weather.city.name;
                const forecastItem = {
                    date: '',
                    temp: '',
                    wind: '',
                    humid: ''
                };
                for (let x=0; x<5; x++) {
                     
                }
                console.log(forecastItem)
            })
        })
}