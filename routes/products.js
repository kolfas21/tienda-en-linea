const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticate = require('../middlewares/auth');

router.get('/', authenticate, productController.getAllProducts);
router.post('/', authenticate, productController.createProduct);
router.put('/:id', authenticate, productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router;
