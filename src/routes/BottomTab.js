import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ChatApp from '../screens/ChatApp';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="ChatApp" component={ChatApp} />
      {/* <Tab.Screen name='AddFriend' component={AddFriend}/>
        <Tab.Screen name='GroupChat' component={GroupChat}/> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
