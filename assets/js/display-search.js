const APIkey = "6fad23d1c535532a6c14b68d1e5d7b64";

let forecast = {
    day1: {date: '', weather: '', temp: '', wind: '', humid: ''},
    day2: {date: '', weather: '', temp: '', wind: '', humid: ''},
    day3: {date: '', weather: '', temp: '', wind: '', humid: ''},
    day4: {date: '', weather: '', temp: '', wind: '', humid: ''},
    day5: {date: '', weather: '', temp: '', wind: '', humid: ''},
};
let town = '';
let geoURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';

function getParams() {
    const searchTerm = document.location.search.split('=');
    const popped = searchTerm.pop().toString();
    console.log(popped);
    const separatedTerm = popped.split('%20').join('').split(',');
    console.log(separatedTerm);

    for (let x=0; x<separatedTerm.length; x++) {
        separatedTerm[x] = separatedTerm[x].trim();
    }
    
    if (separatedTerm.length === 1) {
        geoURL = geoURL + separatedTerm[0] + '&appid=' + APIkey;
    } else if (separatedTerm.length === 2) {
        geoURL = geoURL + separatedTerm[0] + ',' + separatedTerm[1] + '&appid=' + APIkey;
    } else {
        geoURL = geoURL + separatedTerm[0] + ',' + separatedTerm[1] + ',' + separatedTerm[2] + '&appid=' + APIkey;
    }

    getWeather();
};

function getWeather() {
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
                    let count = 1;

                    const workingTime = weatherList[0].dt_txt.split(' ')[1];
                    const filteredWeather = weatherList.filter((weather) => weather.dt_txt.split(' ')[1] === workingTime);

                    for (let i=0; i<filteredWeather.length; i++) {
                        const currentDate = 'day' + count;
                        forecast[currentDate].date = filteredWeather[i].dt_txt.split(' ')[0];
                        forecast[currentDate].weather = filteredWeather[i].weather[0].main;
                        forecast[currentDate].temp = filteredWeather[i].main.temp;
                        forecast[currentDate].wind = filteredWeather[i].wind.speed;
                        forecast[currentDate].humid = filteredWeather[i].main.humidity;
                        count++;
                    }

                    displayForecast();
                });
        })
}

function displayForecast() {
    let getBody = document.querySelector('body');
    console.log(forecast.length);

    for (let j=1; j<6; j++) {
        const forecastBlock = document.createElement('ul');
        let currentWeather = document.createElement('li');
        let currentTemp = document.createElement('li');
        let currentHumid = document.createElement('li');
        let currentWind = document.createElement('li');
        let currentDay = document.createElement('li');

        const day = 'day' + j;
        currentWeather.textContent = forecast[day].weather;
        currentTemp.textContent = forecast[day].temp;
        currentHumid.textContent = forecast[day].humid;
        currentWind.textContent = forecast[day].wind;
        currentDay.textContent = forecast[day].date;

        forecastBlock.appendChild(currentWeather);
        forecastBlock.appendChild(currentTemp);
        forecastBlock.appendChild(currentHumid);
        forecastBlock.appendChild(currentWind);
        forecastBlock.appendChild(currentDay);

        getBody.appendChild(forecastBlock);
    }
}

getParams();