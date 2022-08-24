import { shuffleArray } from "./utils";
import { Difficulty, Question } from "./utils";

export const fetchQuestions = async ( amount: number, difficulty: Difficulty ) => {
    const endpoint = `https://opentdb.com/api.php?amount=${ amount }&difficulty=${ difficulty }&type=multiple`;
    const data = await ( await fetch( endpoint ) ).json();
    return data.results.map( ( i: Question ) => ( {
        ...i,
        answers: shuffleArray( [ ...i.incorrect_answers, i.correct_answer ] )
    } ) );
};