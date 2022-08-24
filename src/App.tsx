//https://opentdb.com/api.php?amount=10
import React from "react";
import QuestionCard from "./components/QuestionCard";

const App = () => {

  const startApp = async () => { }

  const checkAnswer = ( e: React.MouseEvent<HTMLButtonElement> ) => { }

  const nextQuestion = () => { }

  return (
    <div className="App">
      <h1>Quiz</h1>
      <button className="start" onClick={ startApp }>Start</button>
      <p>Score:</p>
      <h4>Loading...</h4>
      <QuestionCard />
      <button className="next" onClick={ nextQuestion }>Next</button>
    </div>
  );
}

export default App;
