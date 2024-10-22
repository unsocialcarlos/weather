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

// Inicializa el mapa centrado en una ubicación por defecto
const map = L.map('map').setView([51.505, -0.09], 13);

// Agrega una capa de mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Marcador inicial, este se actualizará después
let marker;

// Función para obtener la ubicación actual del usuario y actualizar el mapa y clima
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Actualizar el mapa con la ubicación actual del dispositivo
            updateMap(lat, lon, '¡Estás aquí!');

            // Obtener el clima de la ubicación actual del dispositivo
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

            // Actualizar el mapa con la ubicación de la ciudad buscada
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            updateMap(lat, lon, `¡Ubicación: ${data.name}, ${data.sys.country}!`);
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

// Función para actualizar el mapa
function updateMap(lat, lon, popupText) {
    // Centrar el mapa en la nueva ubicación
    map.setView([lat, lon], 13);

    // Si ya existe un marcador, lo eliminamos
    if (marker) {
        map.removeLayer(marker);
    }

    // Agregar un nuevo marcador en la ubicación actual
    marker = L.marker([lat, lon]).addTo(map)
        .bindPopup(popupText)
        .openPopup();
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

// Llama a getUserLocation al cargar la página para obtener clima y ubicación actual del dispositivo
window.addEventListener('load', () => {
    getUserLocation();
});
