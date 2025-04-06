export default function noteListing({note}) {
    return <tr>
        <td>{note.name}</td>
        <td>{note.category}</td>
        <td>{(new Date(note.createdAt.seconds*1000)).toLocaleDateString()}</td>
    </tr>
}