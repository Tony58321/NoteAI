import { useState } from 'react';
import './App.css';
import Home from './home';
import Note from './Note';
import Landing from './Landing';
import Login from './Login';
import FlashCards from './flashCards';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("Home")

  // if user is defined (and validated?)

  if (page == "Login") {
    return <Login setUser={user => {
      setUser(user);
      setPage("Home");
    }}/>
  }
  else if (!user) {
    return <Landing setLoginPage={() => setPage("Login")}/>;
  } else if (page == "Note") {
    return <Note setPage={setPage}/>;
  }else if(page == "FlashCards"){
    return <FlashCards/>;

  }
  else {
    return <Home user={user} logout={() => setUser(null)} setPage={setPage}/>;
  }
}

export default App