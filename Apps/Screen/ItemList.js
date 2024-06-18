import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useEffect } from 'react';
import { collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItem from '../Components/HomeScreen/LatestItem';

const ItemList = () => {
    
    const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { params } = useRoute();
  const db = getFirestore(app);

  
   useEffect(()=>{
      
        params&&getItemListByCategory();
    },[params])

  const getItemListByCategory = async () => {
    setLoading(true); 
    setItemList([]);  

    
      const q = query(collection(db, 'UserPost'), where('category', '==', params.category));
      const snapshot = await getDocs(q);
      const items = [];
      snapshot.forEach(doc => {
        items.push(doc.data());
      });
      setItemList(items);
      setLoading(false);
    
  };

  return (
    <View className='p-2'>
  
      {loading ? (
  <ActivityIndicator className='mt-64' color='#3b82fg' size='large' />
) : (
  itemList.length > 0 ? (
    <LatestItem latestItemList={itemList} heading={''} />
  ) : (
    <Text className='p-5 text-[20px] text-center text-gray-400 mt-64'>
      No Post Found
    </Text>
  )
)}
    </View>
  )
}

export default ItemList

const styles = StyleSheet.create({})