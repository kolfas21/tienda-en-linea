// controllers/adminController.js
const { Product, Category } = require('../models');

exports.showProducts = async (req, res) => {
    try {
        const consolas = await Product.findAll({ where: { categoryId: 1 } });
        const videojuegos = await Product.findAll({ where: { categoryId: 2 } });
        const categories = await Category.findAll();

        res.render('admin/products', {
            title: 'Administrar Productos',
            consolas,
            videojuegos,
            categories
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error al obtener los productos.');
    }
};

exports.addProduct = async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body); // Agregar logs para verificar los datos recibidos
        const { name, price, categoryId } = req.body;
        const imageUrl = req.file ? `/img/${req.file.filename}` : null;

        const product = await Product.create({
            name,
            price,
            imageUrl,
            categoryId
        });

        console.log('Producto creado:', product); // Verificar si el producto se crea correctamente
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.destroy({ where: { id } });

        console.log('Producto eliminado:', id);
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ message: error.message });
    }
};