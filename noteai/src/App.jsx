import { useState } from 'react';
import './App.css';
import Home from './home';
import Note from './Note';
import Landing from './Landing';
import Login from './Login';
import FlashCards from './flashCards';
import SignUp from './Signup';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("Home");
  const [noteID, setNoteID] = useState("");

  // if user is defined (and validated?)

  if (page == "Login") {
    return <Login setUser={user => {
      setUser(user);
      setPage("Home");
    }}
    setPage={setPage}/>
  }
  else if (page == "Signup") {
    return <SignUp setUser={user => {
      setUser(user);
      setPage("Home");
    }}
    setPage={setPage} />
  }
  else if (!user) {
    return <Landing setLoginPage={() => setPage("Login")}/>;
  } else if (page == "Note") {
    return <Note setPage={setPage} noteID={noteID}/>;
  }else if(page == "FlashCards"){
    return <FlashCards noteID={noteID} setPage={setPage}/>;
  }
  else {
    return <Home user={user} logout={() => setUser(null)} setPage={setPage} setNoteID={setNoteID}/>;
  }
}

export default App