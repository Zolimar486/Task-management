// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUJOdDtXIrFX8Pg-4f3kei71BqMH5eHXA",
  authDomain: "mern-auth-d2fdc.firebaseapp.com",
  projectId: "mern-auth-d2fdc",
  storageBucket: "mern-auth-d2fdc.appspot.com",
  messagingSenderId: "656953379615",
  appId: "1:656953379615:web:f1efed95731d9581ccbe2a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);