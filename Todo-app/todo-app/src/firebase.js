import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBtQNy68TXM9pziR0sJ66PcrqvYHQFhHc4",
    authDomain: "todo-app-5258f.firebaseapp.com",
    projectId: "todo-app-5258f",
    storageBucket: "todo-app-5258f.appspot.com",
    messagingSenderId: "584294018379",
    appId: "1:584294018379:web:f5b694c1568ca463d90cce",
    measurementId: "G-GVYNB21TB7"
});

const db = firebaseApp.firestore();

export default db;