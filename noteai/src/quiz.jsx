import { useEffect, useState } from "react";
import getNoteData from "../utilities/getNoteData";
import { generateQuiz } from "../utilities/CallGroq";
import GroqQuestCheck from "../utilities/GroqQuestCheck";


export default function Quiz({noteID, setPage}) {
    const [questions, setQuestions ] = useState("loading...");
    const [quizName, setQuizName] = useState("");
    const [curQuest, setCurQuest] = useState(0);
    const [questState, setQuestState] = useState("show");
    useEffect(() => {
        getNoteData(noteID).then(data => {
            setQuizName(`Quiz on ${data.name}`)
            generateQuiz(data.html).then(setQuestions)
                .catch(() => setQuestions("Error loading quiz. Please come back later."));
        });
    }, []); // empty dependency array = only run once on mount

    const submitAnswer = async () => {
        setQuestState("submitting");
        // call groq to check if answer is correct
        GroqQuestCheck(questions[curQuest].question, document.getElementById("answer"), questions[curQuest].answer);
    }

    const nextQuestion = () => {
        setQuestState("show");
        setCurQuest(curQuest + 1);
    }

    return <>
        <h1 id="title">NoteAI</h1>
        <h1>{quizName}</h1>
        <button id="homeButton" onClick={() => setPage("Home")}>
            <img src="/src/assets/backArrow.png" height="25px" width="25px"></img>
        </button>

        {typeof questions == "string" ?
            <p>{questions}</p>
        :
        <>
            <p>{questions[curQuest].question}</p>
            {questState == "show" || questState == "submitting" ?
                <>
                    <input type="text" disabled={questState != "show"}></input>
                    <button onClick={submitAnswer} disabled={questState != "show"}>
                        {questState == "show" ? "Submit" : "Loading..."}
                    </button>
                    <button onClick={() => setQuestState("answer")} disabled={questState != "show"}>Show Answer</button>
                </>
            : questState == "answer" ?
                <>
                    <p>Answer:</p>
                    <p>{questions[curQuest].answer}</p>
                    <button onClick={nextQuestion}>Continue</button>
                </>
            :
                null
            }
        </>
        }


        {/*questions ?
        questions.map((question, i) =>
            <div key={i} className="card">
                <p>{question.question}</p>
            </div>
        ) : null*/}
    </>;
}