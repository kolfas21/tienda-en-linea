const { Product, Category } = require('../models');

getAllProducts = async (req, res) => {
    try {
        const consola = await Product.findAll({
            where: { categoryId: 1 },
            include: Category,
        });

        const videojuego = await Product.findAll({
            where: { categoryId: 2 },
            include: Category,
        });

        res.render('index', { title: 'Productos', consola, videojuego });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: error.message });
    }
};

createProduct = async (req, res) => {
    try {
        const { name, price, categoryId } = req.body; // Asegúrate de que categoryId se está recibiendo
        const imageUrl = req.file ? req.file.path : null;

        const product = await Product.create({
            name,
            price,
            imageUrl,
            categoryId, // Asegúrate de que categoryId se está pasando aquí
            createdAt: new Date(), // Agregar manualmente createdAt si es necesario
            updatedAt: new Date()  // Agregar manualmente updatedAt si es necesario
        });

        console.log('Producto creado:', product);
        res.status(201).json(product);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ message: error.message });
    }
};

updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, categoryId } = req.body;
        const imageUrl = req.file ? `/img/${req.file.filename}` : null;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        product.name = name;
        product.price = price;
        product.categoryId = categoryId;
        if (imageUrl) {
            product.imageUrl = imageUrl;
        }
        
        await product.save();

        res.redirect('/admin/products');
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ message: error.message });
    }
};

deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.destroy();
        console.log('Producto eliminado:', product); // Mensaje de depuración
        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Error al eliminar producto:', error); // Mensaje de depuración
        res.status(500).json({ message: error.message });
    }
};

module.exports ={
    deleteProduct,
    updateProduct,
    createProduct,
    getAllProducts};