import React, {useState} from 'react'
import CharactersArray from './CharactersArray';
import Explanation from './Explanation';
import { toPostfix } from '../utils/parsingFunctions';
import styles from "./PostfixArray.module.css"

const PostfixArray = ({expression}) => {
  const [showExplanation, setShowExplanation] = useState(false)
  const postfixData = toPostfix(expression);
  return (
    <div className={styles.postfix}>
      <CharactersArray data={postfixData.output} name={"Postfix array:"} />
      <button className={styles.button} onClick={() => setShowExplanation(!showExplanation)}>{!showExplanation && "?"}</button>
      {showExplanation && <Explanation infix={expression} postfixData={postfixData} onClose={() => setShowExplanation(!showExplanation)}/> }
    </div>
  )
}

export default PostfixArray