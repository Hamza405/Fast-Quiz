import React, { useContext } from "react";
import { AppContext, contextType } from "../store/AppContext";
import QuestionCard from "./QuestionCard";
import { TOTAL_QUESTIONS } from "../services/utils";
import { motion } from "framer-motion";

const Questions: React.FC = () => {
  const { loading, questions, number, userAnswers, gameOver, checkAnswer } =
    useContext(AppContext) as contextType;

  return (
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
  );
};

export default Questions;
