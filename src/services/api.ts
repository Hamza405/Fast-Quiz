import { shuffleArray } from "./utils";
import { QuestionCommand, Question,Category } from "./utils";


export const fetchQuestions = async (obj:QuestionCommand ) => {
    const endpoint = `https://opentdb.com/api.php?amount=${ obj.amount }&difficulty=${ obj.difficulty }&type=multiple&category=${obj.category.id}`;
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