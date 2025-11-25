const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {pool} = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/categoryRoutes');
const taskRoutes = require('./routes/task.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

// Habilitar CORS
app.use(cors());
// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de categorias
app.use('/api/categories', categoryRoutes);
// Rutas de tareas
app.use('/api/tasks', taskRoutes);

// Middleware de manejo centralizado de errores (si algo hace next(err))
app.use(errorHandler);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando' });
});

// Ruta para probar la conexión con la base de datos
app.get('/api/db-check', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS result');
    res.json({ status: 'ok', db: rows[0] });
  } catch (error) {
    console.error('Error al conectar con la BD:', error);
    res.status(500).json({ status: 'error', message: 'Error al conectar con la base de datos' });
  }
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
