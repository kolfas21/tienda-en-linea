const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error_msg', 'Credenciales incorrectas');
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/admin/products');
        });
    })(req, res, next);
};

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            req.flash('error_msg', 'Las contraseñas no coinciden');
            return res.redirect('/');
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            req.flash('error_msg', 'El correo electrónico ya está registrado');
            return res.redirect('/');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ firstName, lastName, email, password: hashedPassword });
        req.flash('success_msg', 'Usuario creado con éxito');
        res.redirect('/');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        req.flash('error_msg', 'Error al registrar usuario');
        res.status(500).redirect('/');
    }
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'Has cerrado sesión correctamente');
        res.redirect('/');
    });
};

exports.profile = (req, res) => {
    res.render('profile', { user: req.user });
};
