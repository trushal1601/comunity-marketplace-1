import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screen/Home';
import ExploreScreen from '../Screen/ExploreScreen';
import AddPost from '../Screen/AddPost';
import ProfileScreen from '../Screen/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenStackNav from './HomeScreenStackNav';
import ExploreScreenStackNav from './ExploreScreenStackNav';
import ProfileStackNav from './ProfileStackNav';

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false
    }}>
        <Tab.Screen name='Home' component={HomeScreenStackNav} options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginBottom:3}}>Home</Text>
            ),
            tabBarIcon:({color,size})=>(
                <Ionicons name="home" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name='Explore' component={ExploreScreenStackNav} options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginBottom:3}}>Explore</Text>
            ),
            tabBarIcon:({color,size})=>(
                <Ionicons name="search" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name='AddPost' component={AddPost} options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginBottom:3}}>Add Post</Text>
            ),
            tabBarIcon:({color,size})=>(
                <Ionicons name="camera" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name='Profile' component={ProfileStackNav} options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginBottom:3}}>Profile</Text>
            ),
            tabBarIcon:({color,size})=>(
                <Ionicons name="person-circle" size={size} color={color} />
            )
        }}/>
    </Tab.Navigator>
  )
}

export default TabNavigation