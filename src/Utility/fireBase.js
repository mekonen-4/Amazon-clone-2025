// Import Firebase core
import { initializeApp } from "firebase/app";

// Import services you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpZ0__Yh-Anz151uSsDyYrO9Q-PQ-mqsw",
  authDomain: "clone-1d560.firebaseapp.com",
  projectId: "clone-1d560",
  storageBucket: "clone-1d560.appspot.com",
  messagingSenderId: "788127183288",
  appId: "1:788127183288:web:bca4e62e3416ce1d0c5f4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
