// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "realtor-6b0bd.firebaseapp.com",
  projectId: "realtor-6b0bd",
  storageBucket: "realtor-6b0bd.appspot.com",
  messagingSenderId: "328610878258",
  appId: "1:328610878258:web:b820695a9ba692e176fd2b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()