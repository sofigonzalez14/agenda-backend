const TaskRepository = require('../repositories/taskRepository');
const CategoryRepository = require('../repositories/categoryRepository');

const VALID_STATUS = ['pendiente', 'en_progreso', 'completada'];
const VALID_PRIORITY = ['baja', 'media', 'alta'];

const TaskService = {
  // Lista todas las tareas del usuario
  async getAllForUser(userId) {
    return TaskRepository.findAllByUser(userId);
  },

  // Busca una tarea puntual del usuario
  async getByIdForUser(id, userId) {
    const task = await TaskRepository.findById(id, userId);

    if (!task) {
      throw new Error('Tarea no encontrada');
    }

    return task;
  },

  // Crear nueva tarea
  async createForUser({ title, description, dueDate, status, priority, categoryId, userId }) {
    // Validaciones básicas
    if (!title || !title.trim()) {
      throw new Error('El título de la tarea es obligatorio');
    }

    let finalStatus = status || 'pendiente';
    let finalPriority = priority || 'media';

    if (!VALID_STATUS.includes(finalStatus)) {
      throw new Error(`Estado inválido. Valores permitidos: ${VALID_STATUS.join(', ')}`);
    }

    if (!VALID_PRIORITY.includes(finalPriority)) {
      throw new Error(`Prioridad inválida. Valores permitidos: ${VALID_PRIORITY.join(', ')}`);
    }

    let finalCategoryId = null;

    if (categoryId) {
      // Verificamos que la categoría exista y sea del usuario
      const category = await CategoryRepository.findById(categoryId, userId);
      if (!category) {
        throw new Error('La categoría seleccionada no existe o no pertenece al usuario');
      }
      finalCategoryId = categoryId;
    }

    const newTask = await TaskRepository.create({
      title: title.trim(),
      description: description || null,
      dueDate: dueDate || null,        // puede ser null si no hay fecha límite
      status: finalStatus,
      priority: finalPriority,
      categoryId: finalCategoryId,
      userId
    });

    return newTask;
  },

  // Actualizar tarea (permitimos actualización parcial)
  async updateForUser(id, userId, { title, description, dueDate, status, priority, categoryId }) {
    const existing = await TaskRepository.findById(id, userId);
    if (!existing) {
      throw new Error('Tarea no encontrada');
    }

    // Tomamos lo nuevo o dejamos lo anterior
    const finalTitle = title !== undefined ? title : existing.title;
    const finalDescription = description !== undefined ? description : existing.description;
    const finalDueDate = dueDate !== undefined ? dueDate : existing.due_date;
    let finalStatus = status !== undefined ? status : existing.status;
    let finalPriority = priority !== undefined ? priority : existing.priority;

    if (!finalTitle || !finalTitle.trim()) {
      throw new Error('El título de la tarea es obligatorio');
    }

    if (!VALID_STATUS.includes(finalStatus)) {
      throw new Error(`Estado inválido. Valores permitidos: ${VALID_STATUS.join(', ')}`);
    }

    if (!VALID_PRIORITY.includes(finalPriority)) {
      throw new Error(`Prioridad inválida. Valores permitidos: ${VALID_PRIORITY.join(', ')}`);
    }

    let finalCategoryId =
      categoryId !== undefined ? categoryId : existing.category_id;

    if (finalCategoryId) {
      const category = await CategoryRepository.findById(finalCategoryId, userId);
      if (!category) {
        throw new Error('La categoría seleccionada no existe o no pertenece al usuario');
      }
    } else {
      finalCategoryId = null;
    }

    await TaskRepository.update(id, userId, {
      title: finalTitle.trim(),
      description: finalDescription,
      dueDate: finalDueDate,
      status: finalStatus,
      priority: finalPriority,
      categoryId: finalCategoryId
    });

    return {
      id,
      title: finalTitle.trim(),
      description: finalDescription,
      due_date: finalDueDate,
      status: finalStatus,
      priority: finalPriority,
      category_id: finalCategoryId
    };
  },

  // Borrar tarea
  async deleteForUser(id, userId) {
    const existing = await TaskRepository.findById(id, userId);
    if (!existing) {
      throw new Error('Tarea no encontrada');
    }

    await TaskRepository.remove(id, userId);
  }
};

module.exports = TaskService;
