import React, {useState} from 'react'
import ExplanationText from "./ExplanationText";
import Explanation from '../Explanation';
import CharactersArray from '../CharactersArray';
import { toPostfix } from '../../utils/parsingFunctions';

const AnswerExplanation = ({expression, answerData, onClose}) => {
  const [index, setIndex] = useState(0);

  console.log(answerData)
  const maxIndex = answerData.stackIterations.length;

  return (
    <Explanation index={index} maxIndex={maxIndex} onSetIndex={(index) => setIndex(index)} onClose={onClose}>
      <CharactersArray data={toPostfix(expression).output} current={index} name={"Postfix array:"} />
    </Explanation>
  )
}

export default AnswerExplanation