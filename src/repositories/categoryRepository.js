const { pool } = require('../config/db');

const CategoryRepository = {
  // Trae todas las categorías del usuario logueado
  async findAllByUser(userId) {
    const [rows] = await pool.query(
      'SELECT id, name FROM categories WHERE user_id = ? ORDER BY name',
      [userId]
    );
    return rows;
  },

  // Trae una categoría puntual por id y usuario
  async findById(id, userId) {
    const [rows] = await pool.query(
      'SELECT id, name FROM categories WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return rows[0] || null;
  },

  // Crea una categoría nueva
  async create({ name, userId }) {
    const [result] = await pool.query(
      'INSERT INTO categories (name, user_id) VALUES (?, ?)',
      [name, userId]
    );

    return {
      id: result.insertId,
      name,
      user_id: userId
    };
  },

  // Actualiza una categoría (solo del usuario dueño)
  async update(id, userId, { name }) {
    await pool.query(
      'UPDATE categories SET name = ? WHERE id = ? AND user_id = ?',
      [name, id, userId]
    );
  },

  // Borra una categoría
  async remove(id, userId) {
    await pool.query(
      'DELETE FROM categories WHERE id = ? AND user_id = ?',
      [id, userId]
    );
  }
};

module.exports = CategoryRepository;
