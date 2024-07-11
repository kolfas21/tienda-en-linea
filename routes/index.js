const express = require('express');
const router = express.Router();

// Controladores
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');

// Ruta para la página principal
router.get('/', productController.getAllProducts);

// Rutas de autenticación
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});
router.post('/login', userController.login);

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});
router.post('/register', userController.register);

module.exports = router;
