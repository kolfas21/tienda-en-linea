module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Order', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productIds: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending'
        }
    });
};
