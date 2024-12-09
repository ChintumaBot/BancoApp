app.post('/transactions', (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  // Iniciar una transacción de base de datos
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bancoapp',
  });

  connection.beginTransaction((err) => {
    if (err) {
      console.error('Error al iniciar la transacción:', err);
      return res.status(500).json({ message: 'Error al iniciar la transacción' });
    }

    // 1. Insertar la transacción en la tabla de transactions
    const query = 'INSERT INTO transactions (sender_id, receiver_id, amount) VALUES (?, ?, ?)';
    connection.query(query, [senderId, receiverId, amount], (err, result) => {
      if (err) {
        return connection.rollback(() => {
          console.error('Error al registrar la transacción:', err);
          res.status(500).json({ message: 'Error al registrar la transacción' });
        });
      }

      // 2. Actualizar el saldo del remitente
      const updateSenderQuery = 'UPDATE users SET saldo = saldo - ? WHERE id = ?';
      connection.query(updateSenderQuery, [amount, senderId], (err, result) => {
        if (err) {
          return connection.rollback(() => {
            console.error('Error al actualizar el saldo del remitente:', err);
            res.status(500).json({ message: 'Error al actualizar el saldo del remitente' });
          });
        }

        // 3. Actualizar el saldo del receptor
        const updateReceiverQuery = 'UPDATE users SET saldo = saldo + ? WHERE id = ?';
        connection.query(updateReceiverQuery, [amount, receiverId], (err, result) => {
          if (err) {
            return connection.rollback(() => {
              console.error('Error al actualizar el saldo del receptor:', err);
              res.status(500).json({ message: 'Error al actualizar el saldo del receptor' });
            });
          }

          // Si todo está bien, confirmamos la transacción
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                console.error('Error al confirmar la transacción:', err);
                res.status(500).json({ message: 'Error al confirmar la transacción' });
              });
            }

            res.status(200).json({ message: 'Transacción registrada y saldos actualizados' });
            connection.end();
          });
        });
      });
    });
  });
});
