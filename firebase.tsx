// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq6AGj-JQy2aD7_0QKHNGlgudcUYlf-x8",
  authDomain: "inf00-7db24.firebaseapp.com",
  projectId: "inf00-7db24",
  storageBucket: "inf00-7db24.appspot.com",
  messagingSenderId: "269971934067",
  appId: "1:269971934067:web:5ac50fc4d42539bfe0d306",
  measurementId: "G-L9GNY10JLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics)