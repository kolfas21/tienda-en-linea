const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');

// Ruta para renderizar la vista de categorías
router.get('/categories', authMiddleware, categoryController.getAllCategories);
// Rutas para categorías
// Ruta para renderizar la vista de categorías
router.get('/categories', authMiddleware, async (req, res) => {
    const categories = await categoryController.getAllCategories();
    res.render('admin/categories', { categories });
});

router.post('/categories', authMiddleware, categoryController.createCategory);
router.put('/categories/:id', authMiddleware, categoryController.updateCategory);
router.delete('/categories/:id', authMiddleware, categoryController.deleteCategory);

// Rutas para productos
router.get('/products', authMiddleware, productController.getAllProducts);
router.post('/products', authMiddleware, productController.createProduct);
router.put('/products/:id', authMiddleware, productController.updateProduct);
router.delete('/products/:id', authMiddleware, productController.deleteProduct);

// Rutas para pedidos
router.get('/orders', authMiddleware, orderController.getAllOrders);

// Rutas para usuarios
router.get('/users', authMiddleware, userController.getAllUsers);
router.post('/users', authMiddleware, userController.createUser);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;
