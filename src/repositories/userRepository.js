const { pool } = require('../config/db');

const UserRepository = {

  // Buscar un usuario por email
  async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    return rows[0] || null;
  },

  // Crear un usuario nuevo
  async create({ name, email, passwordHash, verificationToken, verificationTokenExpires }) {
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password_hash, is_verified, verification_token, verification_token_expires)
       VALUES (?, ?, ?, 0, ?, ?)`,
      [name, email, passwordHash, verificationToken, verificationTokenExpires]
    );

    return {
      id: result.insertId,
      name,
      email,
      is_verified: 0
    };
  },

  // Buscar usuario por token de verificación
  async findByVerificationToken(token) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE verification_token = ? LIMIT 1',
      [token]
    );
    return rows[0] || null;
  },

  // Marcar usuario como verificado
  async markAsVerified(userId) {
    await pool.query(
      `UPDATE users
       SET is_verified = 1,
           verification_token = NULL,
           verification_token_expires = NULL
       WHERE id = ?`,
      [userId]
    );
  }
};

module.exports = UserRepository;
