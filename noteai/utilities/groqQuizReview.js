import { askGroqPrompt  } from './groqAPI.js';


export default async function GroqQuizReview(questions) {
    const prompt = `
        You will be presented with a lists of questions, reference notes, and answers to check.
        Look over how accurate the answers are to the questions and reference notes.
        Give a brief three sentence summary of the following things.
        1. A statement of the general accuracy of the given answers in relation to the questions and the reference notes.
        2. Mention any specific areas or topics that the answers need to be improved on or did especially well on.
        2. An encouraging remark for the person answering the questions.
        
        Here are the questions:
        ${questions.map((question, i) => (
            question.givenAnswer ? `
            ${i + 1}.
            Question: ${question.question}
            Reference notes: ${question.answer}
            Given answer: ${question.givenAnswer}
        ` : ""
        )).join()}`;
    console.log(`Prompt:\n\n${prompt}`)
    let response = await askGroqPrompt(prompt);
    return response;
}