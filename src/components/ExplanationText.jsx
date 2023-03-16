import React from 'react'
import styles from './ExplanationText.module.css'

const ExplanationText = ({operatorType, explanationCase}) => {
  const trueStatements = explanationCase?.shouldProceed.trueStatements;

  const renderText = () => {
    if(operatorType === "Digit") return <div className={styles.text}>If character is a digit append it to the strign number representation</div>
    if(operatorType === "Negation") return <div className={styles.text}>If "-" appears at the beggining of the expression or "(" is at the top of the operator stack and the incoming character is "-" or incoming char is not "(" and any other operator is at the top of the operator stack then prepend "-" to the string number representatnion</div>
    if(operatorType === "Operator") return <div className={styles.text}>If character is an operator check if string number representatnion holds any number. If <p className={`${styles.statement} ${explanationCase.stringHasValue ? styles.true : styles.unmached}`}>it does hold a number</p> push the number to the optput array and clear the string. Then while <p className={`${styles.statement} ${trueStatements.includes(0) ? styles.true : styles.false}`}>stack has any operators in it</p> and <p className={`${styles.statement} ${trueStatements.includes(1) ? styles.true : styles.false}`}>"(" is not at the top of the stack</p> and <p className={`${styles.statement} ${trueStatements.includes(2) ? styles.true : styles.false}`}>precedence of the operator at the top of the stack is greater than precedence of incominc operator</p> push what's on the top of the stack to the output array. Then push the incoming operator to the operator stack</div>
    if(operatorType === "Left parenthesis") return <div className={styles.text}>If character is a left parenthesis then push it to the operator stack</div>
    if(operatorType === "Right parenthesis") return <div className={styles.text}>If character is a right parenthesis push string number to the output array then while character at the top of the stack is not "(" and stack is not empty push operator at the top of the stack to the output array then delete the left parenthesis</div>
    if(operatorType === "The End") return <div className={styles.text}>The End</div>
  }
  
  return (
    <>
      {renderText()}
    </>
  )
} 

export default ExplanationText