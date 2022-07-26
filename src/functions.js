import axios from 'axios';

import CurrentLocation from './currentLocation';

const API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;

const currentLoc = new CurrentLocation();

let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let spinner = document.getElementById('spinner');
let errorAlert = document.getElementById('error-section');
let weatherCard = document.getElementById('weather-card');
let cityName = document.getElementById("city-name");
let tempParag = document.getElementById("temp");
let feelsLikeT = document.getElementById("feels-like");
let maxT = document.getElementById("max-temp");
let minT = document.getElementById("min-temp");
let weatherIcon = document.getElementById("icon");

//get and display date and time
export const getDateAndTime = () => {
    let currentDate = new Date();
    let day = currentDate.getDay();
    let month = currentDate.getMonth();
    let date = currentDate.getDate();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();

    displayDayAndTime(day, month, date, hours, minutes)
}

const displayDayAndTime = (day, month, date, hours, minutes) => {

    let weekday = days[day];
    let monthInLett = months[month];
    let dateInfos = document.getElementById('now-date');
    dateInfos.innerText = `${weekday} ${monthInLett} ${date}  ${hours}:${minutes}`;

}

//display spinner
export const displaySpinner = () => {
    spinner.className = "d-block justify-content-center text-center my-5";
    let weatherCard = document.getElementById('weather-card');
    weatherCard.className = "d-none row d-flex justify-content-center";
}

//display errors
const displayError = (errMsg) => {
    spinner.className = "d-none justify-content-center text-center my-5";
    weatherCard.className = "d-none row d-flex justify-content-center";
    errorAlert.className = "d-block my-5 col-md-6 d-flex justify-content-center text-center";
    errorAlert.innerHTML = `<div class="alert alert-warning" role="alert">${errMsg}</div>`
}

//toggle unit
export const setUnitPref = () => {
    currentLoc.toggleUnit();
}

//function to get user coordinates
export const getGeoWeather = () => {
    if (!navigator.geolocation) {
        return geoError();
    } else {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
    }
}

const geoError = (errObj) => {
    displaySpinner()
    const errMsg = errObj ? errObj.message : "Geolocation not supported";
    displayError(errMsg)
}

const geoSuccess = (position) => {
    const coordsObj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };

    setLocationObj(currentLoc, coordsObj);
}

export const getRequestedCityApi = (searchedCity) => {

    if(!searchedCity) return
    if(searchedCity.length > 0) {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=${API_KEY}`)
        .then (res => apiSuccess(res.data))
        .catch(errMsg => displayError(errMsg))
    }

}

const apiSuccess = (apiObj) => {
    const cityObj ={
        lat: apiObj.coord.lat,
        lon: apiObj.coord.lon,
        name: apiObj.name
    }

   setLocationObj(currentLoc, cityObj)
}

//takes the coords that we received from the navigator or from the user request and puts them in the istance currentLoc
//here as "locationObj"
const setLocationObj = (locationObj, coordsObj) => {
    const { lat, lon, name, } = coordsObj;

    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);


    getWeather(locationObj);
}


//get weather according to submitted data
const getWeather = (locationObj) => {
    let lat = locationObj.getLat();
    let lon = locationObj.getLon();
    let name = locationObj.getName();
    let unit = locationObj.getUnit();

    getCoordsWeather(locationObj)
}

//get weather from lat and lon
const getCoordsWeather = (locationObj) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${locationObj._lat}&lon=${locationObj._lon}&units=${locationObj._unit}&appid=${API_KEY}`)
        .then(res => setData(res.data))
        .catch(errMsg => displayError(errMsg))
}

const setData = (weatherApiObj) => {
    const weather = {
        nameC: weatherApiObj.name,
        temp: (weatherApiObj.main.temp).toFixed(),
        feels_like: (weatherApiObj.main.feels_like).toFixed(),
        temp_max: (weatherApiObj.main.temp_max).toFixed(),
        temp_min: (weatherApiObj.main.temp_min).toFixed(),
        temp_icon: weatherApiObj.weather[0].id,
    }

    displayData(weather)
    setImage(weather.temp_icon)
}

const displayData = (weather) => {
    spinner.className = "d-none justify-content-center text-center my-5";
    errorAlert.className = "d-none my-5 col-md-6 d-flex justify-content-center text-center";
    cityName.innerText = weather.nameC;
    tempParag.innerText = weather.temp + "°";
    feelsLikeT.innerText = weather.feels_like + "°";
    maxT.innerText = weather.temp_max + "°";
    minT.innerText = weather.temp_min + "°";
    weatherCard.className = "d-block row d-flex justify-content-center";

}

const setImage = (id) => {
    id >= 200 && id < 300 ? weatherIcon.className = "bi bi-cloud-lightning-rain text-center"
    : id >= 300 && id < 400 ? weatherIcon.className = "bi bi-cloud-drizzle text-center"
    : id >= 500 && id < 600 ? weatherIcon.className = "bi bi-cloud-rain-heavy text-center"
    : id >= 600 && id < 700 ? weatherIcon.className = "bi bi-cloud-snow text-center"
    : id >= 700 && id < 800 ? weatherIcon.className = "bi bi-cloud-fog2 text-center"
    : id === 800 ? weatherIcon.className = "bi bi-sun text-center"
    : id === 801 ? weatherIcon.className = "bi bi-cloud-sun text-center"
    : id === 802 ? weatherIcon.className = "bi bi-cloud text-center"
    : id === 803 || id === 804 ? weatherIcon.className = "bi bi-clouds text-center"
    : weatherIcon.className = "bi bi-cloud-sun text-center";
}

