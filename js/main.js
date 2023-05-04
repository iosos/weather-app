

let currentLocation = document.getElementById('location');
let currentTemp = document.getElementById('temp');
let currentIcon = document.getElementById('icon-img');
let currentConditionText = document.getElementById('temp-condition');
let currentDay = document.getElementById('day');
let currentDayMonth = document.getElementById('dayMonth');
var searchInput = document.getElementById('search');
var searchBtn = document.getElementById('submit');
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var divContainer = '';


async function fetchedData(keyword) {
    let data = await fetch('http://api.weatherapi.com/v1/forecast.json?key=79038ac08e2843ae80a162514231602&days=3&q=' + keyword);
    if (data.status == 200 && data.ok == true) {
        let result = await data.json();
        todayWeather(result.location, result.current);
        viewForecast(result.forecast.forecastday);
        // console.log(result);
    }
}

function todayWeather(location, current) {
    if (current != null && location != null) {
        let dateObject = new Date(current.last_updated);
        let getDate = dateObject.getDate(); 
        let getDay = days[dateObject.getDay()]; 
        let getMonth = month[dateObject.getMonth()];
        currentContainer = `
        <div class="col-md-4">
                            <div class="card current-day">
                                <div class="card-header d-flex justify-content-between align-items-center">
                                    <div id="day">${getDay}</div>
                                    <div id="dayMonth">${getDate + " " + getMonth}</div>
                                </div>
                                <div class="card-body">
                                    <div class="card-title location" id="location">${location.name}</div>
                                    <div class="temp-info d-flex align-items-center justify-content-between">
                                        <div id="temp" class="temp">${current.temp_c}<sup>o</sup>C</div>
                                        <div class="icon-img" id="icon-img">
                                        <img width="120" height="120"src="${current.condition.icon}">
                                        </div>
                                    </div>
                                    <div class="temp-condition" id="temp-condition">${current.condition.text}</div>
                                    <span><img src="./img/icon-umberella.png" alt="">20%</span>
                                    <span><img src="./img/icon-wind.png" alt="">18km/h</span>
                                    <span><img src="./img/icon-compass.png" alt="">East</span>
                                </div>
                            </div>
                        </div>
        `;
        document.getElementById('divContainer').innerHTML = currentContainer;
    }
}

function viewForecast(forecast) {
    let Conatiner = '';
    for (let i = 1; i < forecast.length; i++) {
        Conatiner += `
        <div class="col-md-4 next-days">
            <div class="card">
                <div class="card-header d-flex justify-content-center">
                    <div>${days[new Date(forecast[i].date).getDay()]}</div>
                </div>
                <div class="card-body">
                    <div class="pub-icon">
                        <img src="${forecast[i].day.condition.icon}" alt="">
                    </div>
                    <div class="high-temp mb-2">${forecast[i].day.maxtemp_c}<sup>0</sup>C</div>
                    <div class="low-temp">${forecast[i].day.mintemp_c}<sup>0</sup></div>
                    <div class="temp-condition">${forecast[i].day.condition.text}</div>
                </div>
            </div>
        </div>
        `;

    }
    document.getElementById('divContainer').innerHTML += Conatiner;
}


searchBtn.addEventListener("click", function () {
    if (searchInput.value.toLowerCase() != null && searchInput.value.toLowerCase() != '') {
        fetchedData(searchInput.value.toLowerCase());
    }
    fetchedData('Cairo');
});

searchInput.addEventListener("keyup", function () {
    if (searchInput.value != null && searchInput.value != '') {
        fetchedData(searchInput.value.toLowerCase());
    }
    fetchedData('Cairo');
});

fetchedData('Cairo');
