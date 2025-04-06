import { serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase.js';

// This function saves notes to Firebase Firestore
// It takes a noteID content, and format (default is 'html') from Tiptap editor
export async function updateNotesInFirebase(noteID, name, category, content, format = 'html') {
  try {
    if (!noteID) throw new Error('Missing note ID');
    if (!content) throw new Error('Missing note content');
    if (!['html', 'json'].includes(format)) {
      throw new Error('Unsupported format. Only HTML and JSON are supported.');
    }

    const noteData = {
      name,
      category,
      createdAt: serverTimestamp(),
    };

    if (format === 'html') {
      noteData.html = content;
    } else {
      noteData.json = content;
    }


    await updateDoc(doc(db, "notes", noteID), {name: name, category: category, html: content});
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
}
