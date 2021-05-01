var firebaseConfig = {
  apiKey: "AIzaSyCchOJloBCu0x5_xCtpaPyDm8gX3veGE6Y",
  authDomain: "primer-proyecto-firebase-a9c0e.firebaseapp.com",
  databaseURL: "https://primer-proyecto-firebase-a9c0e-default-rtdb.firebaseio.com",
  projectId: "primer-proyecto-firebase-a9c0e",
  storageBucket: "primer-proyecto-firebase-a9c0e.appspot.com",
  messagingSenderId: "7051428654",
  appId: "1:7051428654:web:d1e3539b0ba9e8df0970bf",
  measurementId: "G-SJPK5VQWCZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db= firebase.firestore();