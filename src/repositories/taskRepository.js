const { pool } = require('../config/db');

const TaskRepository = {
  // Lista todas las tareas del usuario 
  async findAllByUser(userId) {
    const [rows] = await pool.query(
      `SELECT 
         id,
         title,
         description,
         due_date,
         status,
         priority,
         category_id,
         user_id,
         created_at,
         updated_at
       FROM tasks
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );
    return rows;
  },

  // Busca una tarea puntual por id + usuario 
  async findById(id, userId) {
    const [rows] = await pool.query(
      `SELECT 
         id,
         title,
         description,
         due_date,
         status,
         priority,
         category_id,
         user_id,
         created_at,
         updated_at
       FROM tasks
       WHERE id = ? AND user_id = ?`,
      [id, userId]
    );
    return rows[0] || null;
  },

  // Crea una nueva tarea
  async create({ title, description, dueDate, status, priority, categoryId, userId }) {
    const [result] = await pool.query(
      `INSERT INTO tasks
         (title, description, due_date, status, priority, category_id, user_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, dueDate, status, priority, categoryId, userId]
    );

    return {
      id: result.insertId,
      title,
      description,
      due_date: dueDate,
      status,
      priority,
      category_id: categoryId,
      user_id: userId
    };
  },

  // Actualiza una tarea
  async update(id, userId, { title, description, dueDate, status, priority, categoryId }) {
    await pool.query(
      `UPDATE tasks
       SET title = ?,
           description = ?,
           due_date = ?,
           status = ?,
           priority = ?,
           category_id = ?
       WHERE id = ? AND user_id = ?`,
      [title, description, dueDate, status, priority, categoryId, id, userId]
    );
  },

  // Borra una tarea
  async remove(id, userId) {
    await pool.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );
  }
};

module.exports = TaskRepository;
