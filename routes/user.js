const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de autenticación
router.get('/login', userController.login);
router.post('/register', userController.register);
router.get('/profile', userController.profile);

module.exports = router;
