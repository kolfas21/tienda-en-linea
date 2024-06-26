// database.js

const { Sequelize } = require('sequelize');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(
    'Videojuegosdb',     // Nombre de la base de datos
    'postgres',                  // Nombre de usuario de la base de datos
    '950430',               // Contraseña de la base de datos
    {
        host: 'localhost',      // Host de la base de datos
        dialect: 'postgres',    // Dialecto de la base de datos (puede ser 'mysql', 'sqlite', 'mssql', etc.)
        // Otros parámetros de configuración si es necesario
    }
);

// Exportar sequelize
module.exports = sequelize;
