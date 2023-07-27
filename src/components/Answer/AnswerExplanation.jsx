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
      <hr />
      <CharactersArray data={answerData.stackIterations[index-1]} name={"Stack array:"} fixed="true"/>
      <CharactersArray data={index === maxIndex-1 ? [[answerData.answer]] : null} name={"Answer:"} fixed="true"/>
    </Explanation>
  )
}

export default AnswerExplanation