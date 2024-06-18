import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../Screen/ExploreScreen';
import ProductDetail from '../Screen/ProductDetail';


const Stack = createStackNavigator();

const ExploreScreenStackNav = () => {
  return (
   <Stack.Navigator>
    <Stack.Screen name='ExploreScreen' component={ExploreScreen}
        options={{headerShown:false}}
    />
    <Stack.Screen options={{ 
            headerStyle:{
                backgroundColor:'#3b82f6'
            },
            headerTintColor:'#fff',
            headerTitle:'Detail'
         } }name='ProductDetail' component={ProductDetail}/>
   </Stack.Navigator>
  )
}

export default ExploreScreenStackNav