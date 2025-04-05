import { useState } from 'react';
import './App.css';
import Login from './Login';
import Home from './home';
import Note from './Note';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("Home")

  // if user is defined (and validated?)
  if (!user) {
    return <Login setUser={(user => setUser(user))}/>;
  } else if (page == "Note") {
    return <Home user={user} logout={() => setUser(null)} setPage={setPage}/>;
  } else {
    return <Note/>;
  }
}

export default App