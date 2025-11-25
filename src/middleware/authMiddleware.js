const { verifyToken } = require('../utils/jwt');

// Middleware para proteger rutas con JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'] || '';

  // Esperamos algo como: "Bearer asdasdasd..."
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Token no provisto o formato inválido' });
  }

  try {
    // Verificamos el token y sacamos el payload (userId, email, etc.)
    const payload = verifyToken(token);

    // Guardamos info del usuario en req.user para usarla en las rutas
    req.user = {
      id: payload.userId,
      email: payload.email
    };

    // Si todo ok, seguimos a la siguiente función (controller)
    next();
  } catch (error) {
    console.error('Error en authMiddleware:', error.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

// 👇 ESTO ES LO IMPORTANTE
module.exports = authMiddleware;

