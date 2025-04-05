import { simpleGroqQuestion, askGroqPrompt  } from './apiTest.js';



/*function calls groq with an input string prompt. Currently askGroqPrompt prints the result into the console itself, but I may
change that later to the function returns it to this function, and this function does work*/
export default async function callGroq(inputString ){


    await askGroqPrompt(inputString);

}