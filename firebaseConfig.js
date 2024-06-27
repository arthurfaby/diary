// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjaM_KfQBMxSzl8qEmE9MTAD2xXzy-550",
  authDomain: "diaryapp-bd674.firebaseapp.com",
  projectId: "diaryapp-bd674",
  storageBucket: "diaryapp-bd674.appspot.com",
  messagingSenderId: "761991627509",
  appId: "1:761991627509:web:26e0dfca2c3a5d8199fbbc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
