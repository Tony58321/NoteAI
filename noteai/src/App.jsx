import { useState } from 'react'
import './App.css'
import Login from './Login'
import Home from './home'

function App() {
  const [user, setUser] = useState(null);

  // if user is defined (and validated?)
  if (user) {
    return <Home user={user} logout={() => setUser(null)}/>;
  } else {
    return <Login setUser={(user => setUser(user))}/>;
  }
}

export default App
