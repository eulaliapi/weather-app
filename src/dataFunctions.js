import axios from 'axios';

import { displayError, displayCurrData, displayNextDays, transformUnixToDay, transformIdToIcon} from './domFunctions.js'
import { currentLoc } from './index.js';
import { Weather } from "./Weather.js"

const todayW = new Weather();

const WEATHER_API = "6aa562f78c0631a2b538a949824cb0e3";

//sets data received as values for currentLoc object
export const setLocationObject = (currentLoc, coordsObj) => {
    const { lat, lon, unit} = coordsObj;

    currentLoc.setLat(lat);
    currentLoc.setLon(lon);

    if(unit) {
        currentLoc.setUnit(unit)
    }
};

//takes currentLoc obj and finds 7days weather for that
export const getWeatherFromCoords = (currentLoc) => {
    //need to set what lat lon unit is:
    const lat = currentLoc.getLat();
    const lon = currentLoc.getLon();
    const unit = currentLoc.getUnit()

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=${unit}&appid=${WEATHER_API}`

    axios.get(url)
    .then(res => updateData(res.data))
    .catch(err => displayError(err))
}

//gets lat and lon for the requested city and if city is available sends its lon and lat to getWeatherFromCoords
export const getCoordsFromApi = (cityRequested) => {
    todayW.setName(cityRequested)
    const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityRequested}&appid=${WEATHER_API}`;
    
    axios.get(urlCity)
    .then(res => apiSuccess(res.data))
    .catch(err => console.log(err))

}

//apiSuccess to get lat and lon and put it in currentLoc to get that weather
const apiSuccess = (weather) => {
    let coordsObj = {
     lat: weather.coord.lat,
     lon: weather.coord.lon,
    }
 
    currentLoc.setLat(coordsObj.lat)
    currentLoc.setLon(coordsObj.lon)
 
    getWeatherFromCoords(currentLoc)
}

//passes data to menage separately current and future data weather
const updateData = (weatherJson) => {

    setCurrentData(weatherJson.current)
    setDailyData(weatherJson.daily)
}

//sets currentData
const setCurrentData = (currentWeather) => {
    const {feels_like, temp} = currentWeather;
    const { id, description} = currentWeather.weather[0];

    todayW.setTemp(temp.toFixed());
    todayW.setIcon(id);
    todayW.setFeelsLike(feels_like.toFixed());
    todayW.setDescription(description);

    displayCurrData(todayW)
}

const setDailyData = (dailyWeather) => {
    let arr = [];
   for(let i = 1; i < dailyWeather.length; i++) {
    let followingDs = {
        dt : transformUnixToDay(dailyWeather[i].dt),
        temp: (dailyWeather[i].temp.day).toFixed(),
        id: transformIdToIcon(dailyWeather[i].weather[0].id)
    }
    arr.push(followingDs)
   }

   displayNextDays(arr)
    
}

