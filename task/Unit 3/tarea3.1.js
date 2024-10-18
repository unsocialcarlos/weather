document.addEventListener('DOMContentLoaded', function () {
    // Función que hace la solicitud fetch usando promesa
    function tabla3() {
        return new Promise((resolveF1, rechazarError) => {
            // Hacemos la solicitud fetch
            fetch('https://clouddemosjncv14.audidata.es:5555/api/maestro/clientes', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Usamos el token
                }
            })
                .then(respuesta => {
                    // Verificamos si la respuesta fue exitosa
                    if (!respuesta.ok) {
                        throw new Error('Error en la solicitud: ' + respuesta.status);
                    }
                    return respuesta.json(); // Convertimos la respuesta a JSON
                })
                .then(datos => {
                    // 2. Crear una tabla con 'Código' y 'Cli' en out-3
                    let tablaHTML = '<table border="1"><tr><th>Código</th><th>Cli</th></tr>';

                    // Iteramos sobre cada artículo para construir las filas de la tabla
                    datos.forEach(articulo => {
                        const code = articulo.codcli || 'Sin código';
                        const cli = articulo.nomcli || 'Sin nombre';
                        tablaHTML += `<tr><td>${code}</td><td>${cli}</td></tr>`;
                    });

                    tablaHTML += '</table>';

                    // Resolvemos la promesa con la tabla HTML generada
                    resolveF1(tablaHTML);

                })
                .catch(error => {
                    // Rechazamos la promesa si ocurre un error
                    rechazarError(error.message);
                });
        });
    }

    // Asignamos la función al evento onclick del botón
    document.querySelector('.button-primary-b-3').addEventListener('click', function () {
        // Llamamos a la función tabla3 y manejamos la promesa
        tabla3()
            .then(tablaHTML => {
                // Mostramos la tabla en el div 'out-3'
                document.querySelector('.out-3').innerHTML = tablaHTML;
            })
            .catch(errorMessage => {
                // Mostramos el mensaje de error en caso de que haya algún problema
                document.querySelector('.out-3').textContent = 'Ocurrió un error: ' + errorMessage;
            });
    });
});
