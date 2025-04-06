import { useEffect, useState } from "react";
import getNoteData from "../utilities/getNoteData";
import { generateQuiz } from "../utilities/CallGroq";
import GroqQuestCheck from "../utilities/GroqQuestCheck";


export default function Quiz({noteID, setPage}) {
    const [questions, setQuestions ] = useState("loading...");
    const [quizName, setQuizName] = useState("");
    const [curQuest, setCurQuest] = useState(0);
    const [questState, setQuestState] = useState("show");
    const [lastResponse, setLastResponse] = useState("");
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
        GroqQuestCheck(questions[curQuest].question, document.getElementById("answer").value, questions[curQuest].answer)
            .then(response => {
                setQuestState("graded");
                setLastResponse(response);
            });
    }

    const nextQuestion = () => {
        if (curQuest + 1 >= questions.length) {
            setQuestions("Quiz complete.")
        }
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
            {questState == "show" || questState == "submitting" || questState == "graded"?
                <>
                    <input type="text" disabled={questState != "show"} key={curQuest} id="answer"></input>
                    <button onClick={submitAnswer} disabled={questState != "show"} hidden={questState == "graded"}>
                        {questState == "show" ? "Submit" : "Loading..."}
                    </button>
                    <p hidden={questState != "graded"}>{lastResponse}</p>
                    <button onClick={() => setQuestState("answer")} disabled={questState != "show"} hidden={questState == "graded"}>Show Answer</button>
                    <button onClick={nextQuestion} hidden={questState != "graded"}>Continue</button>
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