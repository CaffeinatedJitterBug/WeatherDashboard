const APIkey = "6fad23d1c535532a6c14b68d1e5d7b64";
const searchBtn = document.querySelector('.search');

const stateCodes = {
    Alabama: "AL",
    Alaska: "AK",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    District_of_Columbia: "DC",
    Florida: "FL",
    Georgia: "GA",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    New_Hampshire: "NH",
    New_Jersey: "NJ",
    New_Mexico: "NM",
    New_York: "NY",
    North_Carolina: "NC",
    North_Dakota: "	ND",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    Rhode_Island: "RI",
    South_Carolina: "SC",
    South_Dakota: "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    Virginia: "VA",
    Washington: "WA",
    West_Virginia: "WV",
    Wisconsin: "WI",
    Wyoming: "WY"
}

const countryCodes = {
    Afghanistan: "AF",
    Aland_Islands: "AX",
    Albania: "AL",
    Algeria: "DZ",
    American_Samoa: "AS",
    Andorra: "AD",
    Angola: "AO",
    Anguilla: "AI",
    Antarctica: "AQ",
    Antigua_and_Barbuda: "AG",
    Argentina: "AR",
    Armenia: "AM",
    Aruba: "AW",
    Australia: "AU",
    Austria: "AT",
    Azerbaijan: "AZ",
    Bahamas: "BS",
    Bahrain: "BH",
    Bangladesh: "BD",
    Barbados: "BB",
    Belarus: "BY",
    Belgium: "BE",
    Belize: "BZ",
    Benin: "BJ",
    Bermuda: "BM",
    Bhutan: "BT",
    Bolivia: "BO",
    Bonaire_Sint_Eustatius_Saba: "BQ",
    Bosnia_and_Herzegovina: "BA",
}

searchBtn.addEventListener('click', searchWeather);

function searchWeather(event) {
    event.preventDefault();
    const searchTerm = document.querySelector('.input').value;
    const splitTerm = searchTerm.split(",");
    let geoURL = 'api.openweathermap.org/data/2.5/forecast?q='
    
    if (!searchTerm) {
        const error = document.createElement('p');
        error.textContent = 'Please enter a valid city name';
        errorSpace = document.querySelector('#search-form');
        errorSpace.appendChild(error);
    } else if (splitTerm.length === 1) {
        geoURL = geoURL + splitTerm[0] + '&appid=' + APIkey;
    } else if (splitTerm.length === 2) {
        geoURL = geoURL + splitTerm[0] + ',' + splitTerm[1] + '&appid=' + APIkey;
    } else {
        geoURL = geoURL + splitTerm[0] + ',' + splitTerm[1] + ',' + splitTerm[2] + '&appid=' + APIkey;
    }
}