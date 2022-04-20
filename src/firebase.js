import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "pace-63f32.firebaseapp.com",
  databaseURL: "https://pace-63f32-default-rtdb.firebaseio.com",
  projectId: "pace-63f32",
  storageBucket: "pace-63f32.appspot.com",
  messagingSenderId: "114441254945",
  appId: "1:114441254945:web:d41ec4c54d89654e950b60"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const storage = firebase.storage();

export { db, storage };