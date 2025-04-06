export default function noteListing({note, setNote}) {
    return <tr onClick={() => setNote(note.id)}>
        <td>{note.name}</td>
        <td>{note.category}</td>
        <td>{(new Date(note.createdAt.seconds*1000)).toLocaleDateString()}</td>
    </tr>
}