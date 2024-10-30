/*
document.addEventListener('DOMContentLoaded', function () {
    // Función que hace la solicitud fetch
    async function f4() {
        try {
            // Realizamos la solicitud fetch a la API
            const respuesta = await fetch('https://clouddemosjncv14.audidata.es:5555/api/maestro/articulos', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Asegúrate de tener el token correcto
                }
            });

            // Verificamos si la respuesta fue exitosa
            if (!respuesta.ok) {
                throw new Error('Error en la solicitud: ' + respuesta.status);
            }

            // Convertimos la respuesta en JSON
            const datos = await respuesta.json();

            // Obtenemos el valor del input
            const inputValor = document.querySelector('.i-4').value.trim();

            // Filtramos los datos si hay un valor en el input, si no, mostramos todos los datos
            const datosFiltrados = inputValor
                ? datos.filter(articulo => articulo.codart.includes(inputValor) || articulo.descart.includes(inputValor))
                : datos;

            // Creamos una tabla para mostrar 'codart' y 'descart'
            let tablaHTML = '<table border="1"><tr><th>Codart</th><th>Nombre</th></tr>';

            // Iteramos sobre los artículos filtrados para construir las filas de la tabla
            datosFiltrados.forEach(articulo => {
                const codigoArticulo = articulo.codart || 'Sin código';
                const nombreProducto = articulo.descart || 'Sin descripción';
                tablaHTML += `<tr><td>${codigoArticulo}</td><td>${nombreProducto}</td></tr>`;
            });

            tablaHTML += '</table>';  // Cerramos la tabla

            // Mostramos la tabla en el div con clase 'out-4'
            document.querySelector('.out-4').innerHTML = tablaHTML;

        } catch (error) {
            // Mostramos el error en caso de que haya algún problema
            console.error('Error en el fetch:', error);
            document.querySelector('.out-4').textContent = 'Ocurrió un error: ' + error.message;
        }
    }

    // Asignamos la función al evento onclick del botón con clase '.button-primary-b-4'
    document.querySelector('.button-primary-b-4').addEventListener('click', f4);
});

*/

document.addEventListener('DOMContentLoaded', function () {
   
    // Función que hace la solicitud fetch
    async function tabla4() {
        try {
            // Asegúrate de que el token esté definido antes de hacer la solicitud
            if (!token) {
                throw new Error('Token no definido');
            }

            // Realizamos la solicitud fetch a la API
            const respuesta = await fetch('https://clouddemosjncv14.audidata.es:5555/api/maestro/articulos', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Asegúrate de tener el token correcto
                }
            });

            // Verificamos si la respuesta fue exitosa
            if (!respuesta.ok) {
                throw new Error('Error en la solicitud: ' + respuesta.status);
            }

            // Convertimos la respuesta en JSON
            const datos = await respuesta.json();

            // Verificamos si los datos están en el formato correcto
            if (!Array.isArray(datos)) {
                throw new Error('El formato de los datos no es el esperado.');
            }

            // Creamos una tabla para mostrar 'codar' y 'nomcli'
            let tablaHTML = '<table border="1"><tr><th>Codar</th><th>Nomcli</th></tr>';

            // Iteramos sobre cada artículo para construir las filas de la tabla
            datos.forEach(articulo => {
                        const code = articulo.codart || 'Sin código';
                        const cli = articulo.nompro || 'Sin nombre';
                        tablaHTML += `<tr><td>${code}</td><td>${cli}</td></tr>`;
                    });

            tablaHTML += '</table>';  // Cerramos la tabla

            // Mostramos la tabla en el div con clase 'out-4'
            document.querySelector('.out-4').innerHTML = tablaHTML;

        } catch (error) {
            // Mostramos el error en caso de que haya algún problema
            console.error('Error en el fetch:', error);
            document.querySelector('.out-4').textContent = 'Ocurrió un error: ' + error.message;
        }
    }

    // Asignamos la función al evento onclick del botón con clase '.button-primary-b-4'
    document.querySelector('.button-primary-b-4').addEventListener('click', tabla4);
});
