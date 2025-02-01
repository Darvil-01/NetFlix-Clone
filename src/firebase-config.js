import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "src/assets/pages/auth-page/signup/Signup.css",
  authDomain: "netflix-clone-14cb0.firebaseapp.com",
  projectId: "netflix-clone-14cb0",
  storageBucket: "netflix-clone-14cb0.firebasestorage.app",
  messagingSenderId: "186744079055",
  appId: "1:186744079055:web:fd72b7944a501826da2dba",
  measurementId: "G-FMWZB79NTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);
const db = getFirestore(app);

export { db };