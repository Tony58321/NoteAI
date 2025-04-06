import NoteListing from "./components/noteListing";
import getNotes from "../utilities/getNotes";
import { useState, useEffect } from "react";
import "./home.css";


export default function Home({user, logout, setPage, setNoteID}) {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        if (user) {
            getNotes(user).then(fetchedNotes => setNotes(fetchedNotes));
        }}, [user]);
    return <>
        <div className="menu">
            <button disabled>Home</button>
            <button>Quiz results</button>
            <button>Etc.</button>
            <button onClick={() => setPage("FlashCards")} >Flash Cards</button>
        </div>
        <div className="Banner">
            <h1>NoteAI</h1>
            <h3>Slogan here</h3>
            <p>welcome, {String(user.email)}</p>
            <button onClick={logout}>Logout</button>
        </div>
        <div className="content">
            <button onClick={() => setPage("Note")}>New Notes</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Creation Date</th>
                        <th>Flash Cards</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map(note => <NoteListing note={note}
                        setNote={setNoteID}
                        setPage={setPage}
                        key={note.id}></NoteListing>)}
                </tbody>
            </table>
        </div>
        <div className="cards">
            <p>cards</p>
        </div>
    </>
}