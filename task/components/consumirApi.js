const apiKey = '5c6fb6b369b7d6308488bbe35bcdb71e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});
locationInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        }
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
        .then(response => {
            // Verifica si la respuesta es exitosa (status en el rango 200-299)
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Error(404).');
                } else {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
            }
            return response.json(); // Si es exitosa, convertir a JSON
        })
        .then(data => {
            // Actualiza el contenido del DOM con los datos obtenidos
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            // Manejo del error, incluido el 404
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Ubicación no encontrada';
            temperatureElement.textContent = '';
            descriptionElement.textContent = error.message; // Mostrar mensaje de error en la página
        });
}


