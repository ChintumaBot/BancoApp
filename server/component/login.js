import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  
  useEffect(() => {
    const cargarDatosGuardados = async () => {
      try {
        const correoGuardado = await AsyncStorage.getItem('correo');
        const contraseñaGuardada = await AsyncStorage.getItem('contraseña');
        if (correoGuardado) setCorreo(correoGuardado);
        if (contraseñaGuardada) setContraseña(contraseñaGuardada);
      } catch (error) {
        console.error('Error al cargar los datos guardados:', error);
      }
    };
    cargarDatosGuardados();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.108:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: correo, contraseña }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Inicio de sesión exitoso');
        
        await AsyncStorage.setItem('correo', correo);
        await AsyncStorage.setItem('contraseña', contraseña);
  
        // Aquí cambia "Inicio" por "Bancoapp"
        navigation.navigate('Bancoapp');
      } else {
        alert(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <ImageBackground
      source={require('../assets/fondo4.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={contraseña}
          onChangeText={setContraseña}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',  // Fondo transparente para dar un look más moderno
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',  // Fuente moderna
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco con opacidad
    fontSize: 18,
    color: '#333',
    fontFamily: 'Roboto',  // Fuente moderna
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,  // Sombra para Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',  // Fuente moderna
  },
});