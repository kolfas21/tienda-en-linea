module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Category',
                key: 'id'
            }
        }
    });
};
