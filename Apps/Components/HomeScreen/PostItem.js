import { View, Text,TouchableOpacity ,Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const PostItem = ({item}) => {

    const navigation=useNavigation();
  return (
    
      <TouchableOpacity className='flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200' onPress={()=>navigation.push('ProductDetail',
        {
          product:item
        }
      )}>
         <Image source={{uri:item.image}} className='h-[140px] w-full rounded-lg border-[1px]'/>
         <View>
          <Text className='text-[15px] font-bold mt-2'>{item.title}</Text>
          <Text className='text-[20px] font-bold text-blue-500'>₹ {item.price}</Text>
          <Text className='text-blue-500 bg-blue-200 p-[2px] px-2 text-[10px] w-[70px] text-center mt-1 rounded-full'>{item.category}</Text>
          </View>
          </TouchableOpacity>

  )
}

export default PostItem