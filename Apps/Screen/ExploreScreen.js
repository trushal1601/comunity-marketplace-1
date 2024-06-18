import { View, Text,  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import LatestItem from '../Components/HomeScreen/LatestItem'

const ExploreScreen = () => {

    const db=getFirestore(app);
    const [productList,setProductList]=useState([]);

    useEffect(() => {
      getAllProducts();
    }, [productList]);
  
  
    // const getAllProducts=async()=>{
    //   setProductList([]);
    //   const q=query(collection(db,'UserPost'),orderBy('createdAt','desc'));

    //   const snapshot=await getDocs(q);

    //   snapshot.forEach((doc)=>{
    //     // console.log(doc.data(),"yuiewfrh");
    //     setProductList(productList=>[...productList,doc.data()])
    //   })
    // }
    
    const getAllProducts = async () => {
      const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
  
      const products = [];
      snapshot.forEach((doc) => {
        products.push(doc.data());
      });
  
      setProductList(products);
    };
  return (   
    <View className='p-5 py-8'>
      <Text className='text-[30px] font-bold'>Explore More</Text>
      <LatestItem latestItemList={productList}/>
    </View>
  )
}

export default ExploreScreen