import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDoc, query, where, doc } from 'firebase/firestore/lite';

export default async function getNoteData(id) {


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


    //YRmAZvwaYcOUuiRQl2hb
    const snap = await getDoc(doc(db, "notes", id));
    return snap.data;
}