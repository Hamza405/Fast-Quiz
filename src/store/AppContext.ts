import React,{ createContext } from "react";
import { Difficulty, QuestionState,Category, AnswerObject } from "../services/utils";

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
    isDropdownOpen:boolean;
    startApp:  ()=>void;
    checkAnswer:(e: React.MouseEvent<HTMLButtonElement>)=>void;
    nextQuestion:()=>void;
    finishGameHandler:()=>void;
    difficultyHandler:(difficulty:Difficulty)=>void;
    categoryHandler:(category: Category)=>void;
    isDropdownOpenHandler:(isOpen:boolean)=>void;
    setCategoriesHandler:(cats:Category[])=>void;
    setLoadingHandler:(loading:boolean)=>void
}

export const AppContext = createContext<contextType | null>(null)

