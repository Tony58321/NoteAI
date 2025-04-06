import { useState } from 'react';
import './App.css';
import Home from './home';
import Note from './Note';
import Landing from './Landing';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("Home")

  // if user is defined (and validated?)

  if (page == "Login") {
    return <Login/>
  }
  else if (!user) {
    return <Landing setLoginPage={() => setPage("Login")}/>;
  } else if (page == "Note") {
    return <Note setPage={setPage}/>;
  } else {
    return <Home user={user} logout={() => setUser(null)} setPage={setPage}/>;
  }
}

export default App