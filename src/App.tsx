import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

//components
import QuestionCard from "./components/QuestionCard";
import Title from "./components/Title";
import Button from "./components/Button";
import Loading from "./components/Loading";
import Wrapper from "./components/Wrapper";
import DifficultySelector from "./components/DifficultySelector";
//api
import { fetchQuestions, fetchCategories } from "./services/api";
// types
import {
  Difficulty,
  QuestionState,
  AnswerObject,
  TOTAL_QUESTIONS,
  Category,
} from "./services/utils";
import CategoriesSelector from "./components/CategoriesSelector";

const App: React.FC = () => {
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

  const difficultyHandler = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
  };
  const categoryHandler = (category: Category) => {
    setCategory(category);
  };
  const isDropdownOpenHandler = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  const fetchCats = async () => {
    setLoading(true);
    const res = await fetchCategories();
    setCategories(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const startApp = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(
      TOTAL_QUESTIONS,
      difficulty,
      category!
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
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

  const FinishGameHandler = () => {
    setGameOver(true);
    setFinishGame(false);
  };

  return (
    <Wrapper>
      <Title title="Fast Quiz" />
      {finishGame && (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
        >
          <Button onClick={FinishGameHandler} buttonTitle="Play Again" />
        </motion.div>
      )}
      {!finishGame &&
        (gameOver || userAnswers.length === TOTAL_QUESTIONS) &&
        !loading && (
          <>
            <div className="mt-10 mb-4 flex justify-between w-[85%] sm:w-1/2 md:w-1/2 xl:w-1/3">
              <DifficultySelector
                difficultyHandler={difficultyHandler}
                isOpenHandler={isDropdownOpenHandler}
              />
              <CategoriesSelector
                categories={categories}
                categoryHandler={categoryHandler}
                isOpenHandler={isDropdownOpenHandler}
              />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                y: isDropdownOpen ? 15 : 0,
                transition: { duration: 0.3 },
              }}
            >
              <Button onClick={startApp} buttonTitle="Start" />
            </motion.div>
          </>
        )}
      {!gameOver && !loading && (
        <div className="border bg-gray-200 rounded-lg bg-opacity-70 p-2 my-2 ">
          <p className="text-xl text-cyan-800 font-bold">
            Score: {score} / {TOTAL_QUESTIONS}
          </p>
        </div>
      )}
      {loading && <Loading />}
      {!loading && !gameOver && (
        <motion.div
          className="m-auto"
          animate={{
            transition: { duration: 0.2 },
            y: !gameOver
              ? !loading
                ? userAnswers.length === number + 1
                  ? number !== TOTAL_QUESTIONS - 1
                    ? -5
                    : 0
                  : 0
                : 0
              : 0,
          }}
        >
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        </motion.div>
      )}
      {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 && (
          <motion.div
            initial={{ y: "100px" }}
            animate={{ y: "0", transition: { duration: 0.3 } }}
          >
            <Button buttonTitle="Next" onClick={nextQuestion} />
          </motion.div>
        )}
    </Wrapper>
  );
};

export default App;
