import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import { saveNotesToFirebase } from '../utilities/saveNotes';
import { updateNotesInFirebase } from '../utilities/updateNotes';
import { getAuth } from 'firebase/auth';

import './Note.css'
import getNoteData from '../utilities/getNoteData';
import { askGroqPrompt } from '../utilities/groqAPI';

const FONTS = {
    "Poppins": '"Poppins", "san-serif"',
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


const HEADINGS = {
    "Heading 1": 1,
    "Heading 2": 2,
    "Heading 3": 3,
    "Heading 4": 4,
    "Heading 5": 5,
    "Heading 6": 6
}

export default function Note({ setPage, noteID }) {
    const [noteData, setNoteData] = useState(null);

    // Function to save notes to Firebase Firestore
    // CAN BE DELETED LATER WHEN WE HAVE A REAL NOTE
    // ---------------------------------------------------------------------------------
    const handleSave = async () => {
        const user = getAuth().currentUser;

        if (!user) {
            alert("You must be logged in.");
            return;
        }

        const noteName = document.getElementById('noteNameInput').value;
        const noteCategory = document.getElementById('noteCategoryInput').value;
        console.log("note name:", noteName);
        console.log("note category:", noteCategory);

        try {
            if (!noteID) {
                const id = await saveNotesToFirebase(user.uid, noteName, noteCategory, editor.getHTML(), 'html');
                alert("Saved note with ID: " + id);
            } else {
                updateNotesInFirebase(noteID, noteName, noteCategory, editor.getHTML(), 'html');
            }
        } catch (e) {
            alert("Error saving note: " + e.message);
        }
    };
    // --------------------------------------------------------------------------------


    const editor = useEditor({
        extensions: [StarterKit, TextStyle, Color, Underline, FontFamily],
        content:  "",
    });

    // set the font to the default
    useEffect(() => {
        editor.chain().focus().setFontFamily(Object.keys(FONTS)[0]).run();
    }, []);

    // set the font to the default
    useEffect(() => {
        if (noteID) {  // get data if id is defined
            getNoteData(noteID).then(data => {
                setNoteData(data);
                editor.commands.clearContent();  // clear frame
                editor.commands.insertContent(data.html);  // then input saved data
            });
        }
    }, []);

    // if currently fetching note data
    if (noteID && !noteData) {
        return <>
            <h1 id="title">NoteAI</h1>
            <p>Loading...</p>
        </>;
    }

    return (
        <>
            <h1 id="title">NoteAI</h1>

            <button id="homeButton" onClick={() => setPage("Home")}>
                <img src="/src/assets/backArrow.png" height="25px" width="25px"></img>
            </button>
            {/* <button>Review Notes</button> */}


            <div id="editorContainer">
                <h2 id="noteTitle"> <label for='noteName'>Name</label> </h2>
                <input type='text' name='noteName' id='noteNameInput' defaultValue={noteData ? noteData.name : ""}></input>
                <h2 id ="categoryTitle"> <label for='noteCategory'>Category</label> </h2>
                <input type='text' name='noteCategory' id='noteCategoryInput' defaultValue={noteData ? noteData.category : ""}></input>
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
                        className={editor.isActive('underline') ? 'is-active' : 'editorButton'}
                    >U</button>


                    <select
                        className="selectMenu"
                        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                        defaultValue="">
                        {Object.keys(COLORS).map(color => <option value={COLORS[color]} style={{ color: color }} key={color}>{color}</option>)}
                    </select>


                    <select
                        className="selectMenu"
                        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                        defaultValue={Object.keys(FONTS)[0]}>
                        {Object.keys(FONTS).map(font => <option value={FONTS[font]} style={{ fontFamily: FONTS[font] }} key={font}>{font}</option>)}
                    </select>


                    <select
                        className="selectMenu"
                        onChange={(e) => {
                            if (e.target.value == "") {
                                editor.chain().focus().setParagraph().run()
                            }
                            else {
                                editor.chain().focus().toggleHeading({ level : parseInt(e.target.value)}).run()
                            }}}
                        defaultValue={""}>
                        <option value="">Paragraph</option>
                        {Object.keys(HEADINGS).map(heading => <option value={HEADINGS[heading]} key={heading}>{heading}</option>)}
                    </select>


                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={editor.isActive('codeBlock') ? 'isActive2' : 'editorButton2'}>
                    Code</button>

                    <button
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        className={editor.isActive('codeBlock') ? 'isActive2' : 'editorButton2'}>
                    Line Break</button>

                    <button
                        onClick={() => {
                            if (document.getElementById("aiGen").classList.contains("hidden")) {
                                document.getElementById("aiGen").classList.replace("hidden","visible")
                            }
                            else {
                                document.getElementById("aiGen").classList.replace("visible","hidden")
                            }
                            }}
                        className="editorButton2">
                    AI Notes</button>

                </div>

                <div id="aiGen" className="hidden">
                    <p>Ask Groq to generate your notes!</p>
                    <label htmlFor="aiInput">Enter topic</label>
                    <input id="aiInput"></input>
                    <p id="loading" className="hidden">Loading</p>
                    <button
                        onClick={async () => {
                            document.getElementById("loading").classList.toggle("hidden")
                            let prompt = "Generate notes about this subject: " + document.getElementById("aiInput").value + " in HTML format ie using <p> tags, <h1>, <ul>, etc. Try to avoid giving information in paragraphs and prioritize bulleted lists of information."
                            let result = await askGroqPrompt(prompt)
                            editor.commands.insertContent(result)
                            document.getElementById("aiGen").classList.replace("visible", "hidden")
                        }}
                    >Generate</button>
                </div>

                <div className="editor">
                    <EditorContent editor={editor} />
                </div>
                <button id="save"
                    onClick={handleSave}
                >Save</button>
            </div>
        </>
    )
}