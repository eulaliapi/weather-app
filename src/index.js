//import file js:
import { getDateAndTime, displaySpinner, getGeoWeather, getRequestedCityApi, setUnitPref } from './functions'

//import style and favicon
import './styles/style.scss';
import favicon from './assets/favicon.ico';

const initApp = () => {
    getDateAndTime()
    displaySpinner()
    getGeoWeather()

    //get requested city weather
    let btnSearch = document.getElementById('btn-search');
    btnSearch.addEventListener('click', (e) => {
        e.preventDefault();
        let searchedCity = document.getElementById('cityRequested').value
        getRequestedCityApi(searchedCity);
    })

    //toggle unit
    let btnUnit = document.getElementById('btn-unit');
    btnUnit.addEventListener('click', setUnitPref);
}

initApp()