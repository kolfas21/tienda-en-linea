// models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true // Puede ser null si no todos los productos tienen imagen
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        },
        allowNull: false // Asegúrate de que no permita nulos si es requerido
    }
}, {
    tableName: 'Products',
    timestamps: true // Asegúrate de que timestamps esté habilitado si lo necesitas
});

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

module.exports = Product;
