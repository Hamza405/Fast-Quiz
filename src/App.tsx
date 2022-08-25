import React, { useState } from "react";

//components
import QuestionCard from "./components/QuestionCard";
import Title from "./components/Title";
import Button from "./components/Button";
import Loading from "./components/Loading";
//api
import { fetchQuestions } from "./services/api";
// types
import { Difficulty, QuestionState, AnswerObject, TOTAL_QUESTIONS } from "./services/utils";



const App: React.FC = () => {
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

  const nextQuestion = () => {
    //move to next question if not the last question
    const nextQuestion = number + 1;
    if( nextQuestion === TOTAL_QUESTIONS ) {
      setgameOver( true );
    } else {
      setNumber( nextQuestion );
    }
  };

  return (
    <div
      className="p-6 m-w-full bg-fill flex flex-col justify-start items-center"
      style={ { backgroundImage: "url('/background.jpg')", height: '100vh' } }
    >
      <Title title="Fast Quiz" />
      { (
        gameOver
        || userAnswers.length === TOTAL_QUESTIONS ) && <Button onClick={ startApp } buttonTitle="Start" /> }
      { !gameOver && !loading && <p className="text-xl text-white">Score: { score }</p> }
      { loading && <Loading /> }
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
        && !loading
        && userAnswers.length
        === number + 1
        && number !== TOTAL_QUESTIONS - 1
        && <Button buttonTitle="Next" onClick={ nextQuestion } />
      }
    </div>
  );
};

// function App () {
//   return (
//     <h1 className="text-3xl font-bold underline text-red-600">
//       Simple React Typescript Tailwind Sample
//     </h1>
//   );
// }

export default App;
