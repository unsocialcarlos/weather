const express = require('express');
const app = express();
const path = require('path');

// Sirve el archivo HTML
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Puerto donde se ejecutará el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
