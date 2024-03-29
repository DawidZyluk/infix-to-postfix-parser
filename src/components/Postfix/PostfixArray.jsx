import React, {useState} from 'react'
import CharactersArray from '../CharactersArray';
import { toPostfix } from '../../utils/parsingFunctions';

import styles from "./PostfixArray.module.css"
import PostfixExplanation from './PostfixExplanation';

const PostfixArray = ({expression}) => {
  const [showExplanation, setShowExplanation] = useState(false)

  const postfixData = toPostfix(expression);
  // console.log(postfixData.functionStringIterations)

  return (
    <div className={styles["postfix-wrapper"]}>
      <div className={styles.postfix}>
      <CharactersArray data={postfixData.output} name={"Postfix array:"} />
      {showExplanation && <PostfixExplanation postfixData={postfixData} expression={expression} onClose={() => setShowExplanation(!showExplanation)}/>}
    </div>
    <button className={styles.button} onClick={() => setShowExplanation(!showExplanation)}>{!showExplanation && "?"}</button>
    </div>
  )
}

export default PostfixArray