const { verifyToken } = require('../utils/jwt');

// Middleware para proteger rutas con JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'] || '';

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Token no provisto o formato inválido' });
  }

  try {
    const payload = verifyToken(token);
    req.user = {
      id: payload.userId,
      email: payload.email
    };
    next();
  } catch (error) {
    console.error('Error en authMiddleware:', error.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

module.exports = authMiddleware;

