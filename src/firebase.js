// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// old Config 
// const firebaseConfig = {
//   apiKey: "AIzaSyCKSERDYhmZyMtep5fhZYS6ZqN5GEBldNY",
//   authDomain: "react-auth-737d4.firebaseapp.com",
//   projectId: "react-auth-737d4",
//   storageBucket: "react-auth-737d4.appspot.com",
//   messagingSenderId: "1011045966825",
//   appId: "1:1011045966825:web:029e7533dfd57897c32178",
//   measurementId: "G-TBJNBCF6Q4"
// };

// new Config 
const firebaseConfig = {
  apiKey: "AIzaSyAl14eRmHuUjUEIfmcIeQKIfYYUc-ULuU4",
  authDomain: "votechain-ff427.firebaseapp.com",
  projectId: "votechain-ff427",
  storageBucket: "votechain-ff427.firebasestorage.app",
  messagingSenderId: "617288781048",
  appId: "1:617288781048:web:109d1d9d8d859a807e3f0d"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export{app,auth};
