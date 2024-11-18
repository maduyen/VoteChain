// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
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
const db = getFirestore(app);

export{app,auth,db};
