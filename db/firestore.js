// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS3fBNr9eCEO5UMwEm-VqKOtxvKX9csyA",
  authDomain: "shipper-3b9fb.firebaseapp.com",
  projectId: "shipper-3b9fb",
  storageBucket: "shipper-3b9fb.appspot.com",
  messagingSenderId: "797310506536",
  appId: "1:797310506536:web:558866dd17ee6643c6071d",
  measurementId: "G-5VBLZ1PXXB",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

export default firebase;
