/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';

const GenderScreen = () => {
  const [gender, setGender] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('Gender').then(progressData => {
      if (progressData) {
        setGender(progressData.gender || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (gender.trim() !== '') {
      saveRegistrationProgress('Gender', {gender});
    }
    navigation.navigate('Type');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 90, marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 2,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="male-female" size={26} color="black" />
          </View>
          <View
            style={{
              width: 44,
              height: 44,
              // borderRadius: 22,
              // borderWidth: 2,
              // borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 20,
            }}>
            <Entypo name="dots-three-horizontal" size={35} color="black" />
          </View>
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            marginTop: 15,
          }}>
          What is your gender?
        </Text>

        <Text
          style={{
            fontSize: 18,
            color: 'gray',
            marginTop: 15,
          }}>
          Downy users are matched based on these three gender groups
        </Text>

        <View style={{marginTop: 30, flexDirection: 'column', gap: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Male</Text>
            <Pressable onPress={() => setGender('Male')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Male' ? 'black' : '#F0F0F0'}
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Female</Text>
            <Pressable onPress={() => setGender('Female')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Female' ? 'black' : '#F0F0F0'}
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Non-Binary</Text>
            <Pressable onPress={() => setGender('Non-Binary')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Non-Binary' ? 'black' : '#F0F0F0'}
              />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <AntDesign
            name="checksquare"
            size={20}
            color={gender.length > 0 ? 'black' : '#F0F0F0'}
          />
          <Text style={{fontSize: 15}}>Visible on profile</Text>
        </View>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 30, marginLeft: 'auto'}}>
          <MaterialCommunityIcons
            style={{alignSelf: 'center', marginTop: 20}}
            name="arrow-right-circle"
            size={45}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({});
