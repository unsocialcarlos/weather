// T A R E A - 2

document.addEventListener('DOMContentLoaded', function () {
    // Función que hace la solicitud fetch
    async function showName() {
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

            // 1. Mostrar todos los 'descart' en out-1 separados por comas
            const descripciones = datos.map(cliente => cliente.descart || 'Sin descripción').join(', ');
            document.getElementById('out-1').textContent = descripciones; // Cambié a 'out-1' según tu requerimiento

            // 2. Crear una tabla con 'nomcli' y 'nifcli' en out-2
            let tablaHTML = '<table border="1"><tr><th>Nombre</th><th>NIF</th></tr>';

            // Iteramos sobre cada artículo para construir las filas de la tabla
            datos.forEach(articulo => {
                const nombre = articulo.nomcli || 'Sin nombre';
                const nif = articulo.nifcli || 'Sin NIF';
                tablaHTML += `<tr><td>${nombre}</td><td>${nif}</td></tr>`;
            });

            tablaHTML += '</table>';

            // Mostramos la tabla en el div 'out-2'
            document.querySelector('.out-2').innerHTML = tablaHTML;

        } catch (error) {
            // Mostramos el error en caso de que haya algún problema
            console.error('Error en el fetch:', error);
            document.getElementById('out-1').textContent = 'Ocurrió un error: ' + error.message; // Cambié a 'out-1' para el error
        }
    }

    // Asignamos la función al evento onclick del botón
    document.querySelector('.fetchButton2').addEventListener('click', showName);
});
