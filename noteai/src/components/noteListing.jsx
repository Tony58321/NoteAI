export default function noteListing({note}) {
    console.log(`making listing for:`)
    console.log(note)
    return <tr>
        <td>{note.name}</td>
        <td>{note.category}</td>
        <td>{"date placeholder"}</td>
    </tr>
}