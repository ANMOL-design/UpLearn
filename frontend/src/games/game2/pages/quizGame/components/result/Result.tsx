import "./result.css"
import { FC, ReactElement, useContext } from "react"
import { QuizContext, allowedActions } from "../../../../contexts/QuizContext"
import { getStarsIcons } from "../../../../helpers/getIcons"

const ShowResult:FC = ():ReactElement => {
  
  const quizContext = useContext(QuizContext)
  const dispatch = quizContext?.dispatch

  const totalQuestions = quizContext!.state.questions.length
  const correctAnswers = quizContext!.state.assertedAnswersCount
  const score = quizContext?.state.score 
 
  const calcAssertPercetage = () => {
    const assertPercetage = (correctAnswers * 100) / totalQuestions
    return assertPercetage
  }

  return (
    <div className="result-wrap">
      
      <div className="result-header">
        <p>Congratulations 👏👏👏</p>
      </div>
      
      <div className="result-body container">
        
        <small className="stars-wrap">
          {getStarsIcons(calcAssertPercetage())}
        </small>
        
        <div className="score-wrap">
          <small>Score: </small>
          <small className="score-amount">{score}</small>
        </div>

        <span>Got {correctAnswers} out of {totalQuestions} questions right</span>
        
        <button 
          className="reset-btn"
          onClick={() => dispatch && dispatch({type:allowedActions.RESET_GAME, payload:null})}
        >
          Next Game
        </button>

      </div>
    </div>
  )
}

export default ShowResult
