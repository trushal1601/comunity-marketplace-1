import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Categories = ({categoryList}) => {

  const navigation=useNavigation();
  return (
    <View className='mt-3'>
      <Text className='font-bold text-[20px]'>Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({item,index})=>(
          <TouchableOpacity className='flex-1 items-center justify-center p-2 border-[1px]
           border-blue-200 m-1 h-[80px] rounded-lg bg-blue-50 ' onPress={()=>navigation.navigate('ItemList',{
            category:item.name
           })}>
            <Image source={{uri:item.icon}} className='h-10 w-10'/>
            <Text className='text-[11px] mt-1'>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({})