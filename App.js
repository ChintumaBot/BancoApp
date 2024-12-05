import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './component/menu'; 
import LoginScreen from './component/login'; // Importamos la pantalla de login
import RegisterScreen from './component/register';
import BankAppScreen from './component/BankAppScreen'; // Pantalla principal del banco
import TransferScreen from './component/TransferScreen'; // Pantalla de transferencia

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="BankApp" component={BankAppScreen} /> {/* Pantalla de la app del banco */}
        <Stack.Screen name="Transfer" component={TransferScreen} /> {/* Pantalla de transferencia */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
