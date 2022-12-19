import React, { useContext, useMemo } from "react";
//components
import Title from "./components/Title";
import Button from "./components/Button";
import Loading from "./components/Loading";
import Wrapper from "./components/Wrapper";
// types
import { TOTAL_QUESTIONS, TITLE } from "./services/utils";
import Score from "./components/Score";
import OptionSelector from "./components/OptionSelector";
import { AppContext, contextType } from "./store/AppContext";
import Questions from "./components/Questions";

const App: React.FC = () => {
  const {
    loading,
    number,
    isDropdownOpen,
    userAnswers,
    score,
    gameOver,
    finishGame,
    startApp,
    nextQuestion,
    finishGameHandler,
  } = useContext(AppContext) as contextType;

  const TitleComponent = useMemo(() => <Title title={TITLE} />, []);
  const ScoreComponent = useMemo(
    () => <Score score={score} totalQuestions={TOTAL_QUESTIONS} />,
    [score]
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
            <OptionSelector />
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
      {!loading && !gameOver && <Questions />}
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
