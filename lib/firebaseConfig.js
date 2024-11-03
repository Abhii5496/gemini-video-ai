// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "g-alpha-aa07f.firebaseapp.com",
  projectId: "g-alpha-aa07f",
  storageBucket: "g-alpha-aa07f.firebasestorage.app",
  messagingSenderId: "319112218936",
  appId: "1:319112218936:web:ed3574ba7c3163c7add9cd",
  measurementId: "G-S6JP7ZWXXT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
