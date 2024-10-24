const response = await fetch('https://api.appcloud.es/api/validacion/user/{usuario}/password/{clave}', {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${base64Credentials}`,
    },
});
const data = await response.json();