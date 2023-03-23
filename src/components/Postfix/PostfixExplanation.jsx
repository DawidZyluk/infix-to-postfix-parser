import React, {useState} from 'react'
import ExplanationText from "./ExplanationText";
import Explanation from '../Explanation';
import CharactersArray from '../CharactersArray';

const PostfixExplanation = ({postfixData, expression, onClose}) => {
  const [index, setIndex] = useState(0);

  const maxIndex = postfixData.explanationsLog.length;

  const currentStringNumberIteration = postfixData.stringNumberIterations[index-2];
  const currentFunctionStringIteration = postfixData.functionStringIterations[index-2];
  const currentStackStep = postfixData.stackIterations[index-2];
  const currentOutputStep = postfixData.outputIterations[index-2];
  const currentExplanation = postfixData.explanationsLog[index];

  return (
    <Explanation index={index} maxIndex={maxIndex} onSetIndex={(index) => setIndex(index)} onClose={onClose}>
      <ExplanationText operatorType={currentExplanation.type} explanationCase={currentExplanation.case}/>
      <CharactersArray data={expression} name={"Characters array:"} current={index-1} fixed="true"/>
      <CharactersArray data={currentStringNumberIteration} name={"String number:"} fixed="true"/>
      <CharactersArray data={currentFunctionStringIteration} name={"Function string:"} fixed="true"/>
      <CharactersArray data={currentStackStep} name={"Stack array:"} fixed="true"/>
      <CharactersArray data={currentOutputStep} name={"Output array:"} fixed="true"/>
    </Explanation>
  )
}

export default PostfixExplanation