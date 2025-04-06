//import { simpleGroqQuestion, askGroqPrompt  } from './apiTest.js';
import { simpleGroqQuestion, askGroqPrompt  } from './groqAPI.js';


/*function calls groq with an input string prompt.*/
export default async function callGroq(inputString ){


    //let result = await askGroqPrompt(inputString);
    //console.log(result);


    //returns the generated flash cards
    let quizCards = await generateQuiz()
    console.log(quizCards);
    return (quizCards);
}




export async function generateQuiz(){


let instructions = "You are going to generate a flashcard quiz in the following format. For each question write a division bar like this write before starting the question: " 
+ "/-----------------------------------------------------------------------/"
+ " Then write the question. After the question write another sub-division line like this: " 
+"*******************"
+" then write the answer to the question. Then you can start writing the next question + answer combo. "

let string = "Write 10 questions about: U.S. state capitals."


let comboString = instructions + string;


let result = await askGroqPrompt(comboString);
console.log(result);


let quizQuestionArray = [];




/*THIS SECTION WILL REQUIRE SOME WORK TO ENSURE ALL EDGE CASES ARE COVERED BUT SHOULD BE FINE FOR NOW*/

// Split the string by newline character to get an array of lines
let lines = result.split('\n');
// Iterate through the array of lines

let questionSavingMode = false;
let questionString = "";
let answerString = "";
for (let i = 0; i < lines.length; i++) {


  if (lines[i] == "/-----------------------------------------------------------------------/" ){

    //Record previous Q+A combo before starting
    if(questionString != ""){


      let cardItem = {
        question: questionString,
        answer: answerString
      };
      quizQuestionArray.push(cardItem);
    }


    questionSavingMode = true;
    questionString = "";
    answerString = "";
    continue;
  }
  else if(lines[i] =="*******************" ){
    questionSavingMode = false;
    answerString = "";
    continue;
  }

  //currently recording a question
  if(questionSavingMode == true ){
    questionString += lines[i];
  }
  //currently recording an answer
  else{
    answerString += lines[i];
  } 

}
//record last trailing Q+A combo 
let cardItem = {
  question: questionString,
  answer: answerString
};
quizQuestionArray.push(cardItem);

console.log(quizQuestionArray);
return quizQuestionArray;


}