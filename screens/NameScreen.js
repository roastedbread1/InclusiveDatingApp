/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';

const NameScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Name').then(progressData => {
      if (progressData) {
        setFirstName(progressData.firstName || '');
        setLastName(progressData.lastName || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (firstName.trim() !== '') {
      saveRegistrationProgress('Name', {firstName, lastName});
    }
    navigation.navigate('Email');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Text style={{marginTop: 50, textAlign: 'center', color: 'grey'}}>
        NO BACKGROUND CHECKS ARE CONDUCTED
      </Text>

      <View style={{marginTop: 30, marginHorizontal: 20}}>
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
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              size={26}
              color="black"
            />
          </View>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 2,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 20,
            }}>
            <Entypo name="dots-three-horizontal" size={26} color="black" />
          </View>

          {/* <Image
            style={{width: 100, height: 40, opacity:1}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          /> */}
        </View>

        <View style={{marginTop: 30}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              fontFamily: 'GeezaPro-Bold',
              color: 'black',
            }}>
            Enter name
          </Text>
          <TextInput
            autoFocus={true}
            value={firstName}
            onChangeText={text => setFirstName(text)}
            placeholder="First Name (required)"
            placeholderTextColor={'#BEBEBE'}
            style={{
              width: 340,
              marginVertical: 10,
              marginTop: 25,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingBottom: 10,
              color: 'black',
              fontSize: firstName ? 22 : 22,
            }}
          />

          <TextInput
            autoFocus={true}
            value={lastName}
            onChangeText={text => setLastName(text)}
            placeholder="Last Name (optional)"
            placeholderTextColor={'#BEBEBE'}
            style={{
              width: 340,
              marginVertical: 10,
              marginTop: 20,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingBottom: 10,
              color: 'black',
              fontSize: firstName ? 22 : 22,
            }}
          />

          <Text style={{fontSize: 15, color: 'gray', fontWeight: 500}}>
            Last name is optional
          </Text>
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

export default NameScreen;

const styles = StyleSheet.create({});
