const Category = require('../models/category'); // Asegúrate de tener el modelo correcto

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render('admin/index', { categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        await Category.create({ name });
        res.redirect('/admin/categories');
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await Category.update({ name }, { where: { id } });
        res.redirect('/admin/categories');
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.destroy({ where: { id } });
        res.redirect('/admin/categories');
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).send('Internal Server Error');
    }
};
