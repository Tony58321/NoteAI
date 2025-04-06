import NoteListing from "./components/noteListing";
import getNotes from "../utilities/getNotes";
import { useState, useEffect } from "react";
import './Home.css'

export default function Home({user, logout, setPage, setNoteID}) {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        if (user) {
            getNotes(user).then(fetchedNotes => setNotes(fetchedNotes));
        }}, [user]);
    return <>
        {/* <div className="menu">
            <button disabled>Home</button>
            <button>Quiz results</button>
            <button>Etc.</button>
            <button onClick={() => setPage("FlashCards")} >Flash Cards</button>
        </div> */}
        <div className="Banner">
            <h1 id="title">memo</h1>
            <h3 id="welcomeHome">Welcome!</h3>
            <button id="logout" onClick={logout}>
                <img height="25px" width="25px" src="public/logout.png"></img>
            </button>
        </div>
        <div className="content">
            <table id="notes">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Creation Date</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map(note => <NoteListing note={note}
                        setNote={setNoteID}
                        setPage={setPage}
                        key={note.id}></NoteListing>)}
                </tbody>
            </table>
            <button id="newNote" onClick={() => {
                setPage("Note");
                setNoteID("");  // clear previous note id
                }}>New Note</button>
        </div>
        {/* <div className="cards">
            <p>cards</p>
        </div> */}
    </>
}