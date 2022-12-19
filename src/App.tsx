import React, { useContext, useEffect, useMemo, useState } from "react";
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
import { TOTAL_QUESTIONS, TITLE } from "./services/utils";
import useHttp from "./hooks/useHttp";
import Score from "./components/Score";
import OptionSelector from "./components/OptionSelector";
import { AppContext, contextType } from "./store/AppContext";

const App: React.FC = () => {
  const {
    loading,
    questions,
    number,
    categories,
    isDropdownOpen,
    userAnswers,
    score,
    gameOver,
    finishGame,
    startApp,
    checkAnswer,
    nextQuestion,
    finishGameHandler,
    difficultyHandler,
    categoryHandler,
    isDropdownOpenHandler,
  } = useContext(AppContext) as contextType;

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

  return (
    <Wrapper>
      {TitleComponent}
      {finishGame && (
        <Button
          isDropDown={isDropdownOpen}
          type="again"
          onClick={finishGameHandler}
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
