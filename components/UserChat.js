/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const UserChat = ({item, userId}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ChatRoom', {
          image: item?.imageUrls[0],
          name: item?.firstName,
          receiverId: item?._id,
          senderId: userId,
        })
      }
      style={styles.container}>
      <View>
        <Image style={styles.image} source={{uri: item?.imageUrls[0]}} />
      </View>
      <View>
        <Text style={styles.nameTxt}>{item.firstName}</Text>
        <Text style={styles.text}>
          {`start chatting with ${item.firstName}`}{' '}
        </Text>
      </View>
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 6,
    color: 'black',
  },
  nameTxt: {
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
  },
});
