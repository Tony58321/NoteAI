export default function noteListing({note}) {
    return <tr>
        <td>{note.name}</td>
        <td>{note.category}</td>
        <td>{note.date}</td>
    </tr>
}