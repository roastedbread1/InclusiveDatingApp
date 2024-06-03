/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../AuthContext';
import api from '../api';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profilesData, setProfilesData] = useState([]);
  const [userId, setUserId] = useState(null);
  const {token, isLoading, setToken} = useContext(AuthContext);
  const [currentProfile, setCurrentProfile] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token);
        if (token) {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          // eslint-disable-next-line no-undef
          const jsonPayload = atob(base64);
          const decodedToken = JSON.parse(jsonPayload);
          console.log('Decoded Token:', decodedToken);
          const userID = decodedToken.userId;
          console.log('Extracted User ID:', userID);
          setUserId(userID);
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    fetchUser();
  }, []);
  console.log('User ID:', userId);

  const getUserDetails = async () => {
    try {
      const response = await api.get(`/users/${userId}`);
      if (response.status === 200) {
        const userData = response.data;
        setCurrentProfile(userData);
      } else {
        console.log('Error fetching user data:', response.status);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.imgView}>
        <View>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
        <View style={styles.setView}>
          <Pressable>
            <AntDesign name="infocirlce" size={24} color="black" />
          </Pressable>
          <Pressable>
            <AntDesign name="setting" size={24} color="black" />
          </Pressable>
        </View>
      </View>

      <View style={styles.profileView}>
        <Pressable
          onPress={() =>
            navigation.navigate('Details', {
              currentProfile: currentProfile,
            })
          }>
          <Image
            style={styles.userImg}
            source={{uri: currentProfile?.imageUrls[0]}}
          />

          <View style={styles.userNameView}>
            <Text style={styles.userName}>{currentProfile?.firstName}</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.randImgView}>
        <Image style={styles.randImg} source={require('../assets/Downy.png')} />
      </View>

      <Pressable onPress={logout} style={styles.logoutP}>
        <Text style={styles.logout}>Log Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 100,
    height: 80,
    resizeMode: 'cover',
  },
  imgView: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  setView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
    borderColor: 'pink',
    borderWidth: 3,
    alignSelf: 'center',
  },
  userName: {
    fontSize: 19,
    fontWeight: '600',
    color: 'black',
    alignSelf: 'center',
  },
  userNameView: {
    flexDirection: 'row',
    marginTop: 5,
    alignSelf: 'center',
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  randImgView: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  randImg: {
    height: 250,
    width: '100%',
    borderRadius: 10,
  },
  logout: {
    textAlign: 'center',
    fontWeight: '500',
  },
  logoutP: {
    borderBlockColor: 'black',
    marginTop: 20,
    padding: 12,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 120,
  },
});
