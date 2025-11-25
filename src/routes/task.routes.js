const express = require('express');
const TaskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Todas las rutas de tareas están protegidas con JWT
router.use(authMiddleware);

// GET /api/tasks
router.get('/', TaskController.getAll);

// GET /api/tasks/:id
router.get('/:id', TaskController.getById);

// POST /api/tasks
router.post('/', TaskController.create);

// PUT /api/tasks/:id
router.put('/:id', TaskController.update);

// DELETE /api/tasks/:id
router.delete('/:id', TaskController.remove);

module.exports = router;
