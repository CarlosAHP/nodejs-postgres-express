const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./app/config/db.config.js');
const cors = require('cors');

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4200', // O usa la URL de tu frontend en Render si tienes una
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Configuración de Body-Parser para manejo de JSON
app.use(bodyParser.json());

// Autenticación de la base de datos y sincronización de tablas
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexión establecida correctamente.');
    await db.initialize(); // Inicialización de la base de datos con datos de prueba si es necesario
  } catch (err) {
    console.error('No se puede conectar a la base de datos:', err);
  }
})();

// Importación de rutas
const router = require('./app/routers/router.js');

// Uso de las rutas
app.use('/', router);

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

// Creación del servidor con puerto dinámico para Render
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
