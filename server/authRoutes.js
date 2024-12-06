const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  // Lógica de inicio de sesión.
  res.send({ message: 'Login exitoso' });
});

router.post('/register', (req, res) => {
  // Lógica de registro.
  res.send({ message: 'Registro exitoso' });
});

module.exports = router;
