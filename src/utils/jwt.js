const jwt = require('jsonwebtoken');

function generateToken(payload) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

  return jwt.sign(payload, secret, { expiresIn });
}

function verifyToken(token) {
  const secret = process.env.JWT_SECRET;

  // Si el token es inválido o expiró, esto tira error
  return jwt.verify(token, secret);
}

module.exports = {
  generateToken,
  verifyToken
};
