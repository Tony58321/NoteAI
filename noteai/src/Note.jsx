import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Underline from '@tiptap/extension-underline'
import './Note.css'

export default function Note({ setPage }) {

    const editor = useEditor({
        extensions: [StarterKit, TextStyle, Color, Underline],
        content: '<p>Start taking notes here...</p>',
    })
    return (
        <>
            <h1 id="title">NoteAI</h1>
            <button id="homeButton" onClick={() => setPage("Home")}>
                <img src="/src/assets/backArrow.png" height="25px" width="25px"></img>
            </button>
            {/* <button>Review Notes</button> */}
            <div id="editorContainer">
                <div id="editorOptions">

                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleBold()
                                .run()
                        }
                        className={editor.isActive('bold') ? 'isActive' : 'editorButton'}
                        id="bold"
                    >B</button>


                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleItalic()
                                .run()
                        }
                        className={editor.isActive('italic') ? 'isActive' : 'editorButton'}
                        id="italic"
                    >I</button>


                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleUnderline()
                                .run()
                        }
                        className={editor.isActive('underline') ? 'isActive' : 'editorButton'}
                        id="underline"
                    >U</button>


                    <select
                        className="selectMenu"
                        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                        defaultValue="">
                        <option value="">Black</option>
                        <option value="#FF0000">Red</option>
                        <option value="#FFA500">Orange</option>
                        <option value="#FFFF00">Yellow</option>
                        <option value="#008000">Green</option>
                        <option value="#0000FF">Blue</option>
                        <option value="#EE82EE">Purple</option>
                        <option value="#FF69B4">Pink</option>
                    </select>
                </div>

                <div className="editor">
                    <EditorContent editor={editor} />
                </div>
            </div>
            <button
                onClick={() => console.log(editor.getHTML())}
            >Save</button>
        </>
    )
}