// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
// Somewhere in your code

export default function App() {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const [user, setUser] = useState({});
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      console.log(user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('canceled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('in proses');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('outdated');
      } else {
        // some other error happened
        console.log(error, 'error');
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null); // Remember to remove the user from your app's state as well
      console.log('Success Logout');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <GoogleSigninButton onPress={signIn} />
    </View>
  );
}
