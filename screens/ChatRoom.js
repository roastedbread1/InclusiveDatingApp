/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {io} from 'socket.io-client';
import api from '../api';

const ChatRoom = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const socket = io('http://10.0.2.2:9999');

  socket.on('connect', () => {
    fetchMessages();
    setTimeout(() => {}, 200);
  });

  socket.on('receive-message', newMessage => {
    console.log('new message:');

    setMessages(preMessages => [...preMessages, newMessage]);
  });

  const sendMessage = async (senderId, receiverId) => {
    socket.emit('send-message', {senderId, receiverId, message});
    setMessage('');
  };
  useLayoutEffect(() => {
    return navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={styles.headerView}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <View>
            <Text style={styles.text}>{route?.params?.name}</Text>
          </View>
        </View>
      ),
    });
  }, []);
  const fetchMessages = async () => {
    try {
      const senderId = route?.params?.senderId;
      const receiverId = route?.params?.receiverId;
      const response = await api.get('/messages', {
        params: {senderId, receiverId},
      });
      setMessages(response.data);
      console.log('messages:', response.data); // Log messages here
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  const formatTime = time => {
    const option = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', option);
  };
  console.log('messages:', messages);
  return (
    <KeyboardAvoidingView style={styles.keyboard}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {messages?.map((item, index) => (
          <Pressable
            style={[
              item?.senderId === route?.params?.senderId
                ? {
                    alignSelf: 'flex-end',
                    backgroundColor: 'black',
                    padding: 8,
                    maxWidth: '60%',
                    borderRadius: 7,
                    margin: 10,
                  }
                : {
                    alignSelf: 'flex-start',
                    backgroundColor: 'black',
                    padding: 8,
                    maxWidth: '60%',
                    borderRadius: 7,
                    margin: 10,
                  },
            ]}
            key={index}>
            <Text style={styles.message}>{item?.message}</Text>
            <Text style={styles.time}>{formatTime(item?.timestamp)}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.msgView2}>
        <Entypo
          style={{marginRight: 7}}
          name="emoji-happy"
          size={24}
          color="black"
        />
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={styles.msgText}
          placeholder="Type your message..."
        />
        <View style={styles.msgView}>
          <Entypo name="camera" size={24} color="black" />
          <Feather name="mic" size={24} color="black" />
        </View>
        <Pressable
          onPress={() =>
            sendMessage(route?.params?.senderId, route?.params?.receiverId)
          }
          style={styles.pressable}>
          <Text style={styles.sendTxt}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  keyboard: {
    flex: 1,
    backgroundColor: 'white',
  },
  msgText: {
    flex: 1,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  msgView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 8,
  },
  pressable: {
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  msgView2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    marginBottom: 5,
  },
  sendTxt: {
    textAlign: 'center',
    color: 'white',
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
  },
  time: {
    fontSize: 9,
    textAlign: 'right',
    color: 'black',
  },
});
