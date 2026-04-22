const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;

// Configuración para leer datos de formularios
app.use(express.urlencoded({ extended: true }));

// CONEXIÓN A LA BASE DE DATOS
// Usamos "galeria_obras" para separar los datos de los otros servicios
mongoose.connect('mongodb://db:27017/galeria_obras')
    .then(() => console.log("Conectado a MongoDB (Obras)"))
    .catch(err => console.error("Error al conectar a MongoDB:", err));

// DEFINICIÓN DEL MODELO
const Obra = mongoose.model('Obra', {
    titulo: String,
    fecha: String,
    tecnica: String,
    artista: String,
    area: String
});

app.get('/', async (req, res) => {
    try {
        // Traemos todas las obras de la DB
        const listaObras = await Obra.find();

        // Generamos las tarjetas dinámicamente
        const tarjetasObras = listaObras.map((o, index) => `
            <div class="col-md-4 mb-4">
                <div class="card-custom p-4 h-100">
                    <div class="d-flex justify-content-between mb-3">
                        <span class="badge rounded-pill bg-light text-primary">${o.area}</span>
                        <small class="text-muted">ID: #0${index + 100}</small>
                    </div>
                    <h4 class="fw-bold mb-1 text-capitalize">${o.titulo}</h4>
                    <p class="text-lila fw-medium small mb-3">Por: ${o.artista}</p>
                    <div class="bg-white rounded-3 p-3 shadow-sm border-light">
                        <ul class="list-unstyled mb-0 small text-muted">
                            <li class="mb-2"><strong>Fecha:</strong> ${o.fecha}</li>
                            <li><strong>Técnica:</strong> ${o.tecnica}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');

        res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Galeria | Obras de Arte</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
        :root { --lila: #a29bfe; --lila-dark: #6c5ce7; --celeste: #81ecec; --glass: rgba(255, 255, 255, 0.85); }
        body { background: linear-gradient(135deg, #f0f2f5 0%, #e6e9ff 100%); min-height: 100vh; font-family: 'Poppins', sans-serif; }
        .navbar { background: var(--glass); backdrop-filter: blur(10px); border-bottom: 2px solid rgba(162, 155, 254, 0.2); }
        .nav-link { font-weight: 500; margin: 0 10px; color: #2d3436; text-decoration: none; }
        .card-custom { background: var(--glass); border-radius: 24px; box-shadow: 20px 20px 60px #d9dadc, -20px -20px 60px #ffffff; transition: 0.3s; }
        .card-custom:hover { transform: translateY(-5px); }
        .btn-gradient { background: linear-gradient(45deg, var(--lila), var(--celeste)); border: none; color: white; font-weight: 600; border-radius: 12px; padding: 12px 25px; }
        .text-lila { color: var(--lila-dark); }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container">
            <a class="navbar-brand fw-bold fs-3" href="#">
                <span style="color: var(--lila-dark)">A&G</span><span style="color: var(--celeste)">Studio</span>
            </a>
            <ul class="navbar-nav ms-auto text-uppercase small">
                <li class="nav-item"><a class="nav-link" href="http://45.55.98.199">Artistas</a></li>
                <li class="nav-item"><a class="nav-link" href="http://129.212.147.117">Obras</a></li>
                <li class="nav-item"><a class="nav-link" href="http://174.138.117.102">Visitantes</a></li>
            </ul>
        </div>
    </nav>

    <main class="container my-5">
        <div class="row mb-5 align-items-center">
            <div class="col-md-8">
                <h1 class="display-4 fw-bold">Catálogo de <span style="color: var(--celeste)">Obras</span></h1>
                <p class="text-muted">Inventario de piezas y su ubicación física en la galería.</p>
            </div>
            <div class="col-md-4 text-md-end">
                <button class="btn btn-gradient btn-lg" data-bs-toggle="modal" data-bs-target="#modalObra">+ Nueva Obra</button>
            </div>
        </div>

        <div class="row">${tarjetasObras}</div>
    </main>

    <div class="modal fade" id="modalObra" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg" style="border-radius: 30px;">
                <div class="modal-body p-5">
                    <h3 class="fw-bold text-center mb-4">Registrar Obra</h3>
                    <form action="/agregar-obra" method="POST">
                        <input name="titulo" type="text" class="form-control rounded-pill bg-light p-3 mb-3" placeholder="Título de la obra" required>
                        <div class="row">
                            <div class="col-6 mb-3">
                                <input name="fecha" type="date" class="form-control rounded-pill bg-light p-3">
                            </div>
                            <div class="col-6 mb-3">
                                <input name="tecnica" type="text" class="form-control rounded-pill bg-light p-3" placeholder="Técnica">
                            </div>
                        </div>
                        <input name="artista" type="text" class="form-control rounded-pill bg-light p-3 mb-3" placeholder="Nombre del Artista">
                        <input name="area" type="text" class="form-control rounded-pill bg-light p-3 mb-4" placeholder="Área de ubicación (Ej: Sala Norte)">
                        <button type="submit" class="btn btn-gradient w-100 py-3 shadow">Añadir a la Colección</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
        `);
    } catch (err) {
        res.status(500).send("Error al cargar las obras");
    }
});

// Ruta para procesar el formulario
app.post('/agregar-obra', async (req, res) => {
    try {
        const nuevaObra = new Obra({
            titulo: req.body.titulo,
            fecha: req.body.fecha,
            tecnica: req.body.tecnica,
            artista: req.body.artista,
            area: req.body.area
        });
        await nuevaObra.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error al guardar la obra");
    }
});

app.listen(port, () => {
    console.log(`Servicio Obras corriendo en http://localhost:${port}`);
});
