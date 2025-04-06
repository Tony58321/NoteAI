import LogInUser from '../utilities/logInUser'
import {generateQuiz} from '../utilities/CallGroq'
import { useEffect,useState } from 'react'
import React from 'react';
import './flashCards.css'
import getNoteData from '../utilities/getNoteData';





function generateCards(flashCards){




    const cards = [];

    for (let i = 0; i < flashCards.length; i++) {
        cards.push(
          <React.Fragment key={i}>
            <div key={i} className="card">
                <p>{flashCards[i].question}</p>
                <p className= "hidden-text">{flashCards[i].answer}</p>
            </div>
            

          </React.Fragment>
        );
    }
    return <>{cards}</>;










/*
    const cards = [];

    for (let i = 1; i <= 10; i++) {
        cards.push(
          <React.Fragment key={i}>
            <div key={i} className="card">
                <p>This is number {i}</p>
                <p className= "hidden-text">hi!</p>
            </div>
            

          </React.Fragment>
        );
    }
    return <>{cards}</>;
*/


}


export default function FlashCards({noteID, setPage}){



    /*
    let [flashCards, setFlashCards ] = useState([]);

    if(flashCards.length === 0){

        generateQuiz("Put something good in here later").then((cardArray) =>{

            setFlashCards(cardArray);

            console.log("****************************");

            console.log(flashCards);  
        
        
        });
    }
    */





    let [flashCards, setFlashCards ] = useState(null);
    useEffect(() => {

        getNoteData(noteID).then(data => {
            //data.html
            generateQuiz(data.html).then((cardArray) => {
                setFlashCards(cardArray);
                console.log("/****************************/");
                console.log(flashCards);
                console.log(cardArray);
              });

        });
    }, []); // empty dependency array = only run once on mount
    

    

    return(
        <>
        <h1 id="title">memo</h1>
        <button id="homeButton" onClick={() => setPage("Home")}>
            <img src="/public/backArrow.png" height="25px" width="25px"></img>
        </button>
        <h1>Flashcards</h1>

        {!flashCards ?
        <p>loading....</p>
        :
        generateCards(flashCards)
        }
        
        </>




    )
}