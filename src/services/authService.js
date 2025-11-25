const bcrypt = require('bcrypt');
const crypto = require('crypto');
const UserRepository = require('../repositories/userRepository');
const { sendVerificationEmail } = require('../utils/mailer');
const { generateToken } = require('../utils/jwt');

const AuthService = {
  
  async register({ name, email, password }) {
   
    if (!name || !email || !password) {
      throw new Error('Nombre, email y contraseña son obligatorios');
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Ya existe un usuario registrado con ese email');
    }

    const passwordHash = await bcrypt.hash(password, 10); 

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const newUser = await UserRepository.create({
      name,
      email,
      passwordHash,
      verificationToken,
      verificationTokenExpires
    });

    await sendVerificationEmail(email, verificationToken);

    return {
      user: newUser,
      verificationToken
    };
  },

  async verifyAccount(token) {
    if (!token) {
      throw new Error('Token de verificación requerido');
    }

    const user = await UserRepository.findByVerificationToken(token);

    if (!user) {
      throw new Error('Token de verificación inválido o ya utilizado');
    }

    if (user.verification_token_expires) {
      const now = new Date();
      const expires = new Date(user.verification_token_expires);

      if (expires < now) {
        throw new Error('El enlace de verificación ha expirado');
      }
    }

    await UserRepository.markAsVerified(user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      is_verified: 1
    };
  },


  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Email y contraseña son obligatorios');
    }

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    if (!user.is_verified) {
      throw new Error('La cuenta no está verificada. Por favor revisá tu correo.');
    }
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      throw new Error('Credenciales inválidas');
    }
    const token = generateToken({
      userId: user.id,
      email: user.email
    });
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

