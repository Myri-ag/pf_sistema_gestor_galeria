const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Microservicio de Artistas - Galería de Arte');
});

app.listen(3000, () => console.log('Artistas corriendo en puerto 3000'));
