import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Share, Alert } from 'react-native'
import React, { useEffect ,useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

const ProductDetail = ({navigation}) => {
    const {params}=useRoute();
    const [product,setProduct]=useState([]);
    const {user}=useUser();
    const db=getFirestore(app);
    const nav=useNavigation();
    useEffect(()=>{
        // console.log()
        params && setProduct(params.product);
        shareButton();
    },[params,navigation])

    const shareButton=()=>{
        navigation.setOptions({
            headerRight: () => (
               
                <Ionicons name="share-social-sharp" size={24} color="white" style={{marginRight:15}} onPress={()=>shareProduct()}/>
                
            ),
          });
    }

    const shareProduct=async()=>{
        const content={
            message:product?.title+"\n"+product?.desc
        }
        Share.share(content).then(resp=>{
            console.log(resp);
        },(error)=>{console.log(error);});
    }

    const sendEmailMessage=()=>{
        const subject='Regarding '+product.title;
        const body='Hi '+product.userName+"\n"+"I am interested in this Product";
        Linking.openURL('mailto:'+product.userEmail+"?subject="+subject+"&body="+body);
    }
    const deleteUserpost=()=>{
                Alert.alert('Do You Want to Delete?','Are You want to Delete this Post?',[
                   {
                    text:'Yes',
                    onPress:()=>deleteFromiFirestore()
                   },
                   {
                    text:'Cancel',
                    onPress:()=>console.log('Cancel Pressed'),
                    style:'cancel'
                   }
                ])
    }

    const deleteFromiFirestore=async()=>{
            // console.log("deleted");
            const q=query(collection(db,'UserPost'),where('title','==',product.title));
            const snapshot=await getDocs(q);
            snapshot.forEach(doc=>{
                deleteDoc(doc.ref).then(resp=>{
                    console.log("Deleetd Doc...");
                    nav.goBack();
                })
            })
    }
  return (
    <ScrollView className='bg-white'>
      {/* <Text>{params.product.title}</Text> */}
      <Image source={{uri:product.image}} className='h-[320px] w-full'/>
      
      <View className='p-3'>
             <Text className='text-[24px] font-bold'>{product.title}</Text>
             {/* <Text className='text-[25px]'>{product.price}</Text> */}
             {/* <View className='items-baseline'><Text className='p-1 px-2 rounded-full mt-2 bg-blue-200 text-blue-500 '>{product.category}</Text></View> */}
             <Text className='text-[25px]  font-bold text-blue-500 mt-3'>₹ {product.price}</Text>
             <Text className='mt-3 font-bold text-[20px]'>Description</Text>
             <Text className='text-[17px] text-gray-500'>{product.desc}</Text>
      </View>
     <View className='p-3 flex-row items-center gap-3 bg-blue-100 mt-0' >
        <Image source={{uri:params.product.userImage}} className='h-10 w-10 rounded-full'/>   
        <View>
            <Text className='font-bold text-[18px]'>{product.userName}</Text>
            <Text className='text-gray-500'>{product.userEmail}</Text>
        </View>
     </View>
     {user?.primaryEmailAddress.emailAddress===product.userEmail?
     <TouchableOpacity className='bg-red-500 m-2 rounded-full p-4' 
     onPress={()=>deleteUserpost()}
>
 <Text className='text-center text-white'>Delete Post</Text>
</TouchableOpacity>
     :
        <TouchableOpacity className='bg-blue-500 m-2 rounded-full p-4' 
                onPress={()=>sendEmailMessage()}
        >
            <Text className='text-center text-white'>Send Message</Text>
        </TouchableOpacity>
        }

    </ScrollView>
  )
}

export default ProductDetail