import React, {useState} from 'react'
import ExplanationText from "./ExplanationText";
import Explanation from '../Explanation';
import CharactersArray from '../CharactersArray';
import { toPostfix } from '../../utils/parsingFunctions';

const AnswerExplanation = ({expression, answerData, onClose}) => {
  const [index, setIndex] = useState(0);

  const postfixExpression = toPostfix(expression).output;
  const maxIndex = answerData.stackIterations.length;
  return (
    <Explanation index={index} maxIndex={maxIndex} onSetIndex={(index) => setIndex(index)} onClose={onClose}>
      <ExplanationText operatorType={postfixExpression[index-1]} data={answerData.stackIterations} index={index} maxIndex={maxIndex}/>
      <CharactersArray data={postfixExpression} current={index-1} name={"Postfix array:"} fixed="true"/>
      <CharactersArray data={answerData.stackIterations[index-1]} name={"Stack array:"} fixed="true"/>
      <p style={{fontSize: "2.5rem", width: "100%", paddingLeft: "15.6rem", marginTop: ".3rem"}}>Answer: {index === maxIndex-1 ? answerData.answer : null}</p>
    </Explanation>
  )
}

export default AnswerExplanation