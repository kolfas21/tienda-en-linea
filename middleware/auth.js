module.exports = {
  ensureAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
          return next();
      }
      res.redirect('/login'); // Redirige a la página de inicio de sesión si no está autenticado
  }
};

module.exports = {
  ensureAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
          return next();
      }
      req.flash('error_msg', 'Por favor inicie sesión para ver esta página');
      res.redirect('/');
  }
};
