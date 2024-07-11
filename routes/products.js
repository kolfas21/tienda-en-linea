const express = require('express');
const router = express.Router();
const {deleteProduct, updateProduct,createProduct, getAllProducts} = require('../controllers/productController');
const authenticate = require('../middlewares/auth');

router.get('/', authenticate, getAllProducts);
router.post('/', authenticate, productController.createProduct);
router.put('/:id', authenticate, productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router;
