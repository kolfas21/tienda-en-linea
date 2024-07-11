const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

Category.associate = function(models) {
    Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        as: 'products'
    });
};

module.exports = Category;
