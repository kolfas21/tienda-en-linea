const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Order extends Model {}

Order.init({
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // Nombre de la tabla en la base de datos
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Products', // Nombre de la tabla en la base de datos
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Order',
});

module.exports = Order;
