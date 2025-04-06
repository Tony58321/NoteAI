import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import './Note.css'

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
            </div>
            </div>
            <button
                onClick={() => console.log(editor.getHTML())}
            >Save</button>
        </>
    )
}