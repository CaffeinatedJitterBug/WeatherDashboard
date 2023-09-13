const searchBtn = document.querySelector('.search');

searchBtn.addEventListener('click', searchWeather);

function searchWeather(event) {
    event.preventDefault();
    const searchTerm = document.querySelector('.input').value;

    if (!searchTerm) {
        const error = document.createElement('p');
        error.textContent = 'Please enter a valid city name';
        const errorSpace = document.querySelector('#search-form');
        errorSpace.appendChild(error);
        return;
    }

    const queryString = './search-results.html?q=' + searchTerm;
    location.assign(queryString);
}
    
