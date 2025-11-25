const TaskService = require('../services/taskService');

const TaskController = {
  // GET /api/tasks
  async getAll(req, res) {
    try {
      const userId = req.user.id; // viene del authMiddleware

      const tasks = await TaskService.getAllForUser(userId);

      return res.json(tasks);
    } catch (error) {
      console.error('Error en getAll tasks:', error.message);
      return res.status(500).json({ message: 'Error al obtener tareas' });
    }
  },

  // GET /api/tasks/:id
  async getById(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const task = await TaskService.getByIdForUser(id, userId);

      return res.json(task);
    } catch (error) {
      console.error('Error en getById task:', error.message);
      return res.status(404).json({ message: error.message });
    }
  },

  // POST /api/tasks
  async create(req, res) {
    try {
      const userId = req.user.id;
      const { title, description, due_date, status, priority, category_id } = req.body;

      const newTask = await TaskService.createForUser({
        title,
        description,
        dueDate: due_date,
        status,
        priority,
        categoryId: category_id,
        userId
      });

      return res.status(201).json(newTask);
    } catch (error) {
      console.error('Error en create task:', error.message);
      return res.status(400).json({ message: error.message });
    }
  },

  // PUT /api/tasks/:id
  async update(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { title, description, due_date, status, priority, category_id } = req.body;

      const updated = await TaskService.updateForUser(id, userId, {
        title,
        description,
        dueDate: due_date,
        status,
        priority,
        categoryId: category_id
      });

      return res.json(updated);
    } catch (error) {
      console.error('Error en update task:', error.message);
      return res.status(400).json({ message: error.message });
    }
  },

  // DELETE /api/tasks/:id
  async remove(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      await TaskService.deleteForUser(id, userId);

      return res.status(204).send();
    } catch (error) {
      console.error('Error en delete task:', error.message);
      return res.status(400).json({ message: error.message });
    }
  }
};

module.exports = TaskController;
