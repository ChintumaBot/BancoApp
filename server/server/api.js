const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());


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


app.post('/register', (req, res) => {
  const { nombre, apellido, email, contraseña } = req.body;

  const query = 'INSERT INTO usuarios (nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, apellido, email, contraseña], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error al registrar el usuario' });
    }
    res.status(200).json({ message: 'Usuario registrado correctamente' });
  });
});


app.post('/login', (req, res) => {
  const { email, contraseña } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ? AND contraseña = ?';
  db.query(query, [email, contraseña], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error al intentar iniciar sesión' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'No se encuentra una cuenta con ese correo y contraseña' });
    }
    res.status(200).json({ message: 'Inicio de sesión exitoso', user: result[0] });
  });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});