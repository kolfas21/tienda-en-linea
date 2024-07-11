// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Product = require('./Product');
const Category = require('./category');

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

module.exports = {
    Product,
    Category,
    sequelize,
};
