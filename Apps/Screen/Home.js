// import { ScrollView, StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import Header from '../Components/HomeScreen/Header'
// import Slider from '../Components/HomeScreen/Slider'
// import Categories from '../Components/HomeScreen/Categories';
// import LatestItem from '../Components/HomeScreen/LatestItem';
// import {app} from '../../firebaseConfig';
// import { collection, getDocs, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';


// const Home = () => {

//   const db=getFirestore(app);
//   const [categoryList,setCategoryList]=useState([]);
//   const[sliderList,setSliderList]=useState([]);
//   const[latestItemList,setLatestItemList]=useState([]);
//     useEffect(()=>{
//       getSliders();
//       getCategoryList();
//       const unsubscribe = getLatestItemList();
//     return () => unsubscribe();
//     },[])
//   //used to get Slider For Home Screen
//   const getSliders=async()=>{
//     setSliderList([])
//     const querySnapshot = await getDocs(collection(db, "Sliders"));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   // console.log(doc.id, " => ", doc.data());
//   setSliderList(sliderList=>[...sliderList,doc.data()])
// });
//   }
//   const getCategoryList = async () => {
//     setCategoryList([]);
//     try {
//       const querySnapshot = await getDocs(collection(db, 'Category'));
//       querySnapshot.forEach((doc) => {
//         // console.log("Document data:", doc.data());
//         setCategoryList(categoryList=>[...categoryList,doc.data()])
//       });
//     } catch (error) {
//       console.error("Error fetching category list: ", error);
//     }
//   };
 
//   const getLatestItemList = () => {
//     const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
//     return onSnapshot(q, (querySnapshot) => {
//       const newLatestItemList = [];
//       querySnapshot.forEach((doc) => {
//         newLatestItemList.push(doc.data());
//       });
//       setLatestItemList(newLatestItemList);
//     });
//   };
//   return (
//     <View className="py-8 px-6 bg-white flex-1">
//      <Header/>
//      <Slider sliderList={sliderList}/>
//      <Categories categoryList={categoryList}/>
//      <LatestItem latestItemList={latestItemList} heading={'Latest Items'}/>
//     </View>
//   )
// }

// export default Home

// const styles = StyleSheet.create({})

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Header from '../Components/HomeScreen/Header';
import Slider from '../Components/HomeScreen/Slider';
import Categories from '../Components/HomeScreen/Categories';
import LatestItem from '../Components/HomeScreen/LatestItem';
import { app } from '../../firebaseConfig';
import { collection, getDocs, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';

const Home = () => {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const [sliderList, setSliderList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);

  useEffect(() => {
    getSliders();
    getCategoryList();
    const unsubscribe = getLatestItemList();
    return () => unsubscribe();
  }, []);

  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      setSliderList(sliderList => [...sliderList, doc.data()]);
    });
  };

  const getCategoryList = async () => {
    setCategoryList([]);
    try {
      const querySnapshot = await getDocs(collection(db, 'Category'));
      querySnapshot.forEach((doc) => {
        setCategoryList(categoryList => [...categoryList, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching category list: ", error);
    }
  };

  const getLatestItemList = () => {
    
    const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const newLatestItemList = [];
      querySnapshot.forEach((doc) => {
        newLatestItemList.push(doc.data());
      });
      setLatestItemList(newLatestItemList);
    });
  };

  console.log("data",latestItemList);
  return (
    <FlatList
      data={[{title:'abc',title:'xyz'}]}
      className='p-4 bg-white'
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <>
          <Header />
          <Slider sliderList={sliderList} />
          <Categories categoryList={categoryList} />
          <Text style={styles.heading}>Latest Items</Text>
        </>
      }
      renderItem={({ item }) => {
        return  <LatestItem latestItemList={latestItemList} heading={'Latest Items'}/>
      }}
    
      contentContainerStyle={styles.container}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    paddingHorizontal: 6,
    paddingTop: 20,
    backgroundColor: 'white',
    // flex:1,
    // backgroundColor:'red'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 3,
  },
});
