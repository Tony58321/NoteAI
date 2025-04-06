import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase.js'; // adjust the path if needed

export default function LogInUser(username, password) {
    console.log(`log in function called for user ${username} with password ${password}`);

    return signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged in user:", user.email);
            return user;
        })
        .catch((error) => {
            console.error("Login failed:", error.message);
            throw error;
        });
}
