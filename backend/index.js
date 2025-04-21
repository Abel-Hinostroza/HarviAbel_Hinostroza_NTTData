// RETO TÉCNICO - NTT DATA | HARVI ABEL HINOSTROZA JAVIER 
// BACKEND CON NODE.JS Y EXPRESS
// Creo un servidor Express que expone una API RESTful para obtener datos de usuarios aleatorios desde la API de Random User Generator (Dato que se brindo para la prueba técnica).

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api/?results=10');
        const users = response.data.results.map(user => ({
            nombre: `${user.name.first} ${user.name.last}`,
            genero: user.gender,
            ubicacion: `${user.location.city}, ${user.location.country}`,
            correo: user.email,
            fechaNacimiento: user.dob.date,
            fotografia: user.picture.medium
        }));
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});