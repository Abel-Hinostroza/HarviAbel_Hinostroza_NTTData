// RETO TÉCNICO - NTT DATA | HARVI ABEL HINOSTROZA JAVIER 
// BACKEND CON NODE.JS Y EXPRESS
// Creo un servidor Express que expone una API RESTful para obtener datos de usuarios aleatorios desde la API de Random User Generator (Dato que se brindo para la prueba técnica).

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware para habilitar CORS
// Esto permite que el frontend pueda hacer peticiones al backend sin problemas de CORS
app.use(cors());

app.get('/api/users', async (req, res) => {
    try {
        // Realizo una petición a la API de Random User Generator para obtener 10 usuarios aleatorios
        const response = await axios.get('https://randomuser.me/api/?results=10');

        // Mapeo la respuesta para obtener solo los datos necesarios y los formateo según lo solicitado
        const users = response.data.results.map(user => ({
            nombre: `${user.name.first} ${user.name.last}`,
            genero: user.gender,
            ubicacion: `${user.location.city}, ${user.location.country}`,
            correo: user.email,
            fechaNacimiento: user.dob.date,
            fotografia: user.picture.medium
        }));

        // Envio la respuesta al cliente en formato JSON
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});