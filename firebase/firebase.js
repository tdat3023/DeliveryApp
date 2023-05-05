import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBVxz-cqNmguyOnvg2Pd0GiuO2Y15QClM8",
  authDomain: "shipperproject-72574.firebaseapp.com",
  projectId: "shipperproject-72574",
  storageBucket: "shipperproject-72574.appspot.com",
  messagingSenderId: "39155173136",
  appId: "1:39155173136:web:5ca0b2076b802587690795",
};

// if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Get a list of cities from your database
async function getCities(db) {
  const citiesCoL = collection(db, "cities");
  const citySnapshot = await getDocs(citiesC01);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}
