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
      <h2>Sign Up</h2>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter a password"
      />
      <br />
      <button onClick={handleSignUp}>Sign Up</button>

      <p>
        Already have an account?{" "}
        <button onClick={() => setPage("Login")}>Log in</button>
        </p>
    </div>
  );
}
