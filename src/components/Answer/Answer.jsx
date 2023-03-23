import React, {useState} from 'react'
import styles from './Answer.module.css'
import AnswerExplanation from './AnswerExplanation'
import {  toPostfix, calculatePostfix } from '../../utils/parsingFunctions'

const Answer = ({expression}) => {
  const [showExplanation, setShowExplanation] = useState(false)
  
  const postfixData = toPostfix(expression);
  const answerData = calculatePostfix(postfixData.output);
  
  return (
    <div className={styles.answer}>
      Answer: {answerData.answer}
      <button className={styles.button} onClick={() => setShowExplanation(!showExplanation)}>{!showExplanation && "?"}</button>
      {showExplanation && <AnswerExplanation expression={expression} answerData={answerData} onClose={() => setShowExplanation(!showExplanation)}/>}
    </div>
    
  )
}

export default Answer