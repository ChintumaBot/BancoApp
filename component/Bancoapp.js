import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ajustes from './ajustes';

const BancoApp = () => {
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-11-01', description: 'Depósito inicial', amount: 1000, type: 'deposit' },
  ]);
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    Alert.alert('Tema actualizado', `Modo oscuro ${!isDarkMode ? 'activado' : 'desactivado'}.`);
  };

  const handleTransaction = () => {
    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      Alert.alert('Error', 'Por favor ingrese un monto válido');
      return;
    }

    if (transactionType === 'deposit') {
      setBalance(balance + transactionAmount);
      setTransactions([
        ...transactions,
        { id: transactions.length + 1, date: new Date().toLocaleDateString(), description: 'Depósito', amount: transactionAmount, type: 'deposit' },
      ]);
    } else if (transactionType === 'withdrawal') {
      if (transactionAmount > balance) {
        Alert.alert('Error', 'Saldo insuficiente');
        return;
      }
      setBalance(balance - transactionAmount);
      setTransactions([
        ...transactions,
        { id: transactions.length + 1, date: new Date().toLocaleDateString(), description: 'Retiro', amount: transactionAmount, type: 'withdrawal' },
      ]);
    }

    setAmount('');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <View style={styles.homeContainer}>
            <Text style={[styles.balanceText, isDarkMode ? styles.darkText : styles.lightText]}>Saldo actual:</Text>
            <Text style={[styles.balanceAmount, isDarkMode ? styles.darkText : styles.lightText]}>
              ${balance.toFixed(2)}
            </Text>

            {/* Cierra el teclado tocando fuera de él */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, isDarkMode ? { backgroundColor: '#333', color: '#fff', borderColor: '#555' } : { backgroundColor: '#fff', color: '#000' }]}
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="Monto"
                  placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
                />
              </View>
            </TouchableWithoutFeedback>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#28a745', shadowColor: '#28a745' }]}
                onPress={() => {
                  setTransactionType('deposit');
                  handleTransaction();
                }}
              >
                <Text style={styles.buttonText}>Depositar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#dc3545', shadowColor: '#dc3545' }]}
                onPress={() => {
                  setTransactionType('withdrawal');
                  handleTransaction();
                }}
              >
                <Text style={styles.buttonText}>Retirar</Text>
              </TouchableOpacity>
            </View>

            {transactions.length === 0 ? (
              <Text style={[styles.noTransactionsText, isDarkMode ? styles.darkText : styles.lightText]}>
                No hay transacciones recientes.
              </Text>
            ) : (
              <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.transactionItem}>
                    <Text style={isDarkMode ? styles.darkText : styles.lightText}>{item.date}</Text>
                    <Text style={isDarkMode ? styles.darkText : styles.lightText}>{item.description}</Text>
                    <Text style={{ color: item.type === 'deposit' ? '#28a745' : '#dc3545' }}>
                      {item.type === 'deposit' ? '+' : '-'}${item.amount.toFixed(2)}
                    </Text>
                  </View>
                )}
              />
            )}
          </View>
        );
      case 'settings':
        return <Ajustes toggleTheme={toggleTheme} isDarkMode={isDarkMode} />;
      default:
        return null;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <Text style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}>BancoApp</Text>
        {renderContent()}

        {/* Barra de navegación al fondo */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => setActiveTab('home')}>
            <Icon name="home-outline" size={30} color={activeTab === 'home' ? '#4a90e2' : '#6c757d'} />
            <Text style={isDarkMode ? styles.darkText : styles.lightText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('settings')}>
            <Icon name="settings-outline" size={30} color={activeTab === 'settings' ? '#4a90e2' : '#6c757d'} />
            <Text style={isDarkMode ? styles.darkText : styles.lightText}>Ajustes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Estilos adicionales
const styles = StyleSheet.create({
  darkContainer: {
    backgroundColor: '#121212',
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60, // Asegura que los botones no se superpongan
  },
  balanceText: {
    fontSize: 18,
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    flex: 1,
    margin: 10,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  noTransactionsText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  transactionItem: {
    marginBottom: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default BancoApp;
  