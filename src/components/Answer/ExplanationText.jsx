import React from 'react'
import styles from './ExplanationText.module.css'

import { precedence } from '../../utils/parsingFunctions'

const ExplanationText = ({operatorType, data, index, maxIndex}) => {

  const renderText = () => {

    if(index === 0) return <div className={styles.text}><div className={styles.title}>Start</div>Start the step by step visualization</div>
    if(precedence.has(operatorType)) return <div className={styles.text}><div className={styles.title}>Operator</div>If character is an operator take two last elements ({data[index-1][0]} and {data[index-1][1]}) of the stack. Execute current operation ({data[index-1][0]} {operatorType} {data[index-1][1]}). Then put the result ({data[index][data[index].length-1]}) on top of the stack</div>
    if(index === maxIndex-2) return <div className={styles.text}><div className={styles.title}>End</div>If it is the end of postfix expression save top element of the stack as answer and then pop it</div>
    if(index === maxIndex-1) return <div className={styles.text}><div className={styles.title}>Answer</div>Start the step by step visualization</div>
    else return <div className={styles.text}><div className={styles.title}>Number</div>If character is a number put it on top of the stack</div>
  }
  
  return (
    <>
      {renderText()}
    </>
  )
} 

export default ExplanationText