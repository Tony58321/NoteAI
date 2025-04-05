import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Underline from '@tiptap/extension-underline'

export default function Note() {

    const editor = useEditor({
        extensions: [StarterKit, TextStyle, Color, Underline],
        content: '<p>Start taking notes here...</p>',
    })
    return (
        <>
            <h1>NoteAI</h1>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                !editor.can()
                    .chain()
                    .focus()
                    .toggleBold()
                    .run()
                }
                className={editor.isActive('bold') ? 'is-active' : ''}
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
                className={editor.isActive('italic') ? 'is-active' : ''}
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
                className={editor.isActive('underline') ? 'is-active' : ''}
            >U</button>
            <select
                onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                defaultValue = "">
                <option value="">Black</option>
                <option value="#FF0000">Red</option>
                <option value="#FFA500">Orange</option>
                <option value="#FFFF00">Yellow</option>
                <option value="#008000">Green</option>
                <option value="#0000FF">Blue</option>
                <option value="#EE82EE">Purple</option>
                <option value="#FF69B4">Pink</option>
            </select>

            <div className="editor">
                <EditorContent editor={editor} />
            </div>
        </>
    )
}