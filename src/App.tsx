//https://opentdb.com/api.php?amount=10
import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";

const TOTAL_QUESTIONS = 10

const App = () => {
  const [ loading, setLoading ] = useState( false );
  const [ questions, setQuestions ] = useState( [] );
  const [ number, setNumber ] = useState( 0 );
  const [ userAnswers, setUserAnswers ] = useState( [] );
  const [ score, setScore ] = useState( 0 );
  const [ gameOver, setgameOver ] = useState( true );

  const startApp = async () => { }

  const checkAnswer = ( e: React.MouseEvent<HTMLButtonElement> ) => { }

  const nextQuestion = () => { }

  return (
    <div className="App">
      <h1>Quiz</h1>
      <button className="start" onClick={ startApp }>Start</button>
      <p>Score:</p>
      <h4>Loading...</h4>
      <QuestionCard questionNumber={ number + 1 }
        totalQuestions={ TOTAL_QUESTIONS }
        question={ questions[ number ].question }
        answers={ questions[ number ].answers }
        userAnswer={ userAnswers ? userAnswers[ number ] : undefined }
        callback={ checkAnswer } />
      <button className="next" onClick={ nextQuestion }>Next</button>
    </div>
  );
}

export default App;
