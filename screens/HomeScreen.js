/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decode as base64decode} from 'base-64';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../api';
import {formToJSON} from 'axios';

// Define the atob function globally using base-64
global.atob = base64decode;

const HomeScreen = () => {
  const [option, setOption] = useState('Compatible');
  const [profilesData, setProfilesData] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token);
        if (token) {
          // Split the JWT token to get the payload part
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

  useEffect(() => {
    showToken();
  }, []);

  const showToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('Token:', token);
  };

  console.log('userId', userId);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(profilesData[0]);

  const fetchMathches = async () => {
    try {
      const response = await api.get(`/matches?userId=${userId}`);
      const matches = response.data; // No need for .matches here, as the response itself is an array of matches
      setProfilesData(matches);
      console.log('Matches Data:', matches); // Log the matches data here
    } catch (error) {
      console.log('Error fetching matches:', error); // Log the error for debugging
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMathches();
    }
  }, [userId]);
  useEffect(() => {
    if (profilesData.length > 0) {
      setCurrentProfile(profilesData[0]);
    }
  }, [profilesData]);

  console.log('currentProfile', currentProfile);
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.topBar}>
        <View style={styles.iconContainer}>
          <Ionicons name="sparkles-sharp" size={22} color="black" />
        </View>
        <Pressable
          style={[
            styles.pressable,
            {
              borderColor: option === 'Compatible' ? 'transparent' : '#808080',
              backgroundColor:
                option === 'Compatible' ? 'black' : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.text,
              {
                color: option === 'Compatible' ? 'white' : '#808080',
              },
            ]}>
            compatible
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.pressable,
            {
              borderColor: option === 'Compatible' ? 'transparent' : '#808080',
              backgroundColor:
                option === 'Compatible' ? 'black' : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.text,
              {
                color: option === 'Compatible' ? 'white' : '#808080',
              },
            ]}>
            Active Today
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.pressable,
            {
              borderColor: option === 'Compatible' ? 'transparent' : '#808080',
              backgroundColor:
                option === 'Compatible' ? 'black' : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.text,
              {
                color: option === 'Compatible' ? 'white' : '#808080',
              },
            ]}>
            New Here
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 55,
  },
  topBar: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#D0D0D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    borderWidth: 0.7,
    padding: 10,
    borderRadius: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
});
