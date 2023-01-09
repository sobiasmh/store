// Import the functions you need from the SDKs you need
// import * as firebase  from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrsMl1knNZjqyMvYNXiUMH1ZbbhKZAUcw",
    authDomain: "store-5d6ee.firebaseapp.com",
    databaseURL: "https://store-5d6ee-default-rtdb.firebaseio.com",
    projectId: "store-5d6ee",
    storageBucket: "store-5d6ee.appspot.com",
    messagingSenderId: "334864996967",
    appId: "1:334864996967:web:5a52b07df3477719e012c2"
  };
  

// Initialize Firebase
let app
if(firebase.app.length ===0){
    app = firebase.initializeApp(firebaseConfig);
}
else{
    app = firebase.app()
}
const auth = firebase.auth()

export {auth}