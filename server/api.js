const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

// Configuración de middleware
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Appbanco',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL!');
});

// Ruta para registrar usuario
app.post('/register', (req, res) => {
  const { nombre, apellido, email, contraseña } = req.body;

  // Validar que todos los campos estén presentes
  if (!nombre || !apellido || !email || !contraseña) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Verificar si el correo ya está registrado
  const queryCheckEmail = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(queryCheckEmail, [email], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error al consultar el correo' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Error al encriptar la contraseña' });
      }

      // Insertar el usuario en la base de datos
      const queryInsert = 'INSERT INTO usuarios (nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?)';
      db.query(queryInsert, [nombre, apellido, email, hashedPassword], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Error al registrar el usuario' });
        }
        res.status(200).json({ message: 'Usuario registrado correctamente' });
      });
    });
  });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { correo, contraseña } = req.body;

  // Verificar que los campos estén completos
  if (!correo || !contraseña) {
    return res.status(400).json({ message: 'Por favor ingrese el correo y la contraseña' });
  }

  // Consultar el usuario en la base de datos
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [correo], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error al intentar iniciar sesión' });
    }

    // Verificar si se encuentra el usuario
    if (result.length === 0) {
      return res.status(404).json({ message: 'No se encuentra una cuenta con ese correo' });
    }

    // Verificar la contraseña
    bcrypt.compare(contraseña, result[0].contraseña, (err, isMatch) => {
      console.log('Contraseña ingresada:', contraseña);
      console.log('Hash almacenado:', result[0].contraseña);
      console.log('Resultado comparación:', isMatch);
    
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error al verificar la contraseña' });
      }
    
      if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }
    
      res.status(200).json({ message: 'Inicio de sesión exitoso', user: result[0] });
    });
    
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:3000");
}); 