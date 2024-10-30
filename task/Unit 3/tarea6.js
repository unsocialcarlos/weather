// const { url } = require("inspector");

document.addEventListener('DOMContentLoaded', function () {
    // Función que hace la solicitud fetch
    async function f6() {
        const inputValor = document.querySelector('.i-6').value.trim().toLowerCase();
        url = `https://clouddemosjncv14.audidata.es:5555/api/maestro/articulos/filtro/descart='${inputValor}'`
            console.log(url)
        try {
            
            // Realizamos la solicitud fetch a la API
            const respuesta = await fetch(url, {
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
            // const datosArticulos = datos;
            console.log(datos)
            
            // Obtenemos el valor del input
            

            // Creamos una tabla para mostrar 'codart' y 'descart'
            

            let codar = datos[0].codart
            let descart = datos[0].descart
            console.log(codar, descart)
            let tablaHTML = `<table border="1"><tr><th>Codart</th><th>Nombre</th></tr><tr><td>${codar}</td><td>${descart}</td></tr></table>`;
                // Iteramos sobre los artículos filtrados para construir las filas de la tabla
                // datosArticulos.forEach(articulo => {tablaHTML+=articulo.codart;})
                
            

            // Mostramos la tabla en el div con clase 'out-6'
            document.querySelector('.out-6').innerHTML = tablaHTML;

        } catch (error) {
            // Mostramos el error en caso de que haya algún problema
            console.error('Error en el fetch:', error);
            document.querySelector('.out-6').textContent = 'Ocurrió un error: ' + error.message;
        }
    }

    // Asignamos la función al evento onclick del botón con clase '.button-primary-b-6'
    document.querySelector('.button-primary-b-6').addEventListener('click', f6);
});

