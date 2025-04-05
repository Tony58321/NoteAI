export default function Home({user, logout}) {
    return <>
        <h1>NoteAI</h1>
        <h3>Slogan here</h3>
        <p>welcome, {String(user.email)}</p>
        <button onClick={() => null}>New Notes</button>
        <button onClick={logout}>Logout</button>
    </>
}