import React, { PropsWithChildren, useState } from "react";
import {
  Difficulty,
  QuestionState,
  Category,
  AnswerObject,
} from "../services/utils";
import { AppContext, contextType } from "./AppContext";

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [finishGame, setFinishGame] = useState(false);

  const context: contextType = {
    loading: loading,
    questions: questions,
    number: number,
    difficulty: difficulty,
    categories: categories,
    category: category,
    userAnswers: userAnswers,
    score: score,
    gameOver: gameOver,
    finishGame: finishGame,
    isDropdownOpen: isDropdownOpen,
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppProvider;
