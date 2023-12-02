// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCKSERDYhmZyMtep5fhZYS6ZqN5GEBldNY",
  authDomain: "react-auth-737d4.firebaseapp.com",
  projectId: "react-auth-737d4",
  storageBucket: "react-auth-737d4.appspot.com",
  messagingSenderId: "1011045966825",
  appId: "1:1011045966825:web:029e7533dfd57897c32178",
  measurementId: "G-TBJNBCF6Q4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export{app,auth};
