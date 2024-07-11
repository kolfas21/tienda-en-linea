// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Serializar usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializar usuario
passport.deserializeUser((id, done) => {
    // Aquí normalmente buscarías al usuario en la base de datos por su ID
    // Para simplificar, omitimos esta parte
    const user = { id: 1, firstName: 'Admin', lastName: 'User', email: 'admin@example.com', role: 'admin' };
    done(null, user);
});

module.exports = passport;
