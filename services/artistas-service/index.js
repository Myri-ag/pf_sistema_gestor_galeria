const express = require('express');
const app = express();
const PORT = 3000;

const artistas = [
    { id: 1, nombre: "Vincent van Gogh", estilo: "Postimpresionismo", pais: "Países Bajos", obra: "La noche estrellada" },
    { id: 2, nombre: "Frida Kahlo", estilo: "Surrealismo", pais: "México", obra: "Las dos Fridas" },
    { id: 3, nombre: "Leonardo da Vinci", estilo: "Renacimiento", pais: "Italia", obra: "La Gioconda" }
];

app.get('/', (req, res) => {
    // Generamos el HTML dinámicamente con el diseño solicitado
    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>PF_GALERIA</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; display: flex; height: 100vh; background-color: #F5F5F5; }
            
            /* Panel Lateral */
            .sidebar { width: 250px; background-color: #CFD8DC; color: #37474F; display: flex; flex-direction: column; padding: 20px; border-right: 2px solid #B0BEC5; }
            .sidebar h2 { font-size: 1.2rem; color: #0277BD; margin-bottom: 30px; text-align: center; }
            .sidebar a { text-decoration: none; color: #455A64; padding: 15px; margin: 5px 0; border-radius: 8px; transition: 0.3s; font-weight: bold; }
            .sidebar a:hover { background-color: #E3F2FD; color: #0277BD; }
            .sidebar a.active { background-color: #0277BD; color: white; }

            /* Contenido Principal */
            .main-content { flex-grow: 1; display: flex; flex-direction: column; }
            
            /* Encabezado */
            header { background-color: #0277BD; color: white; padding: 15px 30px; font-size: 1.5rem; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }

            /* Tabla */
            .container { padding: 40px; }
            table { width: 100%; border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
            th { background-color: #E3F2FD; color: #0277BD; padding: 15px; text-align: left; border-bottom: 2px solid #B0BEC5; }
            td { padding: 15px; border-bottom: 1px solid #EEEEEE; color: #546E7A; }
            tr:hover { background-color: #FAFAFA; }
        </style>
    </head>
    <body>
        <div class="sidebar">
            <h2>MENÚ</h2>
            <a href="http://localhost:8080" class="active">Artistas</a>
            <a href="http://localhost:8081">Obras</a>
            <a href="http://localhost:8082">Visitantes</a>
        </div>
        <div class="main-content">
            <header>PF_GALERIA</header>
            <div class="container">
                <h3>Gestión de Artistas</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Estilo</th>
                            <th>País</th>
                            <th>Obra Maestra</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${artistas.map(a => `
                            <tr>
                                <td>${a.id}</td>
                                <td>${a.nombre}</td>
                                <td>${a.estilo}</td>
                                <td>${a.pais}</td>
                                <td>${a.obra}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </body>
    </html>
    `;
    res.send(html);
});

app.listen(PORT, () => console.log(`Dashboard corriendo en http://localhost:${PORT}`));
