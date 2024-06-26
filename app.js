const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const shoppingCartRouter = require('./routes/shopping-cart');
const adminRouter = require('./routes/admin');
const sequelize = require('./database/database');
const methodOverride = require('method-override');
require('./config/passport');
//const Product = require('./models/Product');

const app = express();

// Llama al método sync() para sincronizar el modelo con la base de datos
sequelize.sync()
    .then(() => {
    console.log('All models were synchronized successfully.');
    // Aquí empieza tu servidor o cualquier otra lógica de la aplicación
    })
    .catch(err => {
    console.error('An error occurred while synchronizing the models:', err);
    });

// Configurar el motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para sobrescribir métodos
app.use(methodOverride('_method'));

// Middleware para manejar sesiones
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Inicializar Passport y las sesiones de Passport
app.use(passport.initialize());
app.use(passport.session());

// Usar las rutas definidas
app.use('/', indexRouter);
app.use('/shopping-cart', shoppingCartRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);



// Configurar el puerto y arrancar el servidor
async function startServer() {
    try {
        // Verifica la conexión a la base de datos
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        // Configura el puerto del servidor
        const port = process.env.PORT || 3000;

        // Inicia el servidor
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        // Captura cualquier error de conexión a la base de datos
        console.error('Unable to connect to the database:', error);
    }
}

// Llama a la función para iniciar el servidor
startServer();

module.exports = app;
