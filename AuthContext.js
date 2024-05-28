/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {createContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const Authprovider = ({children}) => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const userToken = await AsyncStorage.getItem('token');
      setToken(userToken);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, [token]);

  return (
    <AuthContext.Provider value={{token, isLoading, setToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export {Authprovider, AuthContext};
