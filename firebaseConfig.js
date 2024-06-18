// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGrhA39SlbR-5dBNAbdBJcGj-98DdeYSQ",
  authDomain: "community-marketplace-4e426.firebaseapp.com",
  projectId: "community-marketplace-4e426",
  storageBucket: "community-marketplace-4e426.appspot.com",
  messagingSenderId: "349031755447",
  appId: "1:349031755447:web:ad521565bce18b6a4ce732",
  measurementId: "G-0KFPNHSYDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };