import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useState, useCallback, useEffect} from 'react';
import {View, BackHandler, ActivityIndicator} from 'react-native';
import {GiftedChat, ChatInput, SendButton} from 'react-native-gifted-chat';
import {colors} from '../../res/colors';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedUser, setLoading, setUser} from '../../store/globalAction';
import Loading from '../../components/Loading';
export default function Index({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const {id_user, selectedUser, loading, user} = useSelector(
    data => data.global,
  );
  const idSelect = route.params.id;
  const dispatch = useDispatch();
  const loadUser = async () => {
    database()
      .ref('users/' + route.params.id)
      .on('value', data => {
        dispatch(setSelectedUser(data.val()));
      });
  };
  const loadChat = async () => {
    console.log(idSelect, 'coba');
    const chat = user['chat'][idSelect]['chat'];
    chat?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setMessages(chat);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    console.log(loading);
    loadUser();
    loadChat();
    database()
      .ref('users/' + id_user + '/chat/' + idSelect)
      .on('value', data => {
        const urut = data?.val()?.chat?.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setMessages(urut);
      });
    dispatch(setLoading(false));
    console.log(loading);
    console.log(selectedUser, 'coba');
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      BackHandler.addEventListener('hardwareBackPress', () => {
        BackHandler.exitApp();
        return true;
      });
      return true;
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => {
      messages[0].createdAt = new Date().toString();
      console.log(messages[0]);
      database()
        .ref('users/' + id_user + '/chat/' + route.params.id)
        .update(
          previousMessages
            ? {
                chat: [
                  {
                    ...messages[0],
                  },
                  ...previousMessages?.reverse(),
                ],
              }
            : {
                chat: [
                  {
                    ...messages[0],
                  },
                ],
              },
        );
      database()
        .ref('users/' + route.params.id + '/chat/' + id_user)
        .update(
          previousMessages
            ? {
                chat: [
                  {
                    ...messages[0],
                  },
                  ...previousMessages?.reverse(),
                ],
              }
            : {
                chat: [
                  {
                    ...messages[0],
                  },
                ],
              },
        );
      return GiftedChat.append(previousMessages, messages);
    });
  }, []);

  // const onSend = useCallback((messages = []) => {
  //   setMessages(previousMessages => {
  //     console.log(previousMessages);
  //     return GiftedChat.append(previousMessages, messages);
  //   });
  //   console.log(messages);
  // }, []);
  return (
    <GiftedChat
      renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      messages={messages}
      onSend={messages => onSend(messages)}
      textInputProps={{color: colors.primaryDark}}
      user={{
        _id: id_user,
      }}
    />
  );
}
