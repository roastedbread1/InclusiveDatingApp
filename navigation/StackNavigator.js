/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LikesScreen from '../screens/LikesScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import BasicInfo from '../screens/BasicInfo';
import NameScreen from '../screens/NameScreen';
import EmailScreen from '../screens/EmailScreen';
import PasswordScreen from '../screens/PasswordScreen';
import BirthScreen from '../screens/BirthScreen';
import LocationScreen from '../screens/LocationScreen';
import GenderScreen from '../screens/GenderScreen';
import TypeScreen from '../screens/TypeScreen';
import DatingType from '../screens/DatingType';
import Lookingfor from '../screens/Lookingfor';
import HometownScreen from '../screens/HometownScreen';
import PhotoScreen from '../screens/PhotoScreen';
import PromptScreen from '../screens/PromptScreen';
import ShowPromptsScreen from '../screens/ShowPromptsScreen';
import PreFinalScreen from '../screens/PreFinalScreen';
import {AuthContext} from '../AuthContext';
import SendLikeScreen from '../screens/SendLikeScreen';
import LoginScreen from '../screens/LoginScreen';
import HandleLikeScreen from '../screens/HandleLikeScreen';
import ChatRoom from '../screens/ChatRoom';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const {isLoading, token} = useContext(AuthContext);

  function BottomTab() {
    return (
      <Tab.Navigator
        screenOptions={() => ({
          tabBarShowLabel: false,
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarStyle: {backgroundColor: '#101010'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <MaterialCommunityIcons
                  name="account-heart"
                  size={32}
                  color={'white'}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-heart"
                  size={32}
                  color={'#989898'}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Likes"
          component={LikesScreen}
          options={{
            tabBarStyle: {backgroundColor: '#101010'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Entypo name="heart" size={28} color={'white'} />
              ) : (
                <Entypo name="heart" size={28} color={'#989898'} />
              ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarStyle: {backgroundColor: '#101010'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="chatbox" size={26} color={'white'} />
              ) : (
                <Ionicons name="chatbox" size={26} color={'#989898'} />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarStyle: {backgroundColor: '#101010'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="person" size={26} color={'white'} />
              ) : (
                <Ionicons name="person" size={26} color={'#989898'} />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Basic"
          component={BasicInfo}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Name"
          component={NameScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Email"
          component={EmailScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Password"
          component={PasswordScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Birth"
          component={BirthScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Location"
          component={LocationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Gender"
          component={GenderScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Type"
          component={TypeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dating"
          component={DatingType}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LookingFor"
          component={Lookingfor}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Hometown"
          component={HometownScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Photos"
          component={PhotoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Prompt"
          component={PromptScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShowPrompt"
          component={ShowPromptsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PreFinal"
          component={PreFinalScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  function MainStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTab}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SendLike"
          component={SendLikeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="HandleLike"
          component={HandleLikeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {token === null || token === '' ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
