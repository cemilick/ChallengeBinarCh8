import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';

export default function MainRoutes() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='ChatApp' component={ChatApp} /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
