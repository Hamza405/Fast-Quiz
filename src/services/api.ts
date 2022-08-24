import { shuffleArray } from "./utils"

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"

}

export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    type: string,
    question: string
}

export type QuestionState = Question & { answers: string[] }

export const fetchQuestions = async ( amount: number, difficulty: Difficulty ) => {
    const endpoint = `https://opentdb.com/api.php?amount=${ amount }&difficulty=${ difficulty }&type=multiple`;
    const data = await ( await fetch( endpoint ) ).json();
    return data.results.map( ( i: Question ) => ( {
        ...i,
        answers: shuffleArray( [ ...i.incorrect_answers, i.correct_answer ] )
    } ) )
}