import "./pages/global.css"
import type { FC, ReactElement } from "react"
import QuizCore from "./pages/quizGame/QuizCore";

import { QuizProvider } from "./contexts/QuizContext";

const Game2:FC = ():ReactElement => {
  return (
    <>
        <QuizProvider>
        <QuizCore />
        </QuizProvider>
    </>
  );
}

export default Game2;
