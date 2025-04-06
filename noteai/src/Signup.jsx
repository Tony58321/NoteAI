import { useState } from 'react';
import signUpUser from '../utilities/signUpUser';
import './Signup.css';

export default function SignUp({ setUser, setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    try {
      e.preventDefault(); // Prevent default form submission
      const user = await signUpUser(email, password);
      setUser(user); // this updates App.jsx
    } catch (error) {
      alert("Sign-up failed: " + error.message);
    }
  };

  return (
    <div>
      <h1 id="title">NoteAI</h1>
      <h2 id="signupHeader">Sign Up</h2>
      <div id="signupInfoContainer">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password"
        />
      </div>
      <button id="signupButton" onClick={handleSignUp}>Sign Up</button>

      <br /><br />

      <p>Already have an account?</p>
      <button id="loginButton" onClick={() => setPage("Login")}>Log in</button>
    </div>
  );
}
