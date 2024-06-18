// import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
// import React, { useEffect } from 'react'
// import { useUser } from '@clerk/clerk-expo'
// import diary from '../../assets/images/myproduct.png';
// import explore from '../../assets/images/explore.png';
// import home from '../../assets/images/home.png';
// import logout from '../../assets/images/logout.png';


// const ProfileScreen = () => {
//     const {user}=useUser();
//     useEffect(()=>{
//       console.log(menuList);
//     })
//     const menuList=[
//       {
//         id:1,
//         name:'My Products',
//         icon:diary
//       },
//       {
//         id:2,
//         name:'Explore',
//         icon:explore
//       },
//       {
//         id:3,
//         name:'Home',
//         icon:home
//       },
//       {
//         id:4,
//         name:'Log out',
//         icon:logout
//       },
//     ]
//   return (
//     <View className='p-5'>
//     <View className='items-center mt-14'>
//       <Image source={{uri:user.imageUrl}} className='h-[80px] w-[80px] rounded-full'/>
//       <Text className='font-bold text-[25px] mt-2'>{user.fullName}</Text>
//       <Text className='text-[18px] mt-2 text-gray-500'>{user.primaryEmailAddress.emailAddress}</Text>
//     </View>
//     <FlatList
//      data={menuList}
//      renderItem={({item,index})=>(
//       <TouchableOpacity>
//        <Image source={item.icon} className='h-10 w-10'/>
//        <Text>{index}</Text>
//       </TouchableOpacity>
//      )}
//      keyExtractor={item => item.id.toString()}
//      />
//     </View>
//   )
// }

// export default ProfileScreen
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import diary from '../../assets/images/myproduct.png';
import explore from '../../assets/images/explore.png';
import home from '../../assets/images/home.png';
import logout from '../../assets/images/logout.png';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const {isLoaded,signOut}=useAuth();

  useEffect(() => {
    // console.log(menuList);
  }, []);

  const menuList = [
    {
      id: 1,
      name: 'My Products',
      icon: diary,
      path:'MyProducts'
    },
    {
      id: 2,
      name: 'Explore',
      icon: explore,
      path:'Explore'
    },
    {
      id: 3,
      name: 'Home',
      icon: home,
      path:'Home'
    },
    {
      id: 4,
      name: 'Log out',
      icon: logout,
    },
  ];

  const onMenuPress=(item)=>{
    if(item.name=='Log out'){
      signOut()
      return;
    }
      item.path?navigation.navigate(item.path):null
  }

  const renderItem = ({ item }) => {
    // console.log('Rendering item:', item); // Debug log for item
    // console.log('Image source:', item.icon);
    return (
      <TouchableOpacity onPress={()=>onMenuPress(item)} key={item.id} className='flex-1 p-3 border-[1px] items-center rounded-lg border-blue-400 bg-blue-50 mx-2 mt-4'>
        <Image source={item.icon} className='h-[50px] w-[50px]' />
        <Text className='text-[12px] mt-2 text-blue-700'>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
        <Text style={styles.userName}>{user.fullName}</Text>
        <Text style={styles.userEmail}>{user.primaryEmailAddress.emailAddress}</Text>
      </View>
      <FlatList
        data={menuList}
        numColumns={3}
        style={{marginTop:20}}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'white'
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 56,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 8,
  },
  userEmail: {
    fontSize: 18,
    marginTop: 8,
    color: 'gray',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuIcon: {
    height: 40,
    width: 40,
    marginRight: 16,
  },
  menuText: {
    fontSize: 18,
  },
});

export default ProfileScreen;
