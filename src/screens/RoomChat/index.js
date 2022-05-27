import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useState, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {GiftedChat, ChatInput, SendButton} from 'react-native-gifted-chat';
import {colors} from '../../res/colors';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedUser} from '../../store/globalAction';
export default function Index({route}) {
  const [messages, setMessages] = useState([]);
  const {id_user, selectedUser} = useSelector(data => data.global);

  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const loadUser = async () => {
    database()
      .ref('users/' + route.params.id)
      .on('value', data => {
        dispatch(setSelectedUser(data.val()));
      });
  };
  const loadChat = async () => {
    database()
      .ref('users/' + id_user + '/chat/' + selectedUser._id)
      .on('value', data => {
        setMessages(data.val()?.chat?.reverse());
      });
    console.log(selectedUser._id, 'coba');
  };

  useEffect(() => {
    loadUser();
    loadChat();
    console.log(selectedUser, 'coba');
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => {
      database()
        .ref('users/' + id_user + '/chat/' + selectedUser._id)
        .update(
          previousMessages
            ? {
                chat: [
                  ...previousMessages?.reverse(),
                  {
                    ...messages[0],
                  },
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
        .ref('users/' + selectedUser._id + '/chat/' + id_user)
        .update(
          previousMessages
            ? {
                chat: [
                  ...previousMessages?.reverse(),
                  {
                    ...messages[0],
                  },
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
      return GiftedChat.append(previousMessages?.reverse(), messages);
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
      messages={messages}
      onSend={messages => onSend(messages)}
      textInputProps={{color: colors.primaryDark}}
      user={{
        _id: id_user,
      }}
    />
  );
}
