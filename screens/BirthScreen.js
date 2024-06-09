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
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';
import {BooleanSchema, date} from 'yup';
const BirthScreen = () => {
  const navigation = useNavigation();
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleDayChange = text => {
    setDay(text);
    if (text.length === 2) {
      monthRef.current.focus();
    }
  };

  const handleMonthChange = text => {
    setMonth(text);
    if (text.length === 2) {
      yearRef.current.focus();
    }
  };
  const handleYearChange = text => {
    setYear(text);
  };

  useEffect(() => {
    getRegistrationProgress('Birth').then(progressData => {
      if (progressData) {
        const {dateOfBirth} = progressData;
        const [dayValue, monthValue, yearValue] = dateOfBirth.split('/');
        setDay(dayValue);
        setMonth(monthValue);
        setYear(yearValue);
      }
    });
  }, []);
  const handleNext = () => {
    if (day.trim() !== '' && month.trim() !== '' && year.trim() !== '') {
      const dateOfBirth = `${day}/${month}/${year}`;
      saveRegistrationProgress('Birth', {dateOfBirth});
    }

    navigation.navigate('Location');
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
            <MaterialCommunityIcons
              name="cake-variant-outline"
              size={26}
              color="black"
            />
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
          Enter your date of birth
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 80,
            justifyContent: 'center',
          }}>
          <TextInput
            autoFocus={true}
            placeholder="DD"
            maxLength={2}
            keyboardType="numeric"
            value={day}
            onChangeText={handleDayChange}
            style={{
              borderBottomWidth: 1,
              borderColor: 'black',
              borderBottomColor: 'black',
              padding: 10,
              width: 60,
              fontSize: day ? 22 : 22,
              color: 'black',
              marginTop: 20,
            }}
          />

          <TextInput
            ref={monthRef}
            autoFocus={true}
            placeholder="MM"
            maxLength={2}
            keyboardType="numeric"
            value={month}
            onChangeText={handleMonthChange}
            style={{
              borderBottomWidth: 1,
              borderColor: 'black',
              borderBottomColor: 'black',
              padding: 10,
              width: 60,
              fontSize: month ? 22 : 22,
              color: 'black',
              marginTop: 20,
            }}
          />

          <TextInput
            ref={yearRef}
            autoFocus={true}
            placeholder="YYYY"
            maxLength={4}
            keyboardType="numeric"
            value={year}
            onChangeText={handleYearChange}
            style={{
              borderBottomWidth: 1,
              borderColor: 'black',
              borderBottomColor: 'black',
              padding: 10,
              width: 80,
              fontSize: year ? 22 : 22,
              color: 'black',
              marginTop: 20,
            }}
          />
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

export default BirthScreen;

const styles = StyleSheet.create({});
