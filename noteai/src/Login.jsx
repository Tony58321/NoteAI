import './App.css'
import LogInUser from '../utilities/logInUser'
import callGroq from '../utilities/CallGroq'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'; // if using React Router


export default function Login({setUser}) {

  const [email, setEmail] = useState(''); // Initialize email state
  const [password, setPassword] = useState(''); // Initialize password state

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
        <h1>NoteAI</h1>
        <h3>Slogan here</h3>
        <label for='Username'>Username</label>
        <input type='text' name='Username' id='usernameInput' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <br/>
        <label for='password'>Password:</label>
        <input type='text' name='password' id='passwordInput' value={password} onChange={(e) =>setPassword(e.target.value)}></input>
        
        <button onClick={handleLogin}>Log in</button>

        <br/><br/>

        <br/><br/>

        <label for='aiprompt'>prompt</label>
        <input type='text' name='aiprompt' id='aiprompt'></input>
        <button onClick={() => callGroq(document.getElementById("aiprompt").value)}>Call Groq</button>
      </>
    )
}