// Ajustes.js
import React from 'react';
import { View, Text, Switch, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const Ajustes = ({ toggleTheme, isDarkMode }) => {
  const handleChangePassword = () => {
    Alert.alert('Cambio de contraseña', 'La funcionalidad de cambiar contraseña estará disponible pronto.');
  };

  const handleViewTerms = () => {
    Alert.alert('Términos y condiciones', 'Aquí puedes agregar los términos y condiciones de tu aplicación.');
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}>Ajustes</Text>

      <View style={styles.settingItem}>
        <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>Modo oscuro</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      <TouchableOpacity style={styles.settingButton} onPress={handleChangePassword}>
        <Text style={styles.settingButtonText}>Cambiar contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingButton} onPress={handleViewTerms}>
        <Text style={styles.settingButtonText}>Ver términos y condiciones</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingText: {
    fontSize: 18,
  },
  settingButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  settingButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightContainer: {
    backgroundColor: '#f8f9fa',
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
});

export default Ajustes;
