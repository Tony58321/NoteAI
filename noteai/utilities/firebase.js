// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCORrf6MXEyNaPBgj3fXfh6P4oDu1feVWI",
  authDomain: "noteai-205ac.firebaseapp.com",
  projectId: "noteai-205ac",
  storageBucket: "noteai-205ac.firebasestorage.app",
  messagingSenderId: "558241278376",
  appId: "1:558241278376:web:afc20ef7535f7f11cf959d",
  measurementId: "G-F5VGXC34XM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };