/* eslint-disable prettier/prettier */
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
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

const ProfileDetails = () => {
  const route = useRoute();
  const {currentProfile} = route?.params || {};

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.userCard}>
        <View>
          <View style={styles.userCardView2}>
            <View style={styles.userCardView3}>
              <Text style={styles.userFirstName}>
                {currentProfile?.firstName}
              </Text>
            </View>
            <View>
              <Entypo name="dots-three-horizontal" size={22} color="black" />
            </View>
          </View>

          {currentProfile?.imageUrls?.length > 0 && (
            <View style={styles.userCardView5}>
              <Image
                source={{uri: currentProfile.imageUrls[0]}}
                style={styles.userImage}
              />
            </View>
          )}

          {currentProfile?.prompts?.slice(0, 1).map((prompt, index) => (
            <View style={styles.userCardView5} key={index}>
              <View style={styles.promptsView}>
                <Text style={styles.questionText}>{prompt.question}</Text>
                <Text style={styles.answerText}>{prompt.answer}</Text>
              </View>
            </View>
          ))}

          <View>
            {currentProfile?.imageUrls?.slice(1, 3).map((image, index) => (
              <View style={styles.imageView} key={index}>
                <Image source={{uri: image}} style={styles.userImage} />
              </View>
            ))}
          </View>

          {currentProfile?.prompts?.slice(1, 2).map((prompt, index) => (
            <View style={styles.userCardView5} key={index}>
              <View style={styles.promptsView}>
                <Text style={styles.questionText}>{prompt.question}</Text>
                <Text style={styles.answerText}>{prompt.answer}</Text>
              </View>
            </View>
          ))}

          <View>
            {currentProfile?.imageUrls?.slice(3, 4).map((image, index) => (
              <View style={styles.imageView} key={index}>
                <Image source={{uri: image}} style={styles.userImage} />
              </View>
            ))}
          </View>

          {currentProfile?.prompts?.slice(2, 3).map((prompt, index) => (
            <View style={styles.userCardView5} key={index}>
              <View style={styles.promptsView}>
                <Text style={styles.questionText}>{prompt.question}</Text>
                <Text style={styles.answerText}>{prompt.answer}</Text>
              </View>
              <Pressable style={styles.likeButton}>
                <AntDesign name="hearto" size={22} color="#C5B358" />
              </Pressable>
            </View>
          ))}

          <View>
            {currentProfile?.imageUrls?.slice(4, 7).map((image, index) => (
              <View style={styles.imageView} key={index}>
                <Image source={{uri: image}} style={styles.userImage} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileDetails;

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
