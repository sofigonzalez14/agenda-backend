const CategoryRepository = require('../repositories/categoryRepository');

const CategoryService = {
  async getAllForUser(userId) {
    return CategoryRepository.findAllByUser(userId);
  },

  async getByIdForUser(id, userId) {
    const category = await CategoryRepository.findById(id, userId);

    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    return category;
  },

  async createForUser({ name, userId }) {
    if (!name || !name.trim()) {
      throw new Error('El nombre de la categoría es obligatorio');
    }

    const cleanName = name.trim();

    const existing = await CategoryRepository.findByNameForUser(
      cleanName,
      userId
    );

    if (existing) {
      throw new Error('Ya tenés una categoría con ese nombre');
    }

    const newCategory = await CategoryRepository.create({
      name: cleanName,
      userId
    });

    return newCategory;
  },

  async updateForUser(id, userId, { name }) {
    if (!name || !name.trim()) {
      throw new Error('El nombre de la categoría es obligatorio');
    }

    const existing = await CategoryRepository.findById(id, userId);
    if (!existing) {
      throw new Error('Categoría no encontrada');
    }

    const cleanName = name.trim();
    const existingWithSameName =
      await CategoryRepository.findByNameForUser(cleanName, userId);

    if (existingWithSameName && existingWithSameName.id !== id) {
      throw new Error('Ya tenés una categoría con ese nombre');
    }

    await CategoryRepository.update(id, userId, { name: cleanName });

    return {
      id,
      name: cleanName
    };
  },

  async deleteForUser(id, userId) {
    const existing = await CategoryRepository.findById(id, userId);
    if (!existing) {
      throw new Error('Categoría no encontrada');
    }

    await CategoryRepository.remove(id, userId);
  }
};

module.exports = CategoryService;

