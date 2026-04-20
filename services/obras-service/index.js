const express = require('express');
const app = express();
const PORT = 4000;

const obras = [
    { id: 101, titulo: "La noche estrellada", tecnica: "Óleo", año: 1889, sala: "Postimpresionismo" },
    { id: 102, titulo: "Las dos Fridas", tecnica: "Óleo sobre lienzo", año: 1939, sala: "Surrealismo" },
    { id: 103, titulo: "La Gioconda", tecnica: "Óleo sobre tabla", año: 1503, sala: "Renacimiento" }
];

app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>PF_GALERIA - Obras</title>
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
        </style>
    </head>
    <body>
        <div class="sidebar">
            <h2>MENÚ</h2>
            <a href="http://45.55.98.199">Artistas</a>
            <a href="http://129.212.147.117" class="active">Obras</a>
            <a href="http://174.138.117.102">Visitantes</a>
        </div>
        <div class="main-content">
            <header>PF_GALERIA</header>
            <div class="container">
                <h3>Inventario de Obras</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Técnica</th>
                            <th>Año</th>
                            <th>Sala</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${obras.map(o => `
                            <tr>
                                <td>${o.id}</td>
                                <td>${o.titulo}</td>
                                <td>${o.tecnica}</td>
                                <td>${o.año}</td>
                                <td>${o.sala}</td>
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

app.listen(PORT, () => console.log('Servicio Obras listo'));
