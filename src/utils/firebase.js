// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcZMMfnD7HaQmTfM6Srg6JoqkLM966MYU",
  authDomain: "netflix-gpt-4u.firebaseapp.com",
  projectId: "netflix-gpt-4u",
  storageBucket: "netflix-gpt-4u.appspot.com",
  messagingSenderId: "337320642075",
  appId: "1:337320642075:web:b8294542ed1a4a68011abe",
  measurementId: "G-7WWQV8VSC3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
