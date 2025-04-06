import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';

const FONTS = {
    "Arial": '"Arial", "sans-serif"',
    "Brush Script": '"Brush Script MT", "Brush Script Std", "cursive"',
    "Comic Sans": '"Comic Sans MS", "Comic Sans"',
    "Courier New": '"Courier New", "monospace"',
    "Impact": '"Impact", "fantasy"',
    "Times New Roman": '"Times", "Times New Roman", "serif"',
};

export default function Note({setPage}) {

    const editor = useEditor({
        extensions: [StarterKit, TextStyle, Color, Underline, FontFamily],
        content: '<p>Start taking notes here...</p>',
    });

    // set the font to the default
    useEffect(() => {
        editor.chain().focus().setFontFamily(Object.keys(FONTS)[0]).run();
        }, []);

    return (
        <>
            <button onClick={() => setPage("Home")}>Home</button>
            <h1>NoteAI</h1>
            <button>Review Notes</button>
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
            <select
                onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                defaultValue = {Object.keys(FONTS)[0]}>
                {Object.keys(FONTS).map(font => <option value={FONTS[font]} key={font}>{font}</option>)}
            </select>

            <div className="editor">
                <EditorContent editor={editor} />
            </div>
        </>
    )
}