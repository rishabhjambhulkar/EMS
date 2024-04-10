// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7PSE_5e2MUYSkUAXeY1o7kLKfX1oazac",
  authDomain: "mern-auth-75877.firebaseapp.com",
  projectId: "mern-auth-75877",
  storageBucket: "mern-auth-75877.appspot.com",
  messagingSenderId: "553744005117",
  appId: "1:553744005117:web:fd7a2e6647ea81c7218b94",
  measurementId: "G-BJ4040V5N9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);