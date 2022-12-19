import React, { useEffect, useMemo, useState } from "react";
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
  QuestionCommand,
  QuestionState,
  AnswerObject,
  TOTAL_QUESTIONS,
  TITLE,
  Category,
} from "./services/utils";
import useHttp from "./hooks/useHttp";
import Score from "./components/Score";
import OptionSelector from "./components/OptionSelector";

const App: React.FC = () => {
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

  const difficultyHandler = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
  };
  const categoryHandler = (category: Category) => {
    setCategory(category);
  };
  const isDropdownOpenHandler = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  const TitleComponent = useMemo(() => <Title title={TITLE} />, []);
  const ScoreComponent = useMemo(
    () => <Score score={score} totalQuestions={TOTAL_QUESTIONS} />,
    [score]
  );
  const OptionSelectorComponent = useMemo(
    () => (
      <OptionSelector
        difficultyHandler={difficultyHandler}
        isDropdownOpenHandler={isDropdownOpenHandler}
        categories={categories}
        categoryHandler={categoryHandler}
      />
    ),
    [categories]
  );

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

  // Get The questions and start the game
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

  const FinishGameHandler = () => {
    setGameOver(true);
    setFinishGame(false);
  };

  return (
    <Wrapper>
      {TitleComponent}
      {finishGame && (
        <Button
          isDropDown={isDropdownOpen}
          type="again"
          onClick={FinishGameHandler}
          buttonTitle="Play Again"
        />
      )}
      {!finishGame &&
        (gameOver || userAnswers.length === TOTAL_QUESTIONS) &&
        !loading && (
          <>
            {OptionSelectorComponent}
            <Button
              isDropDown={isDropdownOpen}
              type="start"
              onClick={startApp}
              buttonTitle="Start"
            />
          </>
        )}
      {!gameOver && !loading && ScoreComponent}
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
          <Button
            isDropDown={isDropdownOpen}
            type="next"
            buttonTitle="Next"
            onClick={nextQuestion}
          />
        )}
    </Wrapper>
  );
};

export default App;
