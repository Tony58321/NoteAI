import { askGroqPrompt  } from './groqAPI.js';


export default async function GroqQuestCheck(question, answer, reference) {
    const prompt = `
        You will be presented with a question, a given answer, and a reference answer to the question.
        Determine if the given answer reasonably answers the given question, and is accurate to the reference answer.
        Then, give a breif one or two sentence response. Your response should include these things:
        1. A statement of the accuracy of the given answer in relation to the question and the reference answer. If the given answer is incorrect, say the correct answer.
        2. An encouraging remark for the person answering the question.
        
        Here is the given question: ${question}
        
        Here is the given answer: ${answer}
        
        Here is the reference answer: ${reference}`;
    let response = await askGroqPrompt(prompt);
    return response;
}