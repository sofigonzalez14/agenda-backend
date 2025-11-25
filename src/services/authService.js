const bcrypt = require('bcrypt');
const crypto = require('crypto');
const UserRepository = require('../repositories/userRepository');
const { sendVerificationEmail } = require('../utils/mailer');
const { generateToken } = require('../utils/jwt');

const AuthService = {
  // Datos que va a recibir: { name, email, password }
  async register({ name, email, password }) {
    // 1) Validaciones básicas
    if (!name || !email || !password) {
      throw new Error('Nombre, email y contraseña son obligatorios');
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // 2) Ver si ya existe un usuario con ese email
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Ya existe un usuario registrado con ese email');
    }

    // 3) Hashear la contraseña
    const passwordHash = await bcrypt.hash(password, 10); // 10 = "salt rounds"

    // 4) Generar token de verificación (+24hs)
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // 5) Crear el usuario en la base de datos
    const newUser = await UserRepository.create({
      name,
      email,
      passwordHash,
      verificationToken,
      verificationTokenExpires
    });

    // 6) Enviar el email de verificación (aunque el SMTP no funcione, va a loguear el link)
    await sendVerificationEmail(email, verificationToken);

    // 7) Devolver info útil
    return {
      user: newUser,
      verificationToken
    };
  },

  async verifyAccount(token) {
    if (!token) {
      throw new Error('Token de verificación requerido');
    }

    // 1) Buscar usuario por token
    const user = await UserRepository.findByVerificationToken(token);

    if (!user) {
      throw new Error('Token de verificación inválido o ya utilizado');
    }

    // 2) Verificar expiración del token (si está seteado)
    if (user.verification_token_expires) {
      const now = new Date();
      const expires = new Date(user.verification_token_expires);

      if (expires < now) {
        throw new Error('El enlace de verificación ha expirado');
      }
    }

    // 3) Marcar usuario como verificado
    await UserRepository.markAsVerified(user.id);

    // 4) Devolver info básica
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      is_verified: 1
    };
  },

  // 👇 NUEVO: login
  async login({ email, password }) {
    // 1) Validar que lleguen email y password
    if (!email || !password) {
      throw new Error('Email y contraseña son obligatorios');
    }

    // 2) Buscar usuario por email
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // 3) Verificar que la cuenta esté verificada
    if (!user.is_verified) {
      throw new Error('La cuenta no está verificada. Por favor revisá tu correo.');
    }

    // 4) Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      throw new Error('Credenciales inválidas');
    }

    // 5) Generar el token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email
    });

    // 6) Devolver token + info básica de usuario
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }
};

module.exports = AuthService;

