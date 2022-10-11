import { shuffleArray } from "./utils";
import { Difficulty, Question,Category } from "./utils";

export const fetchQuestions = async ( amount: number, difficulty: Difficulty,category:Category ) => {
    const endpoint = `https://opentdb.com/api.php?amount=${ amount }&difficulty=${ difficulty }&type=multiple&category=${category.id}`;
    console.log(endpoint)
    const data = await ( await fetch( endpoint ) ).json();
    return data.results.map( ( i: Question ) => ( {
        ...i,
        answers: shuffleArray( [ ...i.incorrect_answers, i.correct_answer ] )
    } ) );
};

export const fetchCategories = async ()=>{
    const endpoint = "https://opentdb.com/api_category.php"
    const data = await (await fetch(endpoint)).json();
    return data.trivia_categories.map((item:Category)=>item)
}