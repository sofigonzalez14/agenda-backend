// Middleware de manejo centralizado de errores
function errorHandler(err, req, res, next) {
  console.error('Error capturado por errorHandler:', err);

  const status = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({ message });
}

module.exports = errorHandler;
