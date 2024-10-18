document.addEventListener('DOMContentLoaded', function () {
    // Función que hace la solicitud fetch
    async function tabla3() {
        try {
            // Hacemos la solicitud fetch
            const respuesta = await fetch('https://clouddemosjncv14.audidata.es:5555/api/maestro/clientes', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Usamos el token
                }
            });

            // Verificamos si la respuesta fue exitosa
            if (!respuesta.ok) {
                throw new Error('Error en la solicitud: ' + respuesta.status);
            }

            // Convertimos la respuesta a JSON
            const datos = await respuesta.json();

            // 2. Crear una tabla con 'Codigo' y 'Cli' en out-2
            let tablaHTML = '<table border="1"><tr><th>Código</th><th>Cli</th></tr>';

            // Iteramos sobre cada artículo para construir las filas de la tabla
            datos.forEach(articulo => {
                const code = articulo.codcli || 'Sin código';
                const cli = articulo.nomcli || 'Sin nombre';
                tablaHTML += `<tr><td>${code}</td><td>${cli}</td></tr>`;
            });

            tablaHTML += '</table>';

            // Mostramos la tabla en el div 'out-3'
            document.querySelector('.out-3').innerHTML = tablaHTML;

        } catch (error) {
            // Mostramos el error en caso de que haya algún problema
            console.error('Error en el fetch:', error);
            document.querySelector('.out-3').textContent = 'Ocurrió un error: ' + error.message; // Cambié a 'out-3' para el error
        }
    }

    // Asignamos la función al evento onclick del botón
    document.querySelector('.button-primary-b-3').addEventListener('click', tabla3);
});