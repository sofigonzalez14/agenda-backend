function validateRegister(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    const err = new Error('El nombre es obligatorio');
    err.statusCode = 400;
    return next(err);
  }

  if (!email || !email.trim()) {
    const err = new Error('El email es obligatorio');
    err.statusCode = 400;
    return next(err);
  }

  if (!password) {
    const err = new Error('La contraseña es obligatoria');
    err.statusCode = 400;
    return next(err);
  }

  if (password.length < 6) {
    const err = new Error('La contraseña debe tener al menos 6 caracteres');
    err.statusCode = 400;
    return next(err);
  }

  // Si todo está ok, seguimos al controller
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    const err = new Error('El email es obligatorio');
    err.statusCode = 400;
    return next(err);
  }

  if (!password) {
    const err = new Error('La contraseña es obligatoria');
    err.statusCode = 400;
    return next(err);
  }

  next();
}

module.exports = {
  validateRegister,
  validateLogin
};
