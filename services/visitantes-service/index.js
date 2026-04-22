const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Configuración para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));

// CONEXIÓN A LA BASE DE DATOS
// Usamos "galeria_visitantes" para este microservicio
mongoose.connect('mongodb://db:27017/galeria_visitantes')
    .then(() => console.log("Conectado a MongoDB (Visitantes)"))
    .catch(err => console.error("Error al conectar a MongoDB:", err));

// DEFINICIÓN DEL MODELO
const Visitante = mongoose.model('Visitante', {
    ticket: String,
    nombre: String,
    fecha: String,
    hora: String,
    estado: String
});

app.get('/', async (req, res) => {
    try {
        // Traemos todos los visitantes de la DB
        const listaVisitantes = await Visitante.find();

        // Generamos las filas de la tabla dinámicamente
        const filasVisitantes = listaVisitantes.map(v => `
            <tr>
                <td class="fw-bold">${v.ticket}</td>
                <td>${v.nombre}</td>
                <td>${v.fecha} | ${v.hora}</td>
                <td>
                    <span class="badge rounded-pill px-3 py-2" 
                          style="background: ${v.estado === 'dentro' ? 'rgba(129, 236, 236, 0.2)' : '#f8f9fa'}; 
                                 color: ${v.estado === 'dentro' ? '#00b894' : '#636e72'};">
                        ${v.estado.toUpperCase()}
                    </span>
                </td>
            </tr>
        `).join('');

        res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Galeria | Control Visitantes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
        :root { --lila: #a29bfe; --lila-dark: #6c5ce7; --celeste: #81ecec; --glass: rgba(255, 255, 255, 0.85); }
        body { background: linear-gradient(135deg, #f0f2f5 0%, #e6e9ff 100%); min-height: 100vh; font-family: 'Poppins', sans-serif; }
        .navbar { background: var(--glass); backdrop-filter: blur(10px); border-bottom: 2px solid rgba(162, 155, 254, 0.2); }
        .nav-link { font-weight: 500; margin: 0 10px; color: #2d3436; text-decoration: none; }
        .card-custom { background: var(--glass); border-radius: 24px; box-shadow: 20px 20px 60px #d9dadc, -20px -20px 60px #ffffff; }
        .btn-gradient { background: linear-gradient(45deg, var(--lila), var(--celeste)); border: none; color: white; font-weight: 600; border-radius: 12px; padding: 12px 25px; }
        .table tr { background: white; border-radius: 15px; margin-bottom: 10px; display: table-row; }
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
                <h1 class="display-4 fw-bold">Afluencia de <span style="color: var(--lila)">Público</span></h1>
                <p class="text-muted">Registro en tiempo real de visitantes.</p>
            </div>
            <div class="col-md-4 text-md-end">
                <button class="btn btn-gradient btn-lg shadow-sm" data-bs-toggle="modal" data-bs-target="#modalVisitante">Nuevo Ingreso</button>
            </div>
        </div>

        <div class="card-custom p-4">
            <table class="table align-middle">
                <thead class="text-muted small">
                    <tr><th># TICKET</th><th>NOMBRE</th><th>VISITA (FECHA/HORA)</th><th>ESTADO</th></tr>
                </thead>
                <tbody>${filasVisitantes}</tbody>
            </table>
        </div>
    </main>

    <div class="modal fade" id="modalVisitante" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg" style="border-radius: 30px;">
                <div class="modal-body p-5">
                    <h3 class="fw-bold text-center mb-1">Check-in</h3>
                    <p class="text-center text-muted mb-4 small">Completa los datos del visitante</p>
                    <form action="/registrar-visitante" method="POST">
                        <input name="ticket" type="text" class="form-control rounded-pill bg-light p-3 mb-3" placeholder="ID de Ticket" required>
                        <input name="nombre" type="text" class="form-control rounded-pill bg-light p-3 mb-3" placeholder="Nombre completo" required>
                        <div class="row mb-3">
                            <div class="col-6">
                                <input name="fecha" type="date" class="form-control rounded-pill bg-light p-3">
                            </div>
                            <div class="col-6">
                                <input name="hora" type="time" class="form-control rounded-pill bg-light p-3">
                            </div>
                        </div>
                        <select name="estado" class="form-select rounded-pill bg-light p-3 mb-4">
                            <option value="dentro">Dentro de las instalaciones</option>
                            <option value="fuera">Fuera de las instalaciones</option>
                        </select>
                        <button type="submit" class="btn btn-gradient w-100 py-3 shadow">Registrar Entrada</button>
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
        res.status(500).send("Error al cargar los visitantes");
    }
});

// Ruta para guardar nuevo visitante
app.post('/registrar-visitante', async (req, res) => {
    try {
        const nuevoVisitante = new Visitante({
            ticket: req.body.ticket,
            nombre: req.body.nombre,
            fecha: req.body.fecha,
            hora: req.body.hora,
            estado: req.body.estado
        });
        await nuevoVisitante.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error al guardar el visitante");
    }
});

app.listen(port, () => {
    console.log(`Servicio Visitantes corriendo en http://localhost:${port}`);
});
