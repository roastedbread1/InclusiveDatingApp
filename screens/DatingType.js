/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';
const DatingType = () => {
  const [datingPref, setDatingPref] = useState([]);
  useEffect(() => {
    getRegistrationProgress('DatingType').then(progressData => {
      if (progressData) {
        setDatingPref(progressData.datingPref || []);
      }
    });
  }, []);
  const chooseOption = option => {
    if (datingPref.includes(option)) {
      setDatingPref(datingPref.filter(item => item !== option));
    } else {
      setDatingPref([...datingPref, option]);
    }
  };
  const navigation = useNavigation();
  const handleNext = () => {
    if (datingPref.length > 0) {
      saveRegistrationProgress('DatingType', {datingPref});
    }
    navigation.navigate('LookingFor');
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
            <AntDesign name="hearto" size={26} color="black" />
          </View>
          <View
            style={{
              width: 44,
              height: 44,
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
          Who are you looking to date?
        </Text>
        <Text style={{marginTop: 30, fontSize: 15, color: 'gray'}}>
          Select some niggas you like to bang (sex)
        </Text>

        <View style={{marginTop: 30, flexDirection: 'column', gap: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15, fontWeight: 500}}>Male</Text>
            <Pressable onPress={() => chooseOption('Male')}>
              <FontAwesome
                name="circle"
                size={26}
                color={datingPref.includes('Male') ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15, fontWeight: 500}}>Female</Text>
            <Pressable onPress={() => chooseOption('Female')}>
              <FontAwesome
                name="circle"
                size={26}
                color={datingPref.includes('Female') ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15, fontWeight: 500}}>Everyone</Text>
            <Pressable onPress={() => chooseOption('Everyone')}>
              <FontAwesome
                name="circle"
                size={26}
                color={datingPref.includes('Everyone') ? '#581845' : '#F0F0F0'}
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
            color={datingPref.length > 0 ? 'black' : '#F0F0F0'}
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
            color="#581845"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DatingType;

const styles = StyleSheet.create({});
