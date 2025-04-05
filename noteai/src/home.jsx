import NoteListing from "./components/noteListing"


export default function Home({user, logout, setPage}) {
    const notes = [
        {name: "note1", category: "cs xxx", date: "4-5-2025"},
        {name: "planets", category: "holst", date: "9-29-1918"},
    ]
    return <>
        <div class="menu">
            <button disabled>Home</button>
            <button>Quiz results</button>
            <button>Etc.</button>
        </div>
        <div class="Banner">
            <h1>NoteAI</h1>
            <h3>Slogan here</h3>
            <p>welcome, {String(user.email)}</p>
            <button onClick={logout}>Logout</button>
        </div>
        <div class="content">
            <button onClick={() => setPage("Note")}>New Notes</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map(note => <NoteListing note={note}></NoteListing>)}
                </tbody>
            </table>
        </div>
        <div class="cards">
            <p>cards</p>
        </div>
    </>
}