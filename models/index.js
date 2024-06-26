const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres', // Especifica el dialecto de la base de datos (en este caso, PostgreSQL)
    host: 'localhost', // Especifica la dirección del host de tu base de datos
    username: 'postgres', // Especifica el nombre de usuario de tu base de datos
    password: '950430', // Especifica la contraseña de tu base de datos
    database: 'Videojuegosdb' // Especifica el nombre de tu base de datos
});


const User = require('./user')(sequelize, DataTypes);
const Category = require('./Category')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database & tables created!');
    });

module.exports = {
    sequelize,
    User,
    Category,
    Product
};
