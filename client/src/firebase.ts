// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogs-d299a.firebaseapp.com",
  projectId: "blogs-d299a",
  storageBucket: "blogs-d299a.appspot.com",
  messagingSenderId: "708114488150",
  appId: "1:708114488150:web:d9135653b6d4beca03d4f7",
  measurementId: "G-8J594BXMP8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);