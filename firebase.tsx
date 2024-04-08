

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyDq6AGj-JQy2aD7_0QKHNGlgudcUYlf-x8",
  authDomain: "inf00-7db24.firebaseapp.com",
  databaseURL: "https://inf00-7db24-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "inf00-7db24",
  storageBucket: "inf00-7db24.appspot.com",
  messagingSenderId: "269971934067",
  appId: "1:269971934067:web:5ac50fc4d42539bfe0d306",
  measurementId: "G-L9GNY10JLF",
});



const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

