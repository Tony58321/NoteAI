import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase.js'; // adjust the path if needed

export default function SignUpUser(username, password) {
    console.log(`sign up function called for user ${username} with password ${password}`);

    return createUserWithEmailAndPassword(auth, username, password)
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
