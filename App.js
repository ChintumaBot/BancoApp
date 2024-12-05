import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View } from 'react-native';

export default function Menu({ navigation }) {
  return (
    // Asegúrate de que el contenedor ImageBackground tenga flex: 1 para ocupar toda la pantalla
    <ImageBackground 
      source={require('./assets/celular fondo.jpg')} // Ruta de la imagen en assets
      style={styles.menuContainer}
    >
      {/* Resto de los elementos */}
      <View style={styles.innerContainer}> 
        <Text style={styles.title}>Banco Azteca</Text>

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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1, // Asegura que el fondo cubra toda la pantalla
    justifyContent: 'center', // Centra los elementos verticalmente
    alignItems: 'center', // Centra los elementos horizontalmente
  },
  innerContainer: {
    // Aquí se agrupan los elementos que quieres que estén encima del fondo
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Esto agrega un fondo semi-transparente si es necesario
    borderRadius: 10, // Opcional, si quieres redondear los bordes de este contenedor
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 30, // Espacio entre el título y los botones
    textAlign: 'center',
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 10, // Espacio entre los botones
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
