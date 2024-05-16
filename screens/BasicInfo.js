/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, SafeAreaView, Pressable} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const BasicInfo = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 80}}>
        <Text
          style={{
            fontSize: 35,
            fontStyle: 'normal',

            marginLeft: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Welcome!
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
          Someone's special is waiting for your
        </Text>

        <View style={styles.container}>
          <View style={styles.animationContainer}>
            <LottieView
              style={styles.animation}
              source={require('../assets/couple.json')}
              autoPlay
              loop={true}
              speed={0.7}
            />
          </View>
        </View>
      </View>

      <Pressable

      onPress={() => navigation.navigate('Name')}
        style={{backgroundColor: 'black', padding: 15, marginTop: 'auto'}}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 15,
          }}>
          Register or Login
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default BasicInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
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
