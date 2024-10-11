const openWeatherApiKey = '5c6fb6b369b7d6308488bbe35bcdb71e';
        const weatherContainer = document.getElementById('weather-container');
        const cityNameElement = document.getElementById('city-name');
        const weatherDescriptionElement = document.getElementById('weather-description');
        const temperatureElement = document.getElementById('temperature');
        const windElement = document.getElementById('wind');
        const pressureElement = document.getElementById('pressure');
        const weatherIconElement = document.getElementById('weather-icon');
        const cityInput = document.getElementById('city-input');
        const searchButton = document.getElementById('search-button');

//Obtener clima de la ubicacion actual
async function getCurrentLocationWeather(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async(position)=>{
            const { latitude, longitude} = position.coords;
            await fetchWeatherData(latitude, longitude);
        }, (error)=>{
            console.log('Error al obtener la ubicacion ', error);
            alert('No se pudo obtener la ubicacion, por favor introduce una ciudad')
        });
    }else{
        alert('La geolocalizacion no es soportada por este navegador.');
    }
}

// Obtener clima con latitud y longitud
async function fetchWeatherData (lat, lon){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric&lang=es`)
        const data = await response.json();
        updateWeatherUI(data);
    }catch(error){
        console.error('Error al obtener los datos del clima ', error);
        weatherContainer.innerHTML='<p>No se pudieron obtener los datos del clima. </p>';
    }
}