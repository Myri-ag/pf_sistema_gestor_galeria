const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Esto es para que el servidor pueda leer los datos que envíes desde el formulario
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://db:27017/galeria_artistas')
    .then(() => console.log("Conectado a MongoDB (Artistas)"))
    .catch(err => console.error("Error al conectar a MongoDB:", err));

// DEFINICIÓN DEL MODELO (El esquema de la tabla)
const Artista = mongoose.model('Artista', {
    nombre: String,
    estilo: String,
    email: String,
    pais: String
});

app.get('/', async (req, res) => {
    try {
        // Buscamos todos los artistas guardados en la base de datos
        const listaArtistas = await Artista.find();

        // Generamos las filas de la tabla dinámicamente
        const filasTabla = listaArtistas.map(a => `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="rounded-circle me-3" style="width:40px; height:40px; background: #81ecec"></div>
                        <span class="fw-bold">${a.nombre}</span>
                    </div>
                </td>
                <td><span class="badge bg-light text-dark">${a.estilo}</span></td>
                <td>${a.email}</td>
                <td>${a.pais}</td>
                <td><button class="btn btn-sm btn-outline-secondary rounded-pill">Editar</button></td>
            </tr>
        `).join('');

        // Enviamos el diseño (HTML + CSS)
        res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Galeria | Artistas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
        :root { --lila: #a29bfe; --lila-dark: #6c5ce7; --celeste: #81ecec; --glass: rgba(255, 255, 255, 0.85); }
        body { background: linear-gradient(135deg, #f0f2f5 0%, #e6e9ff 100%); min-height: 100vh; font-family: 'Poppins', sans-serif; }
        .navbar { background: var(--glass); backdrop-filter: blur(10px); border-bottom: 2px solid rgba(162, 155, 254, 0.2); }
        .card-custom { background: var(--glass); border-radius: 24px; box-shadow: 20px 20px 60px #d9dadc, -20px -20px 60px #ffffff; }
        .btn-gradient { background: linear-gradient(45deg, var(--lila), var(--celeste)); border: none; color: white; font-weight: 600; border-radius: 12px; padding: 12px 25px; }
        .table tr { background: white; border-radius: 15px; }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container">
            <a class="navbar-brand fw-bold fs-3" href="#">
                <span style="color: var(--lila-dark)">A&G</span><span style="color: var(--celeste)">_Studio</span>
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
                <h1 class="display-4 fw-bold">Comunidad de <span style="color: var(--lila)">Artistas</span></h1>
                <p class="text-muted">Artistas registrados por sus colaboraciones en la galería.</p>
            </div>
            <div class="col-md-4 text-md-end">
                <button class="btn btn-gradient btn-lg" data-bs-toggle="modal" data-bs-target="#modalRegistro">+ Agregar Talento</button>
            </div>
        </div>

        <div class="card-custom p-4">
            <table class="table align-middle">
                <thead class="text-muted small">
                    <tr><th>ARTISTA</th><th>ESTILO</th><th>CONTACTO</th><th>PAÍS</th><th>ACCIONES</th></tr>
                </thead>
                <tbody>${filasTabla}</tbody>
            </table>
        </div>
    </main>

    <div class="modal fade" id="modalRegistro" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="border-radius: 30px;">
                <div class="modal-body p-5">
                    <h3 class="fw-bold text-center">Nuevo Registro</h3>
                    <form action="/agregar" method="POST">
                        <input name="nombre" type="text" class="form-control mb-3" placeholder="Nombre" required>
                        <input name="estilo" type="text" class="form-control mb-3" placeholder="Estilo" required>
                        <input name="email" type="email" class="form-control mb-3" placeholder="Email" required>
                        <input name="pais" type="text" class="form-control mb-3" placeholder="País" required>
                        <button type="submit" class="btn btn-gradient w-100">Guardar</button>
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
        res.status(500).send("Error al cargar los artistas");
    }
});

// Ruta para recibir los datos del formulario (Esto luego irá a MongoDB)
app.post('/agregar', async (req, res) => {
    try {
        const nuevoArtista = new Artista({
            nombre: req.body.nombre,
            estilo: req.body.estilo,
            email: req.body.email,
            pais: req.body.pais
        });
        await nuevoArtista.save(); // Guarda en MongoDB
        res.redirect('/'); // Recarga la página para ver al nuevo artista
    } catch (err) {
        res.status(500).send("Error al guardar el artista");
    }
});

app.listen(port, () => {
    console.log(`Servicio Artistas corriendo en http://localhost:${port}`);
});
