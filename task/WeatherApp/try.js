const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const iconElement = document.getElementById('weatherIcon');
const visibilityElement = document.getElementById('visibility');
const windElement = document.getElementById('wind');
const pressureElement = document.getElementById('pressure');
const rainElement = document.getElementById('rain');


// Función para obtener la ubicación actual del usuario
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        }, (error) => {
            console.error('Error obteniendo la ubicación:', error);
            locationElement.textContent = 'No se pudo obtener la ubicación. Busque manualmente.';
        });
    } else {
        console.error('La geolocalización no está soportada en este navegador.');
        locationElement.textContent = 'La geolocalización no está soportada en este navegador.';
    }
}

// Función para obtener el clima basado en la ciudad
function fetchWeather(location) {
    const url = `${config.API_URL}?q=${location}&appid=${config.API_KEY}&units=metric&lang=es`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Inténtelo de nuevo.');
                } else {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
            }
            return response.json();
        })
        .then(data => {
            // Actualizar el contenido del DOM con los datos obtenidos
            updateWeatherUI(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Ubicación no encontrada.';
            temperatureElement.textContent = '';
            descriptionElement.textContent = error.message;
            iconElement.src = '100px.png';
            iconElement.alt = '';
            visibilityElement.textContent = '';
            windElement.textContent = '';
            pressureElement.textContent = '';
            rainElement.textContent = '';
        });
}

// Obtener el clima basado en las coordenadas (latitud y longitud)
function fetchWeatherByCoords(lat, lon) {
    const url = `${config.API_URL}?lat=${lat}&lon=${lon}&appid=${config.API_KEY}&units=metric&lang=es`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Ubicación no encontrada (404).');
                } else {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
            }
            return response.json();
        })
        .then(data => {
            // Actualiza el contenido del DOM con los datos obtenidos
            updateWeatherUI(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Ubicación no encontrada.';
            temperatureElement.textContent = '';
            descriptionElement.textContent = error.message;
            iconElement.src = '100px.png';
            iconElement.alt = '';
            visibilityElement.textContent = '';
            windElement.textContent = '';
            pressureElement.textContent = '';
            rainElement.textContent = '';
        });
}

// Función para actualizar la interfaz con los datos del clima
function updateWeatherUI(data) {
    const city = data.name;
    const country = data.sys.country;

    // Mostrar ciudad y país en el mismo elemento
    locationElement.textContent = `${city}, ${country}`;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;

    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconElement.src = iconUrl;
    iconElement.alt = data.weather[0].description;

    visibilityElement.textContent = `Visibilidad: ${data.visibility} m`;
    windElement.textContent = `Viento: ${data.wind.speed} m/s, dirección: ${data.wind.deg}°`;
    pressureElement.textContent = `Presión: ${data.main.pressure} hPa`;
    if (data.rain && data.rain['1h']) {
        rainElement.textContent = `Lluvia (última hora): ${data.rain['1h']} mm`;
    } else {
        rainElement.textContent = 'Lluvia: No se ha registrado lluvia en la última hora';
    }
}


// Evento para el botón de búsqueda
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

// Evento para presionar la tecla Enter en el campo de texto
locationInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        }
    }
});

// Llama a getUserLocation al cargar la página
window.addEventListener('load', () => {
    getUserLocation();
});
