import './Landing.css'


export default function Landing({setLoginPage}) {
    return (
        <>
            <h1 id="welcome">NoteAI</h1>
            <h4 id="slogan">Notes made easy, thinking made deep.</h4>
            <button id="toLogin"
                onClick={setLoginPage}
            >Get Started</button>

            <div id= "blackSquare"></div>
        </>
    )
}