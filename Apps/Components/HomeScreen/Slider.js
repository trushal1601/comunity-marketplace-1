import {Image, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Slider = ({sliderList}) => {
  return (
    <View className='mt-5'>
        <FlatList
            data={sliderList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>(
                <View>
                    <Image source={{uri:item.url}} className='h-[150px] w-[300px] object-contain rounded-lg mr-3' />
                </View>
            )}
        />
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({})