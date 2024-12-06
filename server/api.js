const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const transactionRoutes = require('./transactionRoutes');

const app = express(); // Inicializa `app` antes de usarlo.

app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes); // Ruta para autenticación
app.use('/api/transactions', transactionRoutes); // Ruta para transacciones

// Configuración del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
