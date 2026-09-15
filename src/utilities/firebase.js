// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCETNqHtEA6nVvXTsSwJjwk_eYjC-ODo7s",
  authDomain: "bixxxy-4b3f6.firebaseapp.com",
  projectId: "bixxxy-4b3f6",
  storageBucket: "bixxxy-4b3f6.appspot.com",
  messagingSenderId: "443155048283",
  appId: "1:443155048283:web:e0830dc661563215719c7e",
  measurementId: "G-C8D939385H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
