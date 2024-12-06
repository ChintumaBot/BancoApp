const express = require('express');
const router = express.Router();

// Simulando una base de datos para transacciones
const transactions = [];

// Ruta para obtener todas las transacciones
router.get('/', (req, res) => {
  res.json({
    message: 'Transacciones obtenidas con éxito',
    data: transactions,
  });
});

// Ruta para crear una nueva transacción
router.post('/', (req, res) => {
  const { sender, receiver, amount, description } = req.body;

  // Validación básica
  if (!sender || !receiver || !amount) {
    return res.status(400).json({
      message: 'Faltan campos obligatorios (sender, receiver, amount)',
    });
  }

  const newTransaction = {
    id: transactions.length + 1,
    sender,
    receiver,
    amount,
    description: description || '',
    date: new Date(),
  };

  transactions.push(newTransaction);

  res.status(201).json({
    message: 'Transacción creada con éxito',
    data: newTransaction,
  });
});

// Ruta para obtener una transacción específica por ID
router.get('/:id', (req, res) => {
  const { id } = req.param
  const transaction = transactions.find((t) => t.id === parseInt(id, 10));

  if (!transaction) {
    return res.status(404).json({
      message: 'Transacción no encontrada',
    });
  }

  res.json({
    message: 'Transacción encontrada',
    data: transaction,
  });
});

module.exports = router;
