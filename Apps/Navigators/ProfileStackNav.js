import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screen/ProfileScreen';
import MyProducts from '../Screen/MyProducts';
import ProductDetail from '../Screen/ProductDetail';

const Stack = createStackNavigator();
const ProfileStackNav = () => {
  return (
   <Stack.Navigator>
    <Stack.Screen name='ProfileScreen' component={ProfileScreen} options={{headerShown:false}}/>
    <Stack.Screen name='MyProducts' component={MyProducts} options={{ 
            headerStyle:{
                backgroundColor:'#3b82f6'
            },
            headerTintColor:'#fff',
            headerTitle:'My Products'
         } }/>
         
         <Stack.Screen name='ProductDetail' component={ProductDetail} options={{ 
            headerStyle:{
                backgroundColor:'#3b82f6'
            },
            headerTintColor:'#fff',
            headerTitle:'My Products'
         } }/>
   </Stack.Navigator>
  )
}

export default ProfileStackNav