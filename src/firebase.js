// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDUKmR3QVzQA4KFA-l1DDwi9aaek87uxk4",
    authDomain: "smpmuhsumbang-9fa3a.firebaseapp.com",
    projectId: "smpmuhsumbang-9fa3a",
    storageBucket: "smpmuhsumbang-9fa3a.appspot.com",
    messagingSenderId: "353401139619",
    appId: "1:353401139619:web:4cbc0b9d8818740dc7aa16",
    measurementId: "G-Y653W7NWZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };