import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native'
import React from 'react';
import Login from './Apps/Screen/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Apps/Navigators/TabNavigation';
import * as SecureStore from 'expo-secure-store';
// import { styled } from 'nativewind';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
const App = () => {
  return (
    <ClerkProvider 
    tokenCache={tokenCache}
    publishableKey='pk_test_ZW5oYW5jZWQtY2F0dGxlLTk5LmNsZXJrLmFjY291bnRzLmRldiQ'>
   <View className="flex-1  bg-white">
      
      <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
        <Login/>
        </SignedOut>
      <StatusBar style="auto" />
    </View>
    </ClerkProvider>
  )
}

export default App