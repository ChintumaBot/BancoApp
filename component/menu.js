import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';

export default function Menu({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/fondo3.jpg')} // Ruta de la imagen en assets
      style={styles.menuContainer}
    >
      <Text style={styles.title}>BANMEX</Text>

      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.menuText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.menuText}>Registrarse</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
