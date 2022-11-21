export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"

}

export type Category = {
    id:number,
    name:string
}

export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    type: string,
    question: string;
};

export type QuestionState = Question & { answers: string[]; };

export const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
    question: string,
    answer: string,
    correct: boolean,
    correctAnswer: string;
};

export type QuestionCommand = {
    amount: number, difficulty: Difficulty,category:Category
}

export const shuffleArray = ( array: any[] ) => [ ...array ].sort( () => Math.random() - 0.5 );