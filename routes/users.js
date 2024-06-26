const express = require('express');
const router = express.Router();


// Ruta para ver la lista de usuarios
router.get('/', (req, res) => {
    // Lógica para obtener la lista de usuarios
    res.send('Lista de usuarios');
});

// Ruta para agregar un nuevo usuario
router.post('/', (req, res) => {
    // Lógica para agregar un nuevo usuario
    res.send('Agregar usuario');
});

// Ruta para editar un usuario existente
router.put('/:id', (req, res) => {
    // Lógica para editar un usuario
    res.send('Editar usuario');
});

// Ruta para eliminar un usuario existente
router.delete('/:id', (req, res) => {
    // Lógica para eliminar un usuario
    res.send('Eliminar usuario');
});

module.exports = router;
