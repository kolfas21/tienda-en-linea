module.exports = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next();
    }
    req.flash('error_msg', 'No autorizado');
    res.redirect('/');
};
