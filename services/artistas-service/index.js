const express = require('express');
const app = express();
const PORT = 3000;

// Base de datos simulada (Estado inicial del microservicio)
const artistas = [
    { id: 1, nombre: "Vincent van Gogh", estilo: "Postimpresionismo", pais: "Países Bajos" },
    { id: 2, nombre: "Frida Kahlo", estilo: "Surrealismo", pais: "México" },
    { id: 3, nombre: "Leonardo da Vinci", estilo: "Renacimiento", pais: "Italia" }
];

// Endpoint principal: Información del servicio
app.get('/', (req, res) => {
    res.json({
        servicio: "Gestor de Artistas",
        estado: "Operativo",
        entorno: "Kubernetes Ready"
    });
});

// Endpoint para listar todos los artistas
app.get('/artistas', (req, res) => {
    res.json(artistas);
});

// Endpoint para buscar un artista específico por ID
app.get('/artistas/:id', (req, res) => {
    const artista = artistas.find(a => a.id === parseInt(req.params.id));
    if (!artista) return res.status(404).send('Artista no encontrado en la galería.');
    res.json(artista);
});

app.listen(PORT, () => {
    console.log(`Servicio de Artistas ejecutándose en http://localhost:${PORT}`);
});
