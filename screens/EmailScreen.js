/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, SafeAreaView, View, TextInput,TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const EmailScreen = () => {
  const  navigation = useNavigation();
  const {email, setEmail} = useState('');
  const handleNext = () => {
    navigation.navigate('Password');
  }
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
            <Fontisto name="email" size={26} color="black" />
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
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: 15,
            color: 'black',
          }}>
          Provide a valid email
        </Text>
        <Text style={{marginTop: 10, fontSize: 15, color: 'gray'}}>
          Email verification helps us keeps the account secure
        </Text>
        <TextInput
          autoFocus={true}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Enter your email"
          placeholderTextColor={'#BEBEBE'}
          style={{
            width: 340,
            marginVertical: 10,
            marginTop: 20,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            color: 'black',
            fontSize: email ? 22 : 22,
          }}
        />

        <Text style={{color: 'gray', fontSize: 15, marginTop: 7}}>
          Note: You will be asked to verify your email
        </Text>
        <TouchableOpacity onPress={handleNext} activeOpacity={0.8} style={{marginTop:30, marginLeft:'auto'}}>
          <MaterialCommunityIcons
          style={{alignSelf:'center', marginTop:20}}
            name="arrow-right-circle"
            size={45}
            color="#581845"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({});
