// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMUPAj5VsER1oVxzazhDZ2dmcErCtz1G0",
  authDomain: "netflix-d2ed9.firebaseapp.com",
  projectId: "netflix-d2ed9",
  storageBucket: "netflix-d2ed9.firebasestorage.app",
  messagingSenderId: "420797516371",
  appId: "1:420797516371:web:9b4849cd5eff52d7d614a6",
  measurementId: "G-EVRWC41JKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();