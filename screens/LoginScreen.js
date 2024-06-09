/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../AuthContext';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [option, setOption] = useState('Create Account');
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {token, isLoading, setToken} = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', {screen: 'Main'});
    }
  }, [token, navigation]);

  const signInUser = async () => {
    setOption('Sign In');

    try {
      const user = {
        email: email,
        password: password,
      };

      const response = await api.post('/login', user);
      console.log(response);
      const token = response.data.token;

      await AsyncStorage.setItem('token', token);
      setToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  const createAccount = () => {
    setOption('Create Account');
    navigation.navigate('Basic');
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.view2}>
        <View style={styles.view1}>
          {/* <Image
            style={styles.image}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/10372/10372560.png',
            }}
          /> */}
        </View>
        {/* <Text style={styles.text}>Downy</Text> */}
      </View>
      <KeyboardAvoidingView>
        <View style={styles.logoView}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
      </KeyboardAvoidingView>

      <View style={styles.viewUnderLogo}>
        {option === 'Sign In' ? (
          <>
            <View style={styles.email}>
              <MaterialCommunityIcons
                style={styles.emailIcon}
                name="email-outline"
                size={22}
                color={'black'}
              />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="white"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.textInput}
              />
            </View>

            <View style={[styles.email]}>
              <AntDesign
                style={styles.emailIcon}
                name="lock1"
                size={22}
                color={'black'}
              />
              <TextInput
                secureTextEntry={true}
                placeholder="Enter your password"
                placeholderTextColor="white"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.textInput}
              />
            </View>
          </>
        ) : (
          <View>
            <LottieView
              source={require('../assets/chat.json')}
              style={styles.gif}
              autoPlay
              loop={true}
              speed={0.7}
            />
          </View>
        )}
      </View>

      <Pressable
        onPress={() => {
          setOption(createAccount);
        }}
        style={[
          styles.createAccountBtn,
          {
            backgroundColor:
              option === 'Create Account' ? '#F0F0F0' : 'transparent',
          },
        ]}>
        <Text
          style={[
            styles.createAccountTxt,
            {color: option === 'Create Account' ? 'white' : 'black'},
          ]}>
          Create Account
        </Text>
      </Pressable>

      <Pressable
        onPress={signInUser}
        style={[
          styles.createAccountBtn,
          {
            backgroundColor: option === 'Sign In' ? 'black' : 'transparent',
          },
        ]}>
        <Text
          style={[
            styles.createAccountTxt,
            {color: option === 'Sign In' ? 'white' : 'black'},
          ]}>
          Sign In
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  view1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  image: {
    width: 150,
    height: 80,
    resizeMode: 'contain',
  },
  view2: {
    height: 200,
    backgroundColor: 'black',
    width: '100%',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  text: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 23,
    color: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  createAccountBtn: {
    marginTop: 10,
    width: 300,
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: 15,
    borderRadius: 30,
  },
  createAccountTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 190,
    height: 80,
    resizeMode: 'cover',
  },
  viewUnderLogo: {
    marginTop: 20,
    marginHorizontal: 25,
  },
  gif: {
    height: 100,
    width: 300,
    alignSelf: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },
  textInput: {
    color: 'white',
    marginVertical: 10,
    width: 300,
  },
  email: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'black',
    paddingVertical: 0,
    borderRadius: 5,
    marginTop: 30,
  },
  emailIcon: {
    marginLeft: 8,
  },
});
