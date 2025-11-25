const express = require('express');
const CategoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Todas las rutas de categorías están protegidas con JWT
router.use(authMiddleware);

// GET /api/categories
router.get('/', CategoryController.getAll);

// GET /api/categories/:id
router.get('/:id', CategoryController.getById);

// POST /api/categories
router.post('/', CategoryController.create);

// PUT /api/categories/:id
router.put('/:id', CategoryController.update);

// DELETE /api/categories/:id
router.delete('/:id', CategoryController.remove);

module.exports = router;
