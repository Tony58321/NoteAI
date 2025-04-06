export default function noteListing({note, setNote, setPage}) {
    return <tr onClick={() => setNote(note.id)}>
        <td onClick={() => setPage("Note")}>{note.name}</td>
        <td onClick={() => setPage("Note")}>{note.category}</td>
        <td onClick={() => setPage("Note")}>{(new Date(note.createdAt.seconds*1000)).toLocaleDateString()}</td>
    </tr>
}