
//**********Función f5*********** 
async function f5() { 
    //Obtener token para poder validar petición a la api 
    const data = await getToken(); 
   
    if (data) { 
      const token = data.token; //JWT Token 
   
      console.log(data); 
      console.log("token: " + token); 
   
      //Conseguir datos de maestro/articulos 
      let input = document.getElementById("i-5"); //Input donde se escribe la palabra a buscar. 
      filter = input.value.toUpperCase(); //Valor escrito en el input. 
      let url = ${URL}/api/maestro/articulos/filtro/descart='${filter}'; 
      console.log("URL: ", url); 
      const responseArticulos = await fetch(url, { 
        method: "GET", 
        headers: { 
          Authorization: "Bearer " + token, //Utilizar JWT Token 
        }, 
      }); 
   
      if (!responseArticulos.ok) { 
        throw new Error("Error en la solicitud"); 
      } 
   
      const dataArticulos = await responseArticulos.json(); //Datos de articulos 
      console.log(dataArticulos); 
   
      if (Array.isArray(dataArticulos)) { 
        let out5 = document.getElementById("out-5"); //Contenedor para los datos 
   
        //Crear la tabla y las cabeceras 
        let tableHTML = ` 
          <table border="1" id="the_table_body"> 
            <thead> 
              <tr> 
                <th>Código artículo</th> 
                <th>Artículo</th> 
              </tr> 
            </thead> 
            <tbody> 
        `; 
   
        //Agregar las filas con los datos de Articulos 
        dataArticulos.forEach((articulo) => { 
          let codart = articulo.codart; //Código del Articulos 
          let descart = articulo.descart; //Articulo 
          console.log(codart, descart); 
   
          tableHTML += ` 
            <tr> 
              <td>${codart}</td> 
              <td>${descart}</td> 
            </tr> 
          `; 
        }); 
   
        //Cerrar la tabla 
        tableHTML += ` 
            </tbody> 
          </table> 
        `; 
   
        //Incrustar la tabla en el contenedor 'out-4' 
        out5.innerHTML = tableHTML; 
      } 
    } 
  }