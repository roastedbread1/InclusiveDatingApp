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
  ScrollView,
  Image,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';

const PhotoScreen = () => {
  const navigation = useNavigation();
  const [imageUrls, setImageUrls] = useState(['', '', '', '', '', '']);
  const [imageUrl, setImageUrl] = useState('');

  const handleAddImage = () => {
    const index = imageUrls.findIndex(url => url === '');
    if (index !== -1 && imageUrl) {
      const updatedUrls = [...imageUrls];
      updatedUrls[index] = imageUrl;
      setImageUrls(updatedUrls);
      setImageUrl('');
    } else {
      Alert.alert('Error', 'Please enter a valid image URL');
    }
  };

  useEffect(() => {
    getRegistrationProgress('Photos').then(progressData => {
      if (progressData && progressData.imageUrls) {
        setImageUrls(progressData.imageUrls || ['', '', '', '', '', '']);
      }
    });
  }, []);

  const handleNext = () => {
    saveRegistrationProgress('Photos', {imageUrls});
    navigation.navigate('Prompt');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
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
              <MaterialIcons name="photo" size={26} color="black" />
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
            Upload your photos and videos
          </Text>
          <View style={{marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20,
              }}>
              {imageUrls.slice(0, 3).map((url, index) => (
                <Pressable
                  style={{
                    borderColor: '#581845',
                    borderWidth: url ? 0 : 2,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'dashed',
                    borderRadius: 10,
                    height: 100,
                  }}
                  key={index}>
                  {url ? (
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        resizeMode: 'cover',
                      }}
                      source={{uri: url}}
                    />
                  ) : (
                    <EvilIcons name="image" size={22} color="black" />
                  )}
                </Pressable>
              ))}
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20,
              }}>
              {imageUrls.slice(3, 6).map((url, index) => (
                <Pressable
                  style={{
                    borderColor: '#581845',
                    borderWidth: url ? 0 : 2,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'dashed',
                    borderRadius: 10,
                    height: 100,
                  }}
                  key={index}>
                  {url ? (
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        resizeMode: 'cover',
                      }}
                      source={{uri: url}}
                    />
                  ) : (
                    <EvilIcons name="image" size={22} color="black" />
                  )}
                </Pressable>
              ))}
            </View>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{color: 'gray', fontSize: 15}}>Drag to reorder</Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                color: '#581845',
                marginTop: 3,
              }}>
              Add four to six photos
            </Text>
          </View>

          <View style={{marginTop: 25}}>
            <Text>Add a photo of yourself</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 10,
                backgroundColor: '#DCDCDC',
              }}>
              <EvilIcons
                style={{marginLeft: 8}}
                name="image"
                size={22}
                color="black"
              />
              <TextInput
                value={imageUrl}
                onChangeText={text => setImageUrl(text)}
                style={{color: 'gray', marginVertical: 10, width: 300}}
                placeholder="Enter image url"
              />
            </View>
            <Button onPress={handleAddImage} title="Add Image" />
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({});
