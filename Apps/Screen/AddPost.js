// import { View, Text, TextInput ,StyleSheet, Button, TouchableOpacity,Image, ToastAndroid, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView} from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { app, db } from '../../firebaseConfig';
// import { addDoc, collection, getDocs } from 'firebase/firestore';
// import { Formik } from 'formik';
// import {Picker} from '@react-native-picker/picker'
// import * as ImagePicker from 'expo-image-picker';
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// import { useUser } from '@clerk/clerk-expo';

// const AddPost = () => {
//   const [image, setImage] = useState(null);
//   const [categoryList,setCategoryList]=useState([]);
//   const [loading,setLoading]=useState(false);
//   const {user}=useUser();
//   const storage = getStorage();
//   useEffect(() => {
//     const getCategoryList = async () => {
//       setCategoryList([]);
//       try {
//         const querySnapshot = await getDocs(collection(db, 'Category'));
//         querySnapshot.forEach((doc) => {
//           // console.log("Document data:", doc.data());
//           setCategoryList(categoryList=>[...categoryList,doc.data()])
//         });
//       } catch (error) {
//         console.error("Error fetching category list: ", error);
//       }
//     };

//     getCategoryList();
//   }, []); 
//   const pickImage = async () => {
   
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 4],
//       quality: 1,
//     });

//     // console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const onSubmitMethod=async(value, { resetForm })=>{
//     setLoading(true);
//     // convert Uri to blob file
//     const resp=await fetch(image);
//     const blob=await resp.blob();

//     const storageRef = ref(storage, 'communityPost/'+Date.now()+".jpg");

//     uploadBytes(storageRef, blob).then((snapshot) => {
//       // console.log('Uploaded a blob or file!');
//     }).then((resp)=>{
//       getDownloadURL(storageRef).then(async(downloadUrl)=>{
//         // console.log(downloadUrl );
//         value.image=downloadUrl;
//         value.userName=user.fullName;
//         value.userEmail=user.primaryEmailAddress.emailAddress;
//         value.userImage=user.imageUrl;

//         const docRef=await addDoc(collection(db,"UserPost"),value)
//         if(docRef.id)
//           {
//             setLoading(false);
//             resetForm(); 
//             setImage(null); 
//             Alert.alert('Success!!!','Post Added Successfully.')
//           }
//       })
//     });
//   }

//     return (
//       <KeyboardAvoidingView>
//     <ScrollView className='p-10 bg-white'>
//       <Text className='text-[27px] font-bold'>Add New Post</Text>
//       <Text className='text-[12px] text-gray-500 mb-7'>Create New Post and Start Selling</Text>
//       <TouchableOpacity onPress={pickImage}>
//         {image?
//       <Image source={{uri:image}} style={{height:100,width:100,borderRadius:15}}/>
//       : 
//       <Image source={require('./../../assets/images/placeholder.png')} style={{height:100,width:100,borderRadius:15}}/>

//       }
//       </TouchableOpacity>
//       <Formik initialValues={{title:'',desc:'',category:'',address:'',price:'',image:'',userName:'',userEmail:'',userImage:'',createdAt:Date.now()}}
//           onSubmit={(value, actions) => onSubmitMethod(value, actions)}
          
