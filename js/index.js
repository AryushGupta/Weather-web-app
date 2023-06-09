import { MY_API_Key } from "./config.js";

const cityName = document.getElementById("search-city");
const searchBtn = document.getElementById("search-btn");

const currentTemp = document.getElementById("current-temperature");
const userCity = document.getElementById("city-name");
const weatherImg = document.getElementById("weather-img");

const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");

async function fetchData(getCityName) {
    let url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${getCityName}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${MY_API_Key}`,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    }
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}


searchBtn.addEventListener("click", getReport);

async function getReport() {
    const result = await fetchData(cityName.value);
    // Changing img acc to weather ->
    checkWeather(result.current.condition.text);

    currentTemp.textContent = result.current.temp_c;
    userCity.textContent = result.location.name;

    humidity.textContent = result.current.humidity + "%";
    windSpeed.textContent = result.current.wind_kph + " km/hr";
}

checkWeather = (currConditon) => {
    switch (currConditon) {
        case "Sunny":
            weatherImg.src = "../img/sun.png";
            weatherImg.alt = "Sunny-img";
            break;

        case "Rain":
            weatherImg.src = "../img/rainy.png";
            weatherImg.alt = "Sunny-img";
            break;

        case "Cloudy":
            weatherImg.src = "../img/cloudy.png";
            weatherImg.alt = "Cloudy-img";
            break;

        case "Thunderstorm":
            weatherImg.src = "../img/thunderstorm.png";
            weatherImg.alt = "Thunderstorm-img";
            break;
    }
}