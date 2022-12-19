import React, { PropsWithChildren, useState, useEffect } from "react";
import useHttp from "../hooks/useHttp";
import { fetchQuestions, fetchCategories } from "../services/api";
import {
  Difficulty,
  QuestionState,
  Category,
  AnswerObject,
  TOTAL_QUESTIONS,
  QuestionCommand,
} from "../services/utils";
import { AppContext, contextType } from "./AppContext";

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    sendRequest: fetchCats,
    status: catsStatus,
    data: cats,
    error: catsError,
  } = useHttp(fetchCategories);
  const {
    sendRequest: getQuestion,
    status: questionsStatus,
    data: fetchedQuestions,
    error: questionsError,
  } = useHttp(fetchQuestions);

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

  useEffect(() => {
    fetchCats();
  }, []);

  // handle Categories Status
  useEffect(() => {
    if (catsStatus === "completed" && !catsError && cats) {
      setLoading(false);
      setCategories(cats);
    }
    if (catsStatus === "pending") {
      setLoading(true);
    }
    if (catsStatus === "completed" && catsError) {
      console.log(catsError);
      setLoading(false);
    }
  }, [catsStatus, cats, catsError]);

  // Handle Question status
  useEffect(() => {
    if (
      questionsStatus === "completed" &&
      !questionsError &&
      fetchedQuestions
    ) {
      console.log(fetchedQuestions);
      setQuestions(fetchedQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    }

    if (questionsStatus === "pending") setLoading(true);

    if (questionsStatus === "completed" && questionsError) {
      setLoading(false);
      console.log(questionsError);
    }
  }, [questionsStatus, questionsError, fetchedQuestions]);

  const startApp = async () => {
    setLoading(true);
    setGameOver(false);
    const command: QuestionCommand = {
      amount: TOTAL_QUESTIONS,
      difficulty,
      category: category!,
    };
    getQuestion(command);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      if (number + 1 === TOTAL_QUESTIONS) {
        setFinishGame(true);
        console.log("Finish Game");
      }
      // store answer
      const answer = e.currentTarget.value;
      // check answer
      const correct = questions[number].correct_answer === answer;
      // set score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // save answer in users answers array
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => prev.concat(answerObject));
    }
  };

  const nextQuestion = () => {
    //move to next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const finishGameHandler = () => {
    setGameOver(true);
    setFinishGame(false);
  };

  const difficultyHandler = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
  };
  const categoryHandler = (category: Category) => {
    setCategory(category);
  };
  const isDropdownOpenHandler = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  const context: contextType = {
    loading,
    questions,
    number,
    difficulty,
    categories,
    category,
    userAnswers,
    score,
    gameOver,
    finishGame,
    isDropdownOpen,
    startApp,
    checkAnswer,
    nextQuestion,
    finishGameHandler,
    difficultyHandler,
    categoryHandler,
    isDropdownOpenHandler,
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppProvider;
