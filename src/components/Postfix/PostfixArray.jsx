import React, {useState} from 'react'
import CharactersArray from '../CharactersArray';
import { toPostfix } from '../../utils/parsingFunctions';

import styles from "./PostfixArray.module.css"
import PostfixExplanation from './PostfixExplanation';

const PostfixArray = ({expression}) => {
  const [showExplanation, setShowExplanation] = useState(false)

  const postfixData = toPostfix(expression);
  console.log(postfixData)

  return (
    <div className={styles.postfix}>
      <CharactersArray data={postfixData.output} name={"Postfix array:"} />
      <button className={styles.button} onClick={() => setShowExplanation(!showExplanation)}>{!showExplanation && "?"}</button>
      {showExplanation && <PostfixExplanation postfixData={postfixData} expression={expression} onClose={() => setShowExplanation(!showExplanation)}/>}
    </div>
  )
}

export default PostfixArray