import React,{ createContext } from "react";
import { Difficulty, QuestionState,Category, AnswerObject } from "../services/utils";

// const AppContext = createContext({
//     loading : false,
//     questions : [],
//     number:0,
//     difficulty:Difficulty.EASY,
//     categories:[],
//     category:{},
//     userAnswers:[],
//     score:0,
//     gameOver:true,
//     finishGame:false,
//     startGame:()=>{},
//     checkAnswer:(e: React.MouseEvent<HTMLButtonElement>)=>{},
//     nextQuestion:()=>{},
//     finishGameAction:()=>{}
// })

export interface contextType  {
    loading:boolean;
    questions:QuestionState[];
    number:number;
    difficulty:Difficulty;
    categories:Category[];
    category:Category|undefined;
    userAnswers:AnswerObject[];
    score:number;
    gameOver:boolean;
    finishGame:boolean;
    isDropdownOpen:boolean
}

export const AppContext = createContext<contextType | null>(null)

