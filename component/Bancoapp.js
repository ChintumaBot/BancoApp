import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function BankAppScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Banco App</Text>
      
      <Button
        title="Hacer Transferencia"
        onPress={() => navigation.navigate('Transfer')}
      />
      <Button
        title="Cerrar sesión"
        onPress={() => navigation.navigate('Menu')} // Redirigir al menú o pantalla de inicio de sesión
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
