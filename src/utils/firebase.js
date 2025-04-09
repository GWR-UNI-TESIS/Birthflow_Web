// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY1chhGkPHLAmLPiqMstT5UcnPNI5hqOY",
  authDomain: "birthflowdev.firebaseapp.com",
  projectId: "birthflowdev",
  storageBucket: "birthflowdev.firebasestorage.app",
  messagingSenderId: "1017128864839",
  appId: "1:1017128864839:web:7bd2a9981ebbd4733d3562",
  measurementId: "G-6B822ERSLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);


export { messaging, getToken, onMessage };
