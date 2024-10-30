document.addEventListener('DOMContentLoaded', function () {
    // Función que hace la solicitud fetch
    async function f5() {
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
            const datosArticulos = datos;
            
            // Obtenemos el valor del input
            const inputValor = document.querySelector('.i-5').value.trim().toLowerCase();

            // Creamos una tabla para mostrar 'codart' y 'descart'
            let tablaHTML = '<table border="1"><tr><th>Codart</th><th>Nombre</th></tr>';

            if (inputValor) {
                // Iteramos sobre los artículos filtrados para construir las filas de la tabla
                datosArticulos.forEach(articulo => {
                    const codigoArticulo = articulo.codart || 'Sin código';
                    const nombreProducto = articulo.nompro || 'Sin descripción';
                    
                    // Verificamos si 'inputValor' está en 'codigoArticulo' o en 'nombreProducto'
                    if (codigoArticulo.toLowerCase().includes(inputValor) || 
                        nombreProducto.toLowerCase().includes(inputValor)) {
                        tablaHTML += `<tr><td>${codigoArticulo}</td><td>${nombreProducto}</td></tr>`;
                    }
                });
            }
            tablaHTML += '</table>';  // Cerramos la tabla

            // Mostramos la tabla en el div con clase 'out-5'
            document.querySelector('.out-5').innerHTML = tablaHTML;

        } catch (error) {
            // Mostramos el error en caso de que haya algún problema
            console.error('Error en el fetch:', error);
            document.querySelector('.out-5').textContent = 'Ocurrió un error: ' + error.message;
        }
    }

    // Asignamos la función al evento onclick del botón con clase '.button-primary-b-4'
    document.querySelector('.button-primary-b-5').addEventListener('click', f5);
});
