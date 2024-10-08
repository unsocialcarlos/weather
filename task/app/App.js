const apiKey = '5c6fb6b369b7d6308488bbe35bcdb71e'; // Reemplaza con tu clave de API de OpenWeatherMap
const citySelect = document.getElementById('city-select');
const cityNameElement = document.getElementById('city-name');
const weatherIconElement = document.getElementById('weather-icon');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const windElement = document.getElementById('wind');
const pressureElement = document.getElementById('pressure');

// Función para mostrar la información meteorológica
function showWeather(data) {
    cityNameElement.textContent = data.name;
    temperatureElement.textContent = `Temperatura: ${Math.round(data.main.temp - 273.15)} °C`;
    descriptionElement.textContent = `Descripción: ${data.weather[0].description}`;
    windElement.textContent = `Viento: ${data.wind.speed} m/s`;
    pressureElement.textContent = `Presión: ${data.main.pressure} hPa`;
    weatherIconElement.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
}

// Función para obtener el clima
async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        if (!response.ok) throw new Error('No se pudo obtener el clima');

        const data = await response.json();
        showWeather(data);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al obtener la información del clima. Intenta nuevamente.');
    }
}

// Obtener la ciudad por defecto del usuario utilizando la geolocalización
function getDefaultCity() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            await getWeather(`lat=${lat}&lon=${lon}`);
        }, () => {
            // En caso de error, mostrar el clima de la primera ciudad de la lista
            getWeather(citySelect.value);
        });
    } else {
        // En caso de que la geolocalización no esté disponible, mostrar el clima de la primera ciudad de la lista
        getWeather(citySelect.value);
    }
}

// Obtener clima al cargar la página
window.onload = getDefaultCity;

// Cambiar ciudad y obtener el clima correspondiente
document.getElementById('get-weather').addEventListener('click', () => {
    getWeather(citySelect.value);
});
