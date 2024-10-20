document.addEventListener('DOMContentLoaded', function () {
    // Función que hace la solicitud fetch
    async function tabla4() {
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

            // Creamos una tabla para mostrar 'codar' y 'nomcli'
            let tablaHTML = '<table border="1"><tr><th>Codar</th><th>Nomcli</th></tr>';

            // Iteramos sobre cada artículo para construir las filas de la tabla
            datos.forEach(articulo => {
                const codar = articulo.codar || 'Sin código';
                const nomcli = articulo.nomcli || 'Sin nombre';
                tablaHTML += `<tr><td>${codar}</td><td>${nomcli}</td></tr>`;
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
