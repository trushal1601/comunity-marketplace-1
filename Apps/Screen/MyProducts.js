import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import LatestItem from '../Components/HomeScreen/LatestItem';
import { useNavigation } from '@react-navigation/native';

const MyProducts = () => {
    const db = getFirestore(app);
    const { user } = useUser();
    const [productList, setProductList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        if (user) {
            getUserPost();
        }
    }, [user]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUserPost();
        });
        return unsubscribe;
    }, [navigation]);

    const getUserPost = async () => {
        setProductList([]);
        const q = query(collection(db, 'UserPost'), where('userEmail', '==', user.primaryEmailAddress.emailAddress));
        const snapshot = await getDocs(q);
        const newProductList = [];
        snapshot.forEach(doc => {
            // console.log(doc.data());
            newProductList.push(doc.data());
        });
        setProductList(newProductList);
    };

    return (
        <View>
            <LatestItem latestItemList={productList} />
        </View>
    );
};

export default MyProducts;
