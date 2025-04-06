import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase.js';

// This function saves notes to Firebase Firestore
// It takes a userId, content, and format (default is 'html') from Tiptap editor
export async function saveNotesToFirebase(userId, content, format = 'html') {
  try {
    if (!userId) throw new Error('Missing user ID');
    if (!content) throw new Error('Missing note content');
    if (!['html', 'json'].includes(format)) {
      throw new Error('Unsupported format. Only HTML and JSON are supported.');
    }

    const noteData = {
      userId,
      createdAt: serverTimestamp(),
    };

    if (format === 'html') {
      noteData.html = content;
    } else {
      noteData.json = content;
    }

    console.log("Saving note:", noteData);

    const docRef = await addDoc(collection(db, 'notes'), noteData);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
}
