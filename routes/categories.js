const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticate = require('../middlewares/auth');

router.get('/', authenticate, categoryController.getAllCategories);
router.post('/', authenticate, categoryController.createCategory);
router.put('/:id', authenticate, categoryController.updateCategory);
router.delete('/:id', authenticate, categoryController.deleteCategory);

module.exports = router;
