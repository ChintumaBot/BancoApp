const express = require('express');
const router = express.Router();
const db = require('./db'); // Asegúrate de que este archivo exporte la conexión a la base de datos

// Registrar una transacción
router.post('/', (req, res) => {
  const { senderId, receiverId, amount } = req.body;
  const query = 'INSERT INTO transactions (sender_id, receiver_id, amount) VALUES (?, ?, ?)';

  db.query(query, [senderId, receiverId, amount], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al registrar la transacción' });
    }
    res.status(200).json({ message: 'Transacción registrada exitosamente' });
  });
});

// Obtener transacciones de un usuario
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM transactions WHERE sender_id = ? OR receiver_id = ?';

  db.query(query, [userId, userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al obtener transacciones' });
    }
    res.status(200).json({ transactions: results });
  });
});

module.exports = router;
