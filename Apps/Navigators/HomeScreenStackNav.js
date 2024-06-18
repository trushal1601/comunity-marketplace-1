import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screen/Home';
import ItemList from '../Screen/ItemList';
import ProductDetail from '../Screen/ProductDetail';

const Stack = createStackNavigator();
const HomeScreenStackNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name='home' component={Home}/>
        <Stack.Screen options={({ route }) => ({ title: route.params.category,
            headerStyle:{
                backgroundColor:'#3b82f6'
            },
            headerTintColor:'#fff'
         })} name='ItemList' component={ItemList}/>
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

export default HomeScreenStackNav