import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  BackHandler,
} from 'react-native';
import Comfortaa from '../../components/Comfortaa';
import {colors} from '../../res/colors';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import {FlatList} from 'react-native-gesture-handler';
import {ms} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {setIdUser, setSelectedUser} from '../../store/globalAction';

export default function Index({navigation}) {
  const logout = async () => {
    await GoogleSignin.signOut();
    dispatch(setIdUser(null));
    navigation.navigate('Login');
  };

  const {id_user, user} = useSelector(data => data.global);
  const [users, setUsers] = useState({});
  const dispatch = useDispatch();
  const data = [];
  function handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }
  useEffect(() => {
    database()
      .ref('/users/')
      .on('value', snapshot => {
        setUsers(snapshot.val());
      });
    console.log(user);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  }, []);
  for (const key in users) {
    if (users[key]._id !== id_user) data.push(users[key]);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.flexContent, styles.header]}>
        <Comfortaa type="Bold" style={styles.logo}>
          CemilChat
        </Comfortaa>
        <TouchableOpacity style={styles.logout} onPress={logout}>
          <Comfortaa>Logout</Comfortaa>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('RoomChat', {
                  title: item.name,
                  id: item._id,
                });
              }}>
              <View style={styles.listChat}>
                <View style={styles.flexContent}>
                  <View style={styles.flexContent}>
                    <Image
                      resizeMode="cover"
                      source={{uri: 'https://placeimg.com/140/140/any'}}
                      style={styles.photo}
                    />
                    <View>
                      <Comfortaa style={styles.list}>{item.name}</Comfortaa>
                      <Comfortaa style={styles.lastChat}>
                        {user.chat[item._id]?.chat[0].text}
                      </Comfortaa>
                    </View>
                  </View>
                  <Comfortaa style={styles.lastSeen}>Online</Comfortaa>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    height: heightPercentageToDP('100%'),
  },
  header: {
    padding: ms(20),
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  logout: {
    padding: ms(7),
    borderRadius: ms(7),
    backgroundColor: 'red',
  },
  logo: {
    fontSize: ms(16),
  },
  photo: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(40),
    marginRight: ms(10),
  },
  flexContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listChat: {
    backgroundColor: colors.primaryLight,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: colors.primary,
    padding: ms(10),
  },
  list: {
    color: colors.primaryDark,
    fontSize: ms(16),
  },
  lastChat: {
    color: 'lightgray',
    fontSize: ms(12),
  },
  lastSeen: {
    color: 'green',
    fontSize: ms(10),
  },
});
