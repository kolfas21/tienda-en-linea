require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
//const passport = require('./config/passport'); // Asegúrate de que la ruta es correcta
const sequelize = require('./config/database');
const path = require('path');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth'); // Importa las rutas de autenticación

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de Express y configuración de vistas
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized:false,
    cookie: { secure: false }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Configurar method-override
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware para pasar variables locales a las vistas
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.user = req.user || null;
    next();
});

// Rutas
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Something broke!');
});

// Sincronización y Poblamiento de la Base de Datos
const { Category } = require('./models');

sequelize.sync({ force: false }).then(async () => {
    const categoriesCount = await Category.count();
    if (categoriesCount === 0) {
        await Category.bulkCreate([
            { name: 'Consola' },
            { name: 'Videojuego' },
        ]);
    }
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
}).catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});
