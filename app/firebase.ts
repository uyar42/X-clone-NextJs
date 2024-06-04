// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "x-next-d7e94.firebaseapp.com",
    projectId: "x-next-d7e94",
    storageBucket: "x-next-d7e94.appspot.com",
    messagingSenderId: "198460132804",
    appId: "1:198460132804:web:e7bf463ac47de116bd6891"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);