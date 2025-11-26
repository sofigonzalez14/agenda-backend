const AuthService = require('../services/authService');

// Acá manejamos req/res y llamamos al servicio
const AuthController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const { user, verificationToken } = await AuthService.register({
        name,
        email,
        password
      });

      return res.status(201).json({
        message: 'Usuario registrado correctamente.',
        user,
        verificationToken
      });
    } catch (error) {
      console.error('Error en register:', error.message);
      return res.status(400).json({ message: error.message });
    }
  },

  async verify(req, res) {
    try {
      const { token } = req.query;

      const user = await AuthService.verifyAccount(token);

      return res.json({
        message: 'Cuenta verificada correctamente',
        user
      });
    } catch (error) {
      console.error('Error en verify:', error.message);
      return res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login({ email, password });

      return res.json({
        message: 'Login correcto',
        token: result.token,
        user: result.user
      });
    } catch (error) {
      console.error('Error en login:', error.message);
      return res.status(400).json({ message: error.message });
    }
  },
  async me(req, res) {

    if (!req.user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    return res.json({
      message: 'Usuario autenticado',
      user: req.user
    });
  }
};

module.exports = AuthController;
