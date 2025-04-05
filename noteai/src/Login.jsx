import './App.css'
import LogInUser from '../utilities/logInUser'

export default function Login() {

    return (
      <>
        <h1>NoteAI</h1>
        <label for='Username'>Username</label>
        <input type='text' name='Username' id='usernameInput'></input>
        <br/>
        <label for='password'>Password:</label>
        <input type='text' name='password' id='passwordInput'></input>
        
        <button onClick={() => LogInUser(
          document.getElementById('usernameInput').value,
          document.getElementById('passwordInput').value
          )}>Log in</button>
      </>
    )
  }