import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import { saveNotesToFirebase } from '../utilities/saveNotes';
import { getAuth } from 'firebase/auth';


const FONTS = {
    "Arial": '"Arial", "sans-serif"',
    "Brush Script": '"Brush Script MT", "Brush Script Std", "cursive"',
    "Comic Sans": '"Comic Sans MS", "Comic Sans"',
    "Courier New": '"Courier New", "monospace"',
    "Impact": '"Impact", "fantasy"',
    "Times New Roman": '"Times", "Times New Roman", "serif"',
};

const COLORS = {
    "Black": "",
    "Red": "#FF0000",
    "Orange": "#FFA500",
    "Yellow": "#FFFF00",
    "Green": "#008000",
    "Blue": "#0000FF",
    "Purple": "#EE82EE",
    "Pink": "#FF69B4",
    "Grey": "#808080",
}

export default function Note({setPage}) {

    // Function to save notes to Firebase Firestore
    // CAN BE DELETED LATER WHEN WE HAVE A REAL NOTE
    // ---------------------------------------------------------------------------------
    const handleSave = async () => {
        const user = getAuth().currentUser;
    
        if (!user) {
          alert("You must be logged in.");
          return;
        }
    
        const content = '<p>Start taking notes here...</p>'; // your placeholder
    
        try {
            const id = await saveNotesToFirebase(user.uid, content, 'html');
            alert("Saved note with ID: " + id);
          } catch (e) {
            alert("Error saving note: " + e.message);
          }
        };
    // --------------------------------------------------------------------------------


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
        {/* TEST BUTTON CAN BE DELETED LATER */}
            <h1>Notes Page</h1>
            <button onClick={handleSave}>Save Placeholder Note</button>
        {/*--------------------------------------------------------------  */}

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
                {Object.keys(COLORS).map(color => <option value={COLORS[color]} style={{color: color}} key={color}>{color}</option>)}
            </select>
            <select
                onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                defaultValue = {Object.keys(FONTS)[0]}>
                {Object.keys(FONTS).map(font => <option value={FONTS[font]} style={{fontFamily: FONTS[font]}} key={font}>{font}</option>)}
            </select>

            <div className="editor">
                <EditorContent editor={editor} />
            </div>
        </>
    )
}