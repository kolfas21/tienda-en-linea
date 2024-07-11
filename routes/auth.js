// routes/auth.js
const express = require('express');
const router = express.Router();

// Ruta de inicio de sesión
router.post('/login', (req, res, next) => {
    // Temporalmente omitir la autenticación y redirigir directamente a la vista de productos
    const user = {
        id: 1,
        firstName: 'Admin',
        lastName: 'User',
        email: req.body.email || 'admin@example.com',  // Usar el email ingresado o un valor por defecto
        role: 'admin'
    };

    req.login(user, (err) => {
        if (err) {
            return next(err);
        }
        return res.redirect('/admin/products');  // Redirigir a la vista de productos del administrador
    });
});

// Ruta de cierre de sesión
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
