import React, {useState} from 'react'
import CharactersArray from './CharactersArray';
import Explanation from './Explanation';
import { toPostfix } from '../utils/parsingFunctions';
import ExplanationText from "./ExplanationText";
import styles from "./PostfixArray.module.css"

const PostfixArray = ({expression}) => {
  const [showExplanation, setShowExplanation] = useState(false)
  const [index, setIndex] = useState(0);

  const postfixData = toPostfix(expression);
  const maxIndex = postfixData.explanationsLog.length;

  const currentStringNumberIteration = postfixData.stringNumberIterations[index-2];
  const currentStackStep = postfixData.stackIterations[index-2];
  const currentOutputStep = postfixData.outputIterations[index-2];
  const currentExplanation = postfixData.explanationsLog[index];

  return (
    <div className={styles.postfix}>
      <CharactersArray data={postfixData.output} name={"Postfix array:"} />
      <button className={styles.button} onClick={() => setShowExplanation(!showExplanation)}>{!showExplanation && "?"}</button>
      {showExplanation && 
      <Explanation index={index} maxIndex={maxIndex} onSetIndex={(index) => setIndex(index)} onClose={() => setShowExplanation(!showExplanation)}>
        <ExplanationText operatorType={currentExplanation.type} explanationCase={currentExplanation.case}/>
        <CharactersArray data={expression} name={"Characters array:"} current={index-1} fixed="true"/>
        <CharactersArray data={currentStringNumberIteration} name={"String number:"} fixed="true"/>
        <CharactersArray data={currentStackStep} name={"Stack array:"} fixed="true"/>
        <CharactersArray data={currentOutputStep} name={"Output array:"} fixed="true"/>
      </Explanation>}
    </div>
  )
}

export default PostfixArray