/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

const SendLikeScreen = () => {
  const route = useRoute();
  const [comment, setComment] = useState('');
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Text>SendLikeScreen</Text>
    </SafeAreaView>
  );
};

export default SendLikeScreen;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
});
