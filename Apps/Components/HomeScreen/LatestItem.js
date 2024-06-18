// import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect } from 'react'
// import PostItem from './PostItem'

// const LatestItem = ({latestItemList,heading}) => {

//   useEffect(() => {
    
//   }, [latestItemList]);
  
//   return (
//     <View className='mt-3'>
//       <Text className='font-bold text-[20px]'>{heading}</Text>
//       <FlatList
//       data={latestItemList}
//       numColumns={2}
//       contentContainerStyle={{paddingBottom:30}}
//       renderItem={({item,index})=>(
//         <PostItem item={item}/>
//       )}
//       />
//     </View>
//   )
// }

// export default LatestItem

// const styles = StyleSheet.create({})
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PostItem from './PostItem';

const LatestItem = ({ latestItemList }) => {
    useEffect(() => {
    
  }, [latestItemList]);
  return (
    <View style={styles.container}>
      <FlatList
        data={latestItemList}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <PostItem item={item} />}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default LatestItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
  },
  flatListContainer: {
    paddingBottom: 30,
  },
});
