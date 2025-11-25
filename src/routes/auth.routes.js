const express = require('express');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const { validateRegister, validateLogin } = require('../middleware/validateAuth');

router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes funcionando' });
});

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.get('/verify', AuthController.verify);
router.get('/me', authMiddleware, AuthController.me);

module.exports = router;
