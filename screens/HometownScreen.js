/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';

const HometownScreen = () => {
  const [hometown, setHomeTown] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('Hometown').then(progressData => {
      if (progressData) {
        setHomeTown(progressData.hometown || '');
      }
    });
  }, []);
  const handleNext = () => {
    if (hometown.trim() !== '') {
      saveRegistrationProgress('Hometown', {hometown});
    }
    navigation.navigate('Photos');
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
            <Octicons name="home" size={26} color="black" />
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
          Where's your hometown?
        </Text>
        <TextInput
          autoFocus={true}
          value={hometown}
          onChangeText={text => setHomeTown(text)}
          placeholder="HomeTown"
          placeholderTextColor={'#BEBEBE'}
          style={{
            width: 340,
            marginVertical: 10,
            marginTop: 20,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            color: 'black',
            fontSize: hometown ? 22 : 22,
          }}
        />

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

export default HometownScreen;

const styles = StyleSheet.create({});
