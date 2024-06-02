/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../api';

const SendLikeScreen = () => {
  const route = useRoute();
  const [comment, setComment] = useState('');
  const navigation = useNavigation();
  const userId = route?.params?.userId;
  console.log(route.params?.userId);
  console.log('liked user', route.params?.likedUserId);
  const likeProfile = async () => {
    try {
      const response = await api.post('/like-profile', {
        userId: route.params.userId,
        likedUserId: route.params.likedUserId,
        image: route?.params?.image,
        comment: comment,
      });
      console.log(response.data.message); // Log success message
      if (response.status == 200) {
        navigation.goBack();
      }
      // Handle success: Update UI, show notifications, etc.
    } catch (error) {
      console.error('Error liking profile:', error);
      // Handle error: Show error message, retry logic, etc.
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.topView}>
        <Text style={styles.name}>{route.params.name}</Text>
        <Image style={styles.image} source={{uri: route.params.image}} />

        <TextInput
          style={[styles.textInput, {fontSize: comment ? 17 : 17}]}
          placeholder="Add a comment"
          value={comment}
          onChangeText={text => setComment(text)}
        />

        <View style={styles.iconView}>
          <Pressable onPress={likeProfile} style={styles.sendLikeButton}>
            <Text style={styles.sendLikeText}>Send Like</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SendLikeScreen;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 20,
  },
  textInput: {
    padding: 17,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
  },
  topView: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginHorizontal: 40,
  },
  iconView: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sendLikeButton: {
    backgroundColor: '#FFFDD0',
    padding: 10,
    borderRadius: 20,
    flex: 1,
  },
  sendLikeText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
