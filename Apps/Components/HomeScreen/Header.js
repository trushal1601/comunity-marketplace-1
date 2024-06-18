import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import {useUser} from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
    const{user}=useUser();
  return (
    <View>
    <View className='flex-row items-center gap-2'>
     <Image source={{uri:user.imageUrl}} className="h-12 w-12 rounded-full"/>
     <View>
        <Text className='text-[16px]'>Welcome,</Text>
        <Text className='text-[20px] font-bold'>{user.fullName}</Text>
     </View>
    </View>
    <View className='p-[9px] px-5 flex-row items-center bg-blue-50 mt-5 rounded-full border-blue-300 border-[1px]'>
    <Ionicons name="search" size={24} color="gray" />
        <TextInput placeholder='Search' className='ml-2 text-[16px]'/>
        
    </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})