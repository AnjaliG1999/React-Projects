import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAgs9W99KLXtGykSUobI3sa8idv1Az8QPg",
  authDomain: "facebook-messenger-3f629.firebaseapp.com",
  projectId: "facebook-messenger-3f629",
  storageBucket: "facebook-messenger-3f629.appspot.com",
  messagingSenderId: "147651856655",
  appId: "1:147651856655:web:83c321ec95863bc8d2967a",
  measurementId: "G-0GRJ6H3YN2"
})

const db = firebaseApp.firestore();

export default db;