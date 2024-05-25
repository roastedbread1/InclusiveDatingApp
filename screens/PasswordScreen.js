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
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';
const PasswordScreen = () => {
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleNext = () => {
    if (password.trim() !== '') {
      saveRegistrationProgress('Password', {password});
    }
    navigation.navigate('Birth');
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
            <AntDesign name="lock" size={26} color="black" />
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
          Please set a password
        </Text>
        <TextInput
          autoFocus={true}
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Enter your password"
          placeholderTextColor={'#BEBEBE'}
          style={{
            width: 340,
            marginVertical: 10,
            marginTop: 20,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            color: 'black',
            fontSize: password ? 22 : 22,
          }}
        />
        {/* <Text style={{color: 'gray', fontSize: 15, marginTop: 7}}></Text> */}
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

export default PasswordScreen;

const styles = StyleSheet.create({});
