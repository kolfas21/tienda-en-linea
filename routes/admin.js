// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/products', adminController.showProducts);
router.post('/products', upload.single('image'), adminController.addProduct);
router.put('/products/edit/:id', upload.single('image'), productController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

module.exports = router;
