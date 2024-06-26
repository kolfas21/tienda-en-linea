const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Ejemplo de usuarios en memoria (esto debería ser una base de datos en un caso real)
const users = [{ id: 1, username: 'admin', password: 'password' }];

passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
    }
    if (user.password !== password) {
        return done(null, false, { message: 'Contraseña incorrecta' });
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});
