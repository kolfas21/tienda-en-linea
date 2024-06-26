// middleware/auth.js
module.exports = (req, res, next) => {
    // Lógica de autenticación
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).send('Unauthorized');
    }
  };
  