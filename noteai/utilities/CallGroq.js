//import { simpleGroqQuestion, askGroqPrompt  } from './apiTest.js';
import { simpleGroqQuestion, askGroqPrompt  } from './groqAPI.js';


/*function calls groq with an input string prompt.*/
export default async function callGroq(inputString ){


    //let result = await askGroqPrompt(inputString);
    //console.log(result);


    await generateQuiz();
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
}