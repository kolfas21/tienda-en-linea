const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('shopping-cart', {
        cartItems: [
            // Aquí agregarías los productos en el carrito, de manera estática o dinámica
        ]
    });
});

router.post('/checkout', (req, res) => {
    const { documento, nombre, apellidos, direccion, telefono } = req.body;
    // Procesar la orden aquí
    res.send('Orden procesada');
});

module.exports = router;
