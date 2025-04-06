import LogInUser from '../utilities/logInUser'
import {generateQuiz} from '../utilities/CallGroq'
import { useEffect,useState } from 'react'
import React from 'react';
import './flashCards.css'





function generateCards(flashCards){
    //return<>
    //<p>test content</p>
    //</>;









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


}


export default function FlashCards(){



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
        generateQuiz("Put something good in here later").then((cardArray) => {
          setFlashCards(cardArray);
          console.log("/****************************/");
          console.log(flashCards);
          console.log(cardArray);
        });
      }, []); // empty dependency array = only run once on mount
    

    

    return(
        <>
        <h1>Flashcards</h1>

        {!flashCards ?
        <p>loading....</p>
        :
        generateCards(flashCards)
        }








        <div className="card"> 
            <p>Q: What is 9+10?</p>

            <p className= "hidden-text">A: Twenty-One</p>
        </div>
        
        
        </>




    )
}