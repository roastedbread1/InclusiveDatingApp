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
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Lookingfor = () => {
  const navigation = useNavigation();
  const [lookingFor, setLookingFor] = useState('');
  useEffect(() => {
    getRegistrationProgress('LookingFor').then(progressData => {
      if (progressData) {
        setLookingFor(progressData.lookingFor || '');
      }
    });
  }, []);
  const handleNext = () => {
    if (lookingFor.trim() !== '') {
      saveRegistrationProgress('LookingFor', {lookingFor});
    }
    navigation.navigate('Hometown');
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
            <Foundation name="magnifying-glass" size={26} color="black" />
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
          What's your dating goal
        </Text>
        <View style={{marginTop: 30, flexDirection: 'column', gap: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15, fontWeight: 500}}>
              Long-term relationship
            </Text>
            <Pressable onPress={() => setLookingFor('Long-term relationship')}>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  lookingFor == 'Long-term relationship' ? '#581845' : '#F0F0F0'
                }
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
            <Text style={{fontSize: 15, fontWeight: 500}}>
              Long-term relationship open to short
            </Text>
            <Pressable
              onPress={() =>
                setLookingFor('Long-term relationship open to short')
              }>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  lookingFor == 'Long-term relationship open to short'
                    ? '#581845'
                    : '#F0F0F0'
                }
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
            <Text style={{fontSize: 15, fontWeight: 500}}>
              short-term relationship
            </Text>
            <Pressable onPress={() => setLookingFor('short-term relationship')}>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  lookingFor == 'short-term relationship'
                    ? '#581845'
                    : '#F0F0F0'
                }
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
            <Text style={{fontSize: 15, fontWeight: 500}}>
              short-term relationship open to long
            </Text>
            <Pressable
              onPress={() =>
                setLookingFor('short-term relationship open to long')
              }>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  lookingFor == 'short-term relationship open to long'
                    ? '#581845'
                    : '#F0F0F0'
                }
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
            <Text style={{fontSize: 15, fontWeight: 500}}>
              Figuring out my dating goals
            </Text>
            <Pressable
              onPress={() => setLookingFor('Figuring out my dating goals')}>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  lookingFor == 'Figuring out my dating goals'
                    ? '#581845'
                    : '#F0F0F0'
                }
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
            color={lookingFor.length > 0 ? 'black' : '#F0F0F0'}
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

export default Lookingfor;

const styles = StyleSheet.create({});
