const CategoryRepository = require('../repositories/categoryRepository');

const CategoryService = {
  // Listar todas las categorías del usuario
  async getAllForUser(userId) {
    return CategoryRepository.findAllByUser(userId);
  },

  // Obtener una categoría puntual por id (del usuario)
  async getByIdForUser(id, userId) {
    const category = await CategoryRepository.findById(id, userId);

    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    return category;
  },

  // Crear nueva categoría para el usuario
  async createForUser({ name, userId }) {
    if (!name || !name.trim()) {
      throw new Error('El nombre de la categoría es obligatorio');
    }

    const cleanName = name.trim();

    const newCategory = await CategoryRepository.create({
      name: cleanName,
      userId
    });

    return newCategory;
  },

  // Actualizar categoría
  async updateForUser(id, userId, { name }) {
    if (!name || !name.trim()) {
      throw new Error('El nombre de la categoría es obligatorio');
    }

    const existing = await CategoryRepository.findById(id, userId);
    if (!existing) {
      throw new Error('Categoría no encontrada');
    }

    const cleanName = name.trim();

    await CategoryRepository.update(id, userId, { name: cleanName });

    return {
      id,
      name: cleanName
    };
  },

  // Borrar categoría
  async deleteForUser(id, userId) {
    const existing = await CategoryRepository.findById(id, userId);
    if (!existing) {
      throw new Error('Categoría no encontrada');
    }

    await CategoryRepository.remove(id, userId);
  }
};

module.exports = CategoryService;
