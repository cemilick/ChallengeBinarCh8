import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Comfortaa from '../../components/Comfortaa';
import {colors} from '../../res/colors';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function Index({navigation}) {
  const logout = async () => {
    await GoogleSignin.signOut();
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Comfortaa>Chat App</Comfortaa>
      <TouchableOpacity onPress={logout}>
        <Comfortaa>Logout</Comfortaa>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    height: heightPercentageToDP('100%'),
  },
});
