import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import BottomTab from './BottomTab';
import RoomChat from '../screens/RoomChat';
export default function MainRoutes() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen
        name="RoomChat"
        component={RoomChat}
        options={({route}) => ({headerShown: true, title: route.params.title})}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
