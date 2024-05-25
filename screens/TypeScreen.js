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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';

const TypeScreen = () => {
  const [type, setType] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('Type').then(progressData => {
      if (progressData) {
        setType(progressData.type || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (type.trim() !== '') {
      saveRegistrationProgress('Type', {type});
    }
    if (type.length > 0) {
    }
    navigation.navigate('Dating');
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
          What's your sexuality?
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: 'gray',
            marginTop: 15,
          }}>
          Downy users are matched based on sexuality
        </Text>
        <View style={{marginTop: 30, flexDirection: 'column', gap: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Straight</Text>
            <Pressable onPress={() => setType('Straight')}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Straight' ? '#581845' : '#F0F0F0'}
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
            <Text style={{fontSize: 15, fontWeight: '500'}}>Gay</Text>
            <Pressable onPress={() => setType('Gay')}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Gay' ? '#581845' : '#F0F0F0'}
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
            <Text style={{fontSize: 15, fontWeight: '500'}}>Bisexual</Text>
            <Pressable onPress={() => setType('Bisexual')}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Bisexual' ? '#581845' : '#F0F0F0'}
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
            color={type.length > 0 ? 'black' : '#F0F0F0'}
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

export default TypeScreen;

const styles = StyleSheet.create({});
