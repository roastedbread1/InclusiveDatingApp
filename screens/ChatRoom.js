/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
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
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {io} from 'socket.io-client';

const ChatRoom = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const route = useRoute();
  const socket = io('http://localhost:9999');
  socket.on('connect', () => {
    console.log('connected');
  });
  useLayoutEffect(() => {
    return navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={styles.headerView}>
          <Ionicons name="arrow-back" size={24} color="gray" />
          <View>
            <Text style={styles.text}>{route?.params?.name}</Text>
          </View>
        </View>
      ),
    });
  }, []);
  return (
    <KeyboardAvoidingView style={styles.keyboard}>
      <ScrollView></ScrollView>
      <View style={styles.msgView2}>
        <Entypo
          style={{marginRight: 7}}
          name="emoji-happy"
          size={24}
          color="gray"
        />
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={styles.msgText}
          placeholder="Type your message..."
        />
        <View style={styles.msgView}>
          <Entypo name="camera" size={24} color="gray" />
          <Feather name="mic" size={24} color="gray" />
        </View>
        <Pressable
          // onPress={() =>
          //   sendMessage(route?.params?.senderId, route?.params?.receiverId)
          // }
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
    backgroundColor: 'gray',
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
});
