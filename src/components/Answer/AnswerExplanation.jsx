import React, {useState} from 'react'
import ExplanationText from "./ExplanationText";
import Explanation from '../Explanation';
import CharactersArray from '../CharactersArray';

const AnswerExplanation = ({onClose}) => {
  const [index, setIndex] = useState(0);

  const maxIndex = postfixData.explanationsLog.length;

  return (
    <Explanation index={index} maxIndex={maxIndex} onSetIndex={(index) => setIndex(index)} onClose={onClose}>
      
    </Explanation>
  )
}

export default AnswerExplanation