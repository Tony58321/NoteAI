import './Landing.css'


export default function Landing({setLoginPage}) {
    return (
        <>
            <h1 id="welcome">memo</h1>
            <h4 id="slogan">stop thinking, start memoing</h4>
            <button id="toLogin"
                onClick={setLoginPage}
            >Get Started</button>

            <div id= "blackSquare"></div>
        </>
    )
}