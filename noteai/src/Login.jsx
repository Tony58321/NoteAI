import './Login.css'
import LogInUser from '../utilities/logInUser'
import callGroq from '../utilities/CallGroq'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'; // if using React Router


export default function Login({ setUser, setPage }) {

  const [email, setEmail] = useState(import.meta.env.VITE_DEFAULT_USER); // Initialize email state
  const [password, setPassword] = useState(import.meta.env.VITE_DEFAULT_PASS); // Initialize password state

  // const navigate = useNavigate(); // Might use this for navigation after login

  const handleLogin = async (e) => {
    try {
      e.preventDefault(); // Prevent default form submission
      const user = await LogInUser(email, password); // Call the login function
      setUser(user); // Set the user in state
      // navigate('/home'); // Navigate to home page after successful login
    } catch (error) {
      console.error("Login error:", error); // Handle login error
    }
  };


  return (
    <>
      <h1 id="title">memo</h1>
      <h2 id="loginHeader">Login</h2>
      <div id="loginInfoContainer">
        <label className="inputLabel" htmlFor='username'>Email</label>
        <br />
        <input placeholder="Enter your email" type='text' name='username' id='usernameInput' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <br />
        <label className="inputLabel" htmlFor='password'>Password</label>
        <br />
        <input placeholder="Enter your password" type='password' name='password' id='passwordInput' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </div>

      <button id="loginButton" onClick={handleLogin}>Log In</button>

      <br /><br />

      <p>New User?</p>
      <button id="createAccount" onClick={() => setPage("Signup")}>Create Account</button>
      <br /><br />

      {/* <label htmlFor='aiprompt'>prompt</label>
      <input type='text' name='aiprompt' id='aiprompt'></input>
      <button onClick={() => callGroq(document.getElementById("aiprompt").value)}>Call Groq</button> */}
    </>
  )
}