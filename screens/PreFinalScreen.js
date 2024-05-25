/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, SafeAreaView, Pressable} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';


const PreFinalScreen = () => {
  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 80}}>
        <Text
          style={{
            fontSize: 35,
            fontStyle: 'normal',

            marginLeft: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          You're all set!
        </Text>
        <Text
          style={{
            fontSize: 35,
            fontStyle: 'normal',

            marginLeft: 20,
            fontWeight: 'bold',
            color: 'black',
            marginTop: 10,
          }}>
          Setting up your profile for you
        </Text>

        <View style={styles.container}>
          <View style={styles.animationContainer}>
            <LottieView
              style={styles.animation}
              source={require('../assets/love2.json')}
              autoPlay
              loop={true}
              speed={0.7}
            />
          </View>
        </View>
      </View>

      <Pressable


        style={{backgroundColor: 'black', padding: 15, marginTop: 'auto'}}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 15,
          }}>
          Finish Registering
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PreFinalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  animationContainer: {
    width: 250, // Adjust the width as needed
    height: 250, // Adjust the height as needed
    alignSelf: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});