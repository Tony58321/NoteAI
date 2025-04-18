import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore/lite';

export default async function getNotes(currentUser) {


    // set up firebase/store
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);


    // get data from notes collection
    const snaps = await getDocs(query(collection(db, "notes"), where("userId", "==", currentUser.uid)));
    return snaps.docs.map(doc => {
        let data = doc.data();
        data.id = doc.id;
        return data;
    });
}