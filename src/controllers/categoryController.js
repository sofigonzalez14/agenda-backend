const CategoryService = require('../services/categoryService');

const CategoryController = {
  // GET /api/categories
  async getAll(req, res) {
    try {
      const userId = req.user.id; // viene del authMiddleware

      const categories = await CategoryService.getAllForUser(userId);

      return res.json(categories);
    } catch (error) {
      console.error('Error en getAll categories:', error.message);
      return res.status(500).json({ message: 'Error al obtener categorías' });
    }
  },

  // GET /api/categories/:id
  async getById(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const category = await CategoryService.getByIdForUser(id, userId);

      return res.json(category);
    } catch (error) {
      console.error('Error en getById category:', error.message);
      return res.status(404).json({ message: error.message });
    }
  },

  // POST /api/categories
  async create(req, res) {
    try {
      const userId = req.user.id;
      const { name } = req.body;

      const newCategory = await CategoryService.createForUser({
        name,
        userId
      });

      return res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error en create category:', error.message);
      return res.status(400).json({ message: error.message });
    }
  },

  // PUT /api/categories/:id
  async update(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { name } = req.body;

      const updated = await CategoryService.updateForUser(id, userId, { name });

      return res.json(updated);
    } catch (error) {
      console.error('Error en update category:', error.message);
      // puede ser validación o "no encontrada"
      return res.status(400).json({ message: error.message });
    }
  },

  // DELETE /api/categories/:id
  async remove(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      await CategoryService.deleteForUser(id, userId);

      return res.status(204).send(); // 204 = sin contenido
    } catch (error) {
      console.error('Error en delete category:', error.message);
      return res.status(400).json({ message: error.message });
    }
  }
};

module.exports = CategoryController;
