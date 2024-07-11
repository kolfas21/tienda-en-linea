// scripts/createAdmin.js
const sequelize = require('../config/database');
const User = require('../models/user'); // Asegúrate de que esté en minúsculas
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
    try {
        await sequelize.sync({ force: false }); // Sincroniza la base de datos

        const email = 'dan21428@gmail.com';
        const password = 'admin';
        const hashedPassword = await bcrypt.hash(password, 10);

        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                firstName: 'Admin',
                lastName: 'User',
                password: hashedPassword,
                role: 'admin',
            },
        });

        if (created) {
            console.log('Usuario administrador creado con éxito.');
        } else {
            console.log('El usuario administrador ya existe.');
        }
    } catch (error) {
        console.error('Error al crear el usuario administrador:', error);
    } finally {
        sequelize.close();
    }
};

createAdmin();
