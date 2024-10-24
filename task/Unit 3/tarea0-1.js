// Credenciales
const username = 'jnc';
const password = 'passjnc';

// Codificar las credenciales en Base64
const base64Credentials = btoa(`${username}:${password}`);

// Hacer la solicitud POST para obtener el token
fetch('https://clouddemosjncv14.audidata.es:5555/api/login', {
    method: 'POST',
    headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json' // Cambia esto si el servidor requiere un tipo de contenido diferente
    },
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); 
    })
    .then(data => {
        console.log('Token obtenido:', data.token); 
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

// TOKEN
const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJETVZDRnJhbWV3b3JrIEpXVCBBdXRob3JpdHkiLCJleHAiOjE3Mjk4MDI4OTQsIm5iZiI6MTcyOTc4MTIwNCwicm9sZXMiOiIiLCJUaXBvIjoiUEUiLCJDb2RpZ28iOiIgICAgICAgOSIsIkFsYXJtYSI6IiIsInVzZXJuYW1lIjoiam5jIn0.DUoQmmg4pxR5hEBi4LqBWY87ZVEQxAHZAs90niDMb6vjsu3xZqHOirBkLpmVi--9WqvjUO7q9dX0vLktODMVPQ'

// T A R E A - 1

// Función que hace la solicitud fetch
async function obtenerDatos() {
    try {
        
        const respuesta = await fetch('https://clouddemosjncv14.audidata.es:5555/api/maestro/articulos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  
            }
        });

        if (!respuesta.ok) {
            throw new Error('Error en la solicitud: ' + respuesta.status);
        }

        const datos = await respuesta.json();

        // Suponemos que 'datos' contiene una lista de artículos.
        // Accedemos a cada 'descart' en los artículos y los unimos en una cadena separada por comas
        const descripciones = datos.map(articulo => articulo.descart).join(', ');

        // Mostramos los datos en el div
        document.getElementById('out-1').textContent = descripciones;

    } catch (error) {
        // Mostramos el error en caso de que haya algún problema
        console.error('Error en el fetch:', error);
        document.getElementById('out-1').textContent = 'Ocurrió un error: ' + error.message;
    }
}

// Asignamos la función al evento onclick del botón
document.getElementById('fetchButton').addEventListener('click', obtenerDatos);



