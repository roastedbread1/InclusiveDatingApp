/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decode as base64decode} from 'base-64';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../api';
import {formToJSON} from 'axios';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

// Define the atob function globally using base-64
global.atob = base64decode;

const HomeScreen = () => {
  const navigation = useNavigation();
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

  const fetchMatches = async () => {
    try {
      const response = await api.get(`/matches?userId=${userId}`);
      const matches = response.data;
      setProfilesData(matches);
      console.log('Matches Data:', matches);
    } catch (error) {
      console.log('Error fetching matches:', error);
    }
  };

  const blockUser = async () => {
    try {
      const response = await api.post(`/block-user`, {
        userId,
        blockedUserId: currentProfile._id,
      });
      fetchMatches();
    } catch (error) {
      console.log('Error blocking user:', error);
    }
  };

  const calculateAge = dateOfBirth => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  useEffect(() => {
    if (userId) {
      fetchMatches();
    }
  }, [userId]);
  useEffect(() => {
    if (profilesData.length > 0) {
      setCurrentProfile(profilesData[0]);
    }
  }, [profilesData]);

  useFocusEffect(
    useCallback(() => {
      console.log('Fetching matches');
      if (userId) {
        fetchMatches();
      }
    }, [userId]),
  );

  const age = currentProfile ? calculateAge(currentProfile.dateOfBirth) : null;

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.topBar}>
          <View style={styles.iconContainer}>
            <Ionicons name="sparkles-sharp" size={22} color="black" />
          </View>
          <Pressable
            onPress={() => setOption('Compatible')}
            style={[
              styles.pressable,
              {
                borderColor:
                  option === 'Compatible' ? 'transparent' : '#808080',
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
            onPress={() => setOption('Active Today')}
            style={[
              styles.pressable,
              {
                borderColor:
                  option === 'Active Today' ? 'transparent' : '#808080',
                backgroundColor:
                  option === 'Active Today' ? 'black' : 'transparent',
              },
            ]}>
            <Text
              style={[
                styles.text,
                {
                  color: option === 'Active Today' ? 'white' : '#808080',
                },
              ]}>
              Active Today
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setOption('New Here')}
            style={[
              styles.pressable,
              {
                borderColor: option === 'New Here' ? 'transparent' : '#808080',
                backgroundColor:
                  option === 'New Here' ? 'black' : 'transparent',
              },
            ]}>
            <Text
              style={[
                styles.text,
                {
                  color: option === 'New Here' ? 'white' : '#808080',
                },
              ]}>
              New Here
            </Text>
          </Pressable>
        </View>

        <View style={styles.userCard}>
          <>
            <View>
              <View style={styles.userCardView2}>
                <View style={styles.userCardView3}>
                  <Text style={styles.userFirstName}>
                    {currentProfile?.firstName}
                  </Text>
                  {/* <View style={styles.userCardView4}>
                    <Text style={styles.userDesc}>new here</Text>
                  </View> */}
                </View>
                <View>
                  <Entypo
                    name="dots-three-horizontal"
                    size={22}
                    color="black"
                  />
                </View>
              </View>

              <View style={styles.userCardView5}>
                <View>
                  {currentProfile?.imageUrls.length > 0 && (
                    <View>
                      <Image
                        source={{uri: currentProfile?.imageUrls[0]}}
                        style={styles.userImage}
                      />
                      <Pressable
                        onPress={() =>
                          navigation.navigate('SendLike', {
                            image: currentProfile?.imageUrls[0],
                            name: currentProfile?.firstName,
                            userId: userId,
                            likedUserId: currentProfile?._id,
                          })
                        }
                        style={styles.likeButton}>
                        <AntDesign name="hearto" size={22} color="#C5B358" />
                      </Pressable>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.userCardView5}>
                {currentProfile?.prompts.slice(0, 1).map((prompt, index) => (
                  <View key={index}>
                    <View style={styles.promptsView}>
                      <Text style={styles.questionText}>{prompt.question}</Text>
                      <Text style={styles.answerText}>{prompt.answer}</Text>
                    </View>
                    <Pressable style={styles.likeButton}>
                      <AntDesign name="hearto" size={22} color="#C5B358" />
                    </Pressable>
                  </View>
                ))}
              </View>

              <View style={styles.ageView1}>
                <View style={styles.ageView2}>
                  <View style={styles.ageView}>
                    <MaterialCommunityIcons
                      name="cake-variant-outline"
                      size={22}
                      color="black"
                    />
                    <Text style={styles.ageText}> {`${age}`} </Text>
                  </View>

                  <View style={styles.ageView}>
                    <Ionicons name="person-outline" size={22} color="black" />
                    <Text style={styles.ageText}>
                      {' '}
                      {currentProfile?.gender}{' '}
                    </Text>
                  </View>

                  <View style={styles.ageView}>
                    <Ionicons name="magnet-outline" size={22} color="black" />
                    <Text style={styles.ageText}> {currentProfile?.type} </Text>
                  </View>

                  <View style={[styles.ageView, {marginLeft: 0}]}>
                    <Octicons name="home" size={20} color="black" />
                    <Text style={styles.homeText}>
                      {currentProfile?.hometown}
                    </Text>
                  </View>
                </View>

                <View style={styles.lfIconView}>
                  <Feather name="search" size={20} color="black" />
                  <Text>{currentProfile?.lookingFor}</Text>
                </View>
              </View>
            </View>

            <View>
              <View>
                {currentProfile?.imageUrls.slice(1, 3).map((image, index) => (
                  <View style={styles.imageView} key={index}>
                    <Image
                      key={index}
                      source={{uri: image}}
                      style={styles.userImage}
                    />
                  </View>
                ))}
              </View>

              <View style={styles.userCardView5}>
                {currentProfile?.prompts.slice(1, 2).map((prompt, index) => (
                  <>
                    <View style={styles.promptsView} key={index}>
                      <Text style={styles.questionText}>{prompt.question}</Text>
                      <Text style={styles.answerText}>{prompt.answer}</Text>
                    </View>
                    <Pressable style={styles.likeButton}>
                      <AntDesign name="hearto" size={22} color="#C5B358" />
                    </Pressable>
                  </>
                ))}
              </View>

              <View>
                {currentProfile?.imageUrls.slice(3, 4).map((image, index) => (
                  <View style={styles.imageView} key={index}>
                    <Image source={{uri: image}} style={styles.userImage} />
                  </View>
                ))}
              </View>

              <View style={styles.userCardView5}>
                {currentProfile?.prompts.slice(2, 3).map((prompt, index) => (
                  <>
                    <View style={styles.promptsView} key={index}>
                      <Text style={styles.questionText}>{prompt.question}</Text>
                      <Text style={styles.answerText}>{prompt.answer}</Text>
                    </View>
                    <Pressable style={styles.likeButton}>
                      <AntDesign name="hearto" size={22} color="#C5B358" />
                    </Pressable>
                  </>
                ))}
              </View>

              <View>
                {currentProfile?.imageUrls.slice(4, 7).map((image, index) => (
                  <View style={styles.imageView} key={index}>
                    <Image
                      key={index}
                      source={{uri: image}}
                      style={styles.userImage}
                    />
                  </View>
                ))}
              </View>
            </View>
          </>
        </View>
      </ScrollView>

      <Pressable onPress={blockUser} style={styles.cancelButton}>
        <Entypo name="cross" size={22} color="red" />
      </Pressable>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 0,
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
  userCard: {
    marginHorizontal: 12,
    marginVertical: 12,
  },
  userFirstName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  userCardView4: {
    backgroundColor: '#452c63',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  userCardView2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  userCardView3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  userDesc: {
    textAlign: 'center',
    color: 'white',
  },

  userCardView5: {
    marginVertical: 15,
  },

  userImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  likeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  promptsView: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    height: 150,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 15,
    fontWeight: '500',
  },
  answerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  ageView1: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  ageView2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingTop: 5,
    borderbottomWidth: 0.8,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },

  ageView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  ageText: {
    fontSize: 15,
    fontWeight: '500',
  },
  homeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  lfIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    margintop: 15,
    borderbottomWidth: 0.7,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  imageView: {
    marginVertical: 10,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 15,
    left: 12,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
