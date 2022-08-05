let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let spinner = document.getElementById('spinner');
let errDiv = document.getElementById('error-msg');
let errP = document.getElementById('err-p');
let todayCard = document.getElementById('today');
let followingSection = document.getElementById('following');
let followingCards = document.getElementsByClassName('days');

//creates an obj for current time and date info
export const getTime = (time) => {
    let currData = {
        weekday : days[time.getDay()],
        month : months[time.getMonth()],
        day : time.getDate(),
        hour : time.getHours(),
        minutes: time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes(),
    }

    displayTime(currData)
}

export const addSpinner = () => {

    spinner.classList = "d-block justify-content-center text-center my-5 p-5"

};


//according to current time displays day or night
const getDayOrNight = () => {
    let condition = new Date().getHours() < 19 && new Date().getHours() > 4;
    let dayOrNight = condition === true ? 'day' : 'night'

    return dayOrNight;
}

//displays time and date according to developer choice
export const displayTime = (currData) => {
    let currTime = document.getElementById('date');
    currTime.innerText = `${currData.weekday} ${currData.day} ${currData.month} ${currData.hour}:${currData.minutes}`
}

//displays error in a readble way
export const displayError = (errMsg) => {
    spinner.classList = "d-none";
    errDiv.classList = "d-block alert alert-warning mt-3 p-4 col-sm-6 m-auto";
    errP.innerText = `We're sorry, ${errMsg}. Please try again`
}

export const displayGeoError = (errMsg) => {
    spinner.classList = "d-none";
    errDiv.classList = "d-block alert alert-warning mt-3 p-4 col-sm-6 m-auto";
    errP.innerText = `We're sorry, ${errMsg}. Please try again or submit a city name in the search bar.`
}


//gets weekday for each day of followingDs
export const transformUnixToDay= (unix) => {
   let date = new Date (unix * 1000)
   let day = (days[date.getDay()]);
   return day;
}

//transform id to icon
export const transformIdToIcon = (id) => {
    let DN = getDayOrNight()
    if (id >= 200 && id <= 232) {
        return '<i class="bi bi-cloud-lightning-rain fs-1"></i>';
    } else if ( id >= 300 && id <= 321 ) {
        return '<i class="bi bi-cloud-drizzle fs-1"></i>';
    } else if ( id >= 500 && id <= 531) {
        return '<i class="bi bi-cloud-rain fs-1"></i>';
    } else if ( id >= 600 && id <= 622) {
        return '<i class="bi bi-cloud-snow fs-1"></i>';
    } else if (id >= 701 && id <= 781) {
        return '<i class="bi bi-cloud-fog fs-1"></i>';
    } else if (id === 800 && DN == 'day') {
        return '<i class="bi bi-sun fs-1"></i>';
    } else if (id === 800 && DN == 'night') {
        return '<i class="bi bi-moon fs-1"></i>';
    } else if ( id >= 801 && id <= 804) {
        if (DN == 'day') return '<i class="bi bi-cloud-sun fs-1"></i>';
        if (DN == 'night') return '<i class="bi bi-cloud-moon fs-1"></i>';
    }
    
}

//sets current weather infos
export const displayCurrData = (todayW) => {
    const currWeather = {
        name : todayW.getName(),
        temp : todayW.getTemp(),
        feels_like : todayW.getFeelsLike(),
        desc : todayW.getDescription(),
        icon: transformIdToIcon(todayW.getIcon())
    }

    spinner.classList = "d-none";
    errDiv.classList = "d-none";
    todayCard.classList = "d-block col-sm-8 col-lg-6 rounded bg-light shadow p-2 mb-5 text-center mx-auto"

    let nameCard = document.getElementById('displayName');
    nameCard.innerText = currWeather.name;
    let tempCard = document.getElementById('todayTemp');
    tempCard.innerText = `${currWeather.temp}°`;
    let feelsLikeCard = document.getElementById('feels-like');
    feelsLikeCard.innerText = `Feels like: ${currWeather.feels_like}°`;
    let descCard = document.getElementById('description');
    descCard.innerText = currWeather.desc;
    let iconCard = document.getElementById('icon-card');
    iconCard.innerHTML = currWeather.icon;
    
}

export const displayNextDays = (arrfollowingDs) => {

    followingSection.classList = "d-flex row justify-content-center";

    for(let i = 0; i < arrfollowingDs.length, i < followingCards.length; i++) {
        followingCards[i].innerHTML = 
            `<div class="row">
                <p class="fs-5">${arrfollowingDs[i].dt}</p>
            </div>
            <div class="row">${arrfollowingDs[i].id}</div>
            <div class="row">
                <p class="fs-5">${arrfollowingDs[i].temp}°</p>
            </div>`; 
    }

}