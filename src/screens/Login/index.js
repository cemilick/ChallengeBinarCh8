import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {LogBox} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../res/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logo from '../../assets/images/logo.png';
import {moderateScale as ms} from 'react-native-size-matters';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import database from '@react-native-firebase/database';
import {setIdUser, setToken, setUser} from '../../store/globalAction';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/Loading';
LogBox.ignoreAllLogs();

export default function Index({navigation}) {
  const dispatch = useDispatch();
  const {id_user} = useSelector(state => state.global);
  console.log(id_user);
  useEffect(() => {
    GoogleSignin.configure();
    console.log(id_user);
    if (id_user !== null) navigation.navigate('BottomTab');
  }, [id_user]);
  const signIn = async () => {
    try {
      console.log(id_user, 'iduser');

      await GoogleSignin.hasPlayServices();

      if (id_user !== null) {
        navigation.navigate('BottomTab');
      } else {
        const userInfo = await GoogleSignin.signIn();
        database()
          .ref('users/' + userInfo.user.id)
          .on('value', data => {
            if (!data.val()) {
              database()
                .ref('users/' + userInfo.user.id)
                .set({
                  _id: userInfo.user.id,
                  name: userInfo.user.name,
                  email: userInfo.user.email,
                });
            }
          });
        database()
          .ref('users/' + userInfo.user.id)
          .on('value', data => {
            dispatch(setUser(data.val()));
          });
        dispatch(setToken(userInfo.idToken));
        dispatch(setIdUser(userInfo.user.id));
        navigation.navigate('BottomTab');
      }
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
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <ScrollView style={{backgroundColor: colors.primaryDark}}>
      {/* <Loading /> */}
      <View style={styles.circleTopContainer}>
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>

      <View style={styles.allContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.footer}>
          <GoogleSigninButton onPress={signIn} />
        </View>
      </View>
      <View style={styles.circleBottomContainer}>
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    width: wp(100),
    height: hp(100),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    marginBottom: ms(8),
    borderRadius: ms(5),
    width: wp(80),
  },
  formContainer: {
    backgroundColor: colors.primary,
    width: wp(90),
    padding: wp(5),
    borderRadius: ms(10),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: ms(150),
    height: ms(150),
  },
  logoContainer: {
    backgroundColor: colors.primary,
    borderRadius: ms(200),
    padding: ms(20),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ms(10),
  },
  button: {
    backgroundColor: colors.primaryDark,
    padding: ms(10),
    alignItems: 'center',
    width: wp(50),
    borderRadius: ms(5),
    marginTop: ms(8),
  },
  footer: {
    alignItems: 'center',
    marginTop: ms(25),
  },
  circle: {
    backgroundColor: colors.primary,
    width: ms(20),
    height: ms(20),
    borderRadius: ms(100),
  },
  circleTopContainer: {
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: hp(15),
    width: wp(100),
  },
  circleBottomContainer: {
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: hp(15),
    width: wp(100),
    bottom: 0,
  },
});
