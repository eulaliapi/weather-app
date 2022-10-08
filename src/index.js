//import style and favicon
import './styles/style.scss';

import { Location } from "./Location.js";
import { displayGeoError, getTime, addSpinner} from "./domFunctions.js";
import { setLocationObject, getWeatherFromCoords, getCoordsFromApi } from "./dataFunctions.js";

export const currentLoc = new Location();

const body = document.querySelector('body');

const initApp = () => {
    //avoid html to show before styling is applied
    body.style.display = "block";

    getTime(new Date())
    addSpinner()
    
    //get weather according to geolocation
    getGeoWeather()

    //change unit
    const unitButton = document.getElementById("unit");
    unitButton.addEventListener("click", setUnitPref);

    //get weather conditions for the requested city
    const locationEntry = document.getElementById("searchBar__form");
    locationEntry.addEventListener("submit", submitNewLocation)

}

//starts initApp function when DOM is loaded
document.addEventListener("DOMContentLoaded", initApp)

//get user's position
const getGeoWeather = () => {
    if(!navigator.geolocation) return geoError();
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
}

//if user's position is not available then:
const geoError =  (errObj) => {
    const errMsg = errObj ? errObj. message : "geolocation not supported";
    displayGeoError(errMsg)
}

//if user's position is available
const geoSuccess = (position) => {

    //create an object with properties lat and lon
    const coordsObj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }

    //pass currentLoc and coordsObj to a function that sets coordsObj props as Location istance props
    setLocationObject(currentLoc, coordsObj)

    //passes currentLoc after being set to actual datas and calls weather api
    getWeatherFromCoords(currentLoc)
}

//toggle metric - imperial
const setUnitPref = () => {
    currentLoc.toggleUnit()
    getWeatherFromCoords(currentLoc)
}

//takes the city that has been requested from the user and finds lon and lat for it
const submitNewLocation = (e) => {
    e.preventDefault();
    const cityRequested = document.getElementById("searchBar__text").value;
    if(!cityRequested.length) return;

    //finds lat and lon for that city
    getCoordsFromApi(cityRequested)

}