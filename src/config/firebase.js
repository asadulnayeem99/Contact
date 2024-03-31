// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOi5ik-8LD1NCmBT2oxBtlXLwygsNF8ok",
  authDomain: "vite-contact-256b0.firebaseapp.com",
  projectId: "vite-contact-256b0",
  storageBucket: "vite-contact-256b0.appspot.com",
  messagingSenderId: "144212282075",
  appId: "1:144212282075:web:a04868abf619662aa99afe",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
