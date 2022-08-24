import React, { useState } from "react";

//components
import QuestionCard from "./components/QuestionCard";
//api
import { fetchQuestions, Difficulty, QuestionState } from "./services/api";

const TOTAL_QUESTIONS = 10;
type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string;
};

const App = () => {
  const [ loading, setLoading ] = useState( false );
  const [ questions, setQuestions ] = useState<QuestionState[]>( [] );
  const [ number, setNumber ] = useState( 0 );
  const [ userAnswers, setUserAnswers ] = useState<AnswerObject[]>( [] );
  const [ score, setScore ] = useState( 0 );
  const [ gameOver, setgameOver ] = useState( true );

  const startApp = async () => {
    setLoading( true );
    setgameOver( false );

    const newQuestions = await fetchQuestions( TOTAL_QUESTIONS, Difficulty.EASY );
    setQuestions( newQuestions );
    setScore( 0 );
    setUserAnswers( [] );
    setNumber( 0 );
    setLoading( false );
  };
  console.log( questions );



  const checkAnswer = ( e: React.MouseEvent<HTMLButtonElement> ) => {
    if( !gameOver ) {
      // store answer
      const answer = e.currentTarget.value;
      // check answer
      const correct = questions[ number ].correct_answer === answer;
      // set score if answer is correct
      if( correct ) setScore( prev => prev + 1 );
      // save answer in users answers array
      const answerObject = {
        question: questions[ number ].question,
        answer,
        correct,
        correctAnswer: questions[ number ].correct_answer
      };
      setUserAnswers( prev => prev.concat( answerObject ) );
    }
  };

  const nextQuestion = () => { };

  return (
    <div className="App">
      <h1>Quiz</h1>
      { (
        gameOver
        || userAnswers.length === TOTAL_QUESTIONS ) && <button className="start"
          onClick={
            startApp
          }>Start</button> }
      { !gameOver && <p>Score:</p> }
      { loading && <h4>Loading...</h4> }
      { !loading && !gameOver && (
        <QuestionCard
          questionNumber={ number + 1 }
          totalQuestions={ TOTAL_QUESTIONS }
          question={ questions[ number ].question }
          answers={ questions[ number ].answers }
          userAnswer={ userAnswers ? userAnswers[ number ] : undefined }
          callback={ checkAnswer } />
      ) }
      { !gameOver
        && !loading &&
        userAnswers.length
        === number + 1 && number !== TOTAL_QUESTIONS - 1 && <button className="next"
          onClick={
            nextQuestion
          }>Next</button> }
    </div>
  );
};

export default App;
