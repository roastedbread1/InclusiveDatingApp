/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import UserChat from '../components/UserChat';

const ChatScreen = () => {
  const [matches, setMatches] = useState([]);
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

  const fetchMatches = async () => {
    try {
      const response = await api.get(`/get-matches/${userId}`);
      setMatches(response.data.matches);
    } catch (error) {
      console.log('Error fetching matches:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchMatches();
      }
    }, [userId]),
  );
  console.log('Matches:', matches);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.text}>Your Matches</Text>

        <View style={styles.viewUnderText}>
          {matches?.map((item, index) => (
            <UserChat key={index} userId={userId} item={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  container: {
    marginTop: 5,
    padding: 12,
  },
  viewUnderText: {
    marginVertical: 12,
  },
});
