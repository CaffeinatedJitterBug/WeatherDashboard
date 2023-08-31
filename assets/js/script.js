const APIkey = "6fad23d1c535532a6c14b68d1e5d7b64";
const searchBtn = document.querySelector('.search');
let forecast = {
    currentDate: {date: '', weather: '', temp: '', wind: '', humid: ''},
    day1: {date: '', weather: '', temp: '', wind: '', humid: ''},
    day2: {date: '', weather: '', temp: '', wind: '', humid: ''},
    day3: {date: '', weather: '', temp: '', wind: '', humid: ''},
    day4: {date: '', weather: '', temp: '', wind: '', humid: ''},
    day5: {date: '', weather: '', temp: '', wind: '', humid: ''},
};
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
        const errorSpace = document.querySelector('#search-form');
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
            const nextFetch = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=' + lattitude + '&lon=' + longitude + '&appid=' + APIkey;
            
            fetch(nextFetch)
                .then(function(respond) {
                    return respond.json();
                })
                .then(function(weather) {
                    console.log(weather);
                    const weatherList = weather.list
                    console.log(weatherList);
                    town = weather.city.name;
                    /* const forecastItem = {
                        date: '',
                        weather: '',
                        temp: '',
                        wind: '',
                        humid: ''
                    }; */

                    for (let i=0; i<weatherList.length; i++) {
                        const timeStamp = weatherList[i].dt_txt;
                        const timeStampSplit = timeStamp.split(' ');
                        const firstDate = forecast[0].date;
                        console.log(timeStampSplit);
                        if (i === 0 || timeStampSplit[1] === '12:00:00') {
                            if (!firstDate || firstDate.date !== timeStampSplit[0].date) {
                                forecast.currentDate.date = timeStampSplit[0];
                                forecast.currentDate.temp = weatherList[i].main.temp;
                                forecast.currentDate.wind = weatherList[i].wind.speed;
                                forecast.currentDate.humid = weatherList[i].main.humidity;
                                // forecast.push(forecastItem);
                            }
                        }
                    }

                    console.log(forecast);
                })
        })
}