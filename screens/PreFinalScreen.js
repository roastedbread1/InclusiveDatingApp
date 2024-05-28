/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, SafeAreaView, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';
import {getRegistrationProgress} from '../registrationUtils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

const PreFinalScreen = () => {
  const [userData, setUserData] = useState();
  const {token, setToken} = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', {screen: 'Main'});
    }
  }, [token, navigation]);
  useEffect(() => {
    getAllUserData();
  }, []);

  const getAllUserData = async () => {
    try {
      const screens = [
        'Name',
        'Email',
        'Password',
        'Birth',
        'Location',
        'Gender',
        'Type',
        'Dating',
        'LookingFor',
        'Hometown',
        'Photos',
        'Prompt',
      ];

      let userData = {};

      for (const screenName of screens) {
        const screenData = await getRegistrationProgress(screenName);
        if (screenData) {
          userData = {...userData, ...screenData};
        }
      }

      setUserData(userData);
    } catch (error) {
      console.log('error', error);
    }
  };
  const clearAllScreenData = async () => {
    try {
      const screens = [
        'Name',
        'Email',
        'Password',
        'Birth',
        'Location',
        'Gender',
        'Type',
        'Dating',
        'LookingFor',
        'Hometown',
        'Photos',
        'Prompt',
      ];

      for (const screenName of screens) {
        const key = `registration_progress_${screenName}`;
        await AsyncStorage.removeItem(key);
      }
      console.log('All screen data is cleared');
    } catch (error) {
      console.log('error', error);
    }
  };
  const registerUser = async () => {
    try {
      console.log('Register user initiated'); // Added logging
      const response = await api.post('/register', userData); // Use the configured Axios instance
      console.log('Register user response:', response.data); // Log the response
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      setToken(token);
      console.log('Token set successfully'); // Log after setting the token
      await clearAllScreenData();
    } catch (error) {
      console.error('Register user error:', error); // Log the error
    }
  };

  console.log(userData);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 80}}>
        <Text
          style={{
            fontSize: 35,
            fontStyle: 'normal',

            marginLeft: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          You're all set!
        </Text>
        <Text
          style={{
            fontSize: 35,
            fontStyle: 'normal',

            marginLeft: 20,
            fontWeight: 'bold',
            color: 'black',
            marginTop: 10,
          }}>
          Setting up your profile for you
        </Text>

        <View style={styles.container}>
          <View style={styles.animationContainer}>
            <LottieView
              style={styles.animation}
              source={require('../assets/love2.json')}
              autoPlay
              loop={true}
              speed={0.7}
            />
          </View>
        </View>
      </View>

      <Pressable
        onPress={registerUser}
        style={{backgroundColor: 'black', padding: 15, marginTop: 'auto'}}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 15,
          }}>
          Finish Registering
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PreFinalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  animationContainer: {
    width: 250, // Adjust the width as needed
    height: 250, // Adjust the height as needed
    alignSelf: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});
