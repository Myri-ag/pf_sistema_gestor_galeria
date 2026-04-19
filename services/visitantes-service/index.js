const express = require('express');
const app = express();
const PORT = 5000;

const visitantes = [
    { ticket: "V-501", nombre: "Ana García", fecha: "2026-04-19", hora: "10:30 AM", status: "Dentro" },
    { ticket: "V-502", nombre: "Luis Pérez", fecha: "2026-04-19", hora: "11:15 AM", status: "Salida" },
    { ticket: "V-503", nombre: "Elena Rivas", fecha: "2026-04-19", hora: "12:00 PM", status: "Dentro" }
];

app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>PF_GALERIA - Visitantes</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; margin: 0; display: flex; height: 100vh; background-color: #F5F5F5; }
            .sidebar { width: 250px; background-color: #CFD8DC; color: #37474F; display: flex; flex-direction: column; padding: 20px; border-right: 2px solid #B0BEC5; }
            .sidebar h2 { font-size: 1.2rem; color: #0277BD; margin-bottom: 30px; text-align: center; }
            .sidebar a { text-decoration: none; color: #455A64; padding: 15px; margin: 5px 0; border-radius: 8px; font-weight: bold; }
            .sidebar a:hover { background-color: #E3F2FD; color: #0277BD; }
            .sidebar a.active { background-color: #0277BD; color: white; }
            .main-content { flex-grow: 1; display: flex; flex-direction: column; }
            header { background-color: #0277BD; color: white; padding: 15px 30px; font-size: 1.5rem; font-weight: bold; }
            .container { padding: 40px; }
            table { width: 100%; border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
            th { background-color: #E3F2FD; color: #0277BD; padding: 15px; text-align: left; }
            td { padding: 15px; border-bottom: 1px solid #EEEEEE; color: #546E7A; }
            .status { padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }
            .dentro { background-color: #C8E6C9; color: #2E7D32; }
            .salida { background-color: #FFCCBC; color: #D84315; }
        </style>
    </head>
    <body>
        <div class="sidebar">
            <h2>MENÚ</h2>
            <a href="http://localhost:8080">Artistas</a>
            <a href="http://localhost:8081">Obras</a>
            <a href="http://localhost:8082" class="active">Visitantes</a>
        </div>
        <div class="main-content">
            <header>PF_GALERIA</header>
            <div class="container">
                <h3>Control de Visitantes</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Ticket</th>
                            <th>Visitante</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${visitantes.map(v => `
                            <tr>
                                <td>${v.ticket}</td>
                                <td>${v.nombre}</td>
                                <td>${v.fecha}</td>
                                <td>${v.hora}</td>
                                <td><span class="status ${v.status.toLowerCase()}">${v.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </body>
    </html>`;
    res.send(html);
});

app.listen(PORT, () => console.log('Servicio Visitantes listo'));
