import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCS3fBNr9eCEO5UMwEm-VqKOtxvKX9csyA",
  authDomain: "shipper-3b9fb.firebaseapp.com",
  projectId: "shipper-3b9fb",
  storageBucket: "shipper-3b9fb.appspot.com",
  messagingSenderId: "797310506536",
  appId: "1:797310506536:web:558866dd17ee6643c6071d",
  measurementId: "G-5VBLZ1PXXB",
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