//       >
//           {({handleChange,handleBlur,handleSubmit,values,errors})=>(
//             <View>
//               <TextInput 
//                   style={styles.input}
//                   placeholder='Title'
//                   value={values.title}
//                   onChangeText={handleChange('title')}
//               />
//                <TextInput 
//                   style={styles.input}
//                   placeholder='Description'
//                   value={values.desc}
//                   numberOfLines={5}
//                   onChangeText={handleChange('desc')}
//               />
//                <TextInput 
//                   style={styles.input}
//                   placeholder='Price'
//                   value={values.price}
//                   keyboardType='number-pad'
//                   onChangeText={handleChange('price')}
//               />
//               <TextInput 
//                   style={styles.input}
//                   placeholder='Address'
//                   value={values.address}
//                   onChangeText={handleChange('address')}
//               />
//               <View style={{borderWidth:1,borderRadius:10,marginTop:15}}>
//              <Picker
//              style={styles.input}
//              selectedValue={values.category}
//              onValueChange={handleChange('category')}
//              >
//               {categoryList&&categoryList.map((item,index)=>(
//                 <Picker.Item key={index} label={item.name} value={item.name}/>
//               ))}
//              </Picker>
//              </View>
//              <TouchableOpacity className='p-4 bg-blue-500 rounded-full mt-10'
//               style={{backgroundColor:loading?'#ccc':'#007BFF'}}
//               disabled={loading}
//              onPress={handleSubmit}>
//               {loading?
//                 <ActivityIndicator color='#fff'/>  
//                 :
//               <Text className='text-white text-center text-[16px]'>Submit</Text>

//             }
//              </TouchableOpacity>
              
//             </View>
//           )}
//       </Formik>
//     </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default AddPost;
// const styles = StyleSheet.create({
//   input:{
//         borderWidth:1,
//         borderRadius:10,
//         padding:10,
//         paddingTop:15,
//         paddingHorizontal:17,
//         fontSize:17,
//         marginTop:10,
//         marginBottom:5,
//         textAlignVertical:'top'
//   }
// })
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import * as Yup from 'yup';
import { useUser } from '@clerk/clerk-expo';
import { app, db } from '../../firebaseConfig';

const AddPost = () => {
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const storage = getStorage();

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoryList([]);
      try {
        const querySnapshot = await getDocs(collection(db, 'Category'));
        querySnapshot.forEach((doc) => {
          setCategoryList(prevList => [...prevList, doc.data()]);
        });
      } catch (error) {
        console.error('Error fetching category list: ', error);
      }
    };

    fetchCategories();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, `communityPost/${Date.now()}.jpg`);

      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);

      const postValues = {
        ...values,
        image: downloadUrl,
        userName: user.fullName,
        userEmail: user.primaryEmailAddress.emailAddress,
        userImage: user.imageUrl,
        createdAt: Date.now(),
      };

      const docRef = await addDoc(collection(db, 'UserPost'), postValues);
      if (docRef.id) {
        Alert.alert('Success!!!', 'Post Added Successfully.');
        resetForm();
        setImage(null);
      }
    } catch (error) {
      console.error('Error adding post: ', error);
      Alert.alert('Error', 'An error occurred while adding the post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    desc: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    address: Yup.string().required('Address is required'),
    category: Yup.string().required('Category is required'),
  });

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 ,backgroundColor:'white',padding:10}}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <Text style={styles.header}>Add New Post</Text>
        <Text style={styles.subHeader}>Create New Post and Start Selling</Text>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Image
            source={image ? { uri: image } : require('./../../assets/images/placeholder.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Formik
          initialValues={{ title: '', desc: '', category: '', address: '', price: '', image: '', userName: '', userEmail: '', userImage: '', createdAt: Date.now() }}
          onSubmit={onSubmitMethod}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
              />
              {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                value={values.desc}
                onChangeText={handleChange('desc')}
                onBlur={handleBlur('desc')}
                multiline
              />
              {touched.desc && errors.desc && <Text style={styles.errorText}>{errors.desc}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Price"
                value={values.price}
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                keyboardType="numeric"
              />
              {touched.price && errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Address"
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
              />
              {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={values.category}
                  onValueChange={handleChange('category')}
                >
                  <Picker.Item label="Select a category" value="" />
                  {categoryList.map((item, index) => (
                    <Picker.Item key={index} label={item.name} value={item.name} />
                  ))}
                </Picker>
              </View>
              {touched.category && errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: loading ? '#ccc' : '#007BFF' }]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Submit</Text>}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 27,
    fontWeight: 'bold',
    marginTop:10
  },
  subHeader: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 17,
    marginVertical: 10,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  submitButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default AddPost;
