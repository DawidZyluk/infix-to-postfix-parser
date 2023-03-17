import React, { useState } from "react";
import CharactersArray from "./CharactersArray";
import styles from "./Explanation.module.css";
import ExplanationText from "./ExplanationText";
import Modal from "./Modal";

const Explanation = ({ infix, postfixData, onClose }) => {
  const [index, setIndex] = useState(0);

  const currentStringNumberIteration = postfixData.stringNumberIterations[index-2]
  const currentStackStep = postfixData.stackIterations[index-2]
  const currentOutputStep = postfixData.outputIterations[index-2]
  const currentExplanation = postfixData.explanationsLog[index]

  const maxIndex = postfixData.explanationsLog.length;

  const clickHandler = (step) => {
    if(index + step >= 0 && index + step < maxIndex) setIndex(prevState => prevState + step)
  }

  return (
    <Modal onClose={onClose}>
      <div className={styles.controls}>
        <button onClick={() => setIndex(0)}>{`<<`}</button>
        <button onClick={() => clickHandler(-1)}>{`<`}</button>
        <button onClick={() => clickHandler(1)}>{`>`}</button>
        <button onClick={() => setIndex(maxIndex-1)}>{`>>`}</button>
      </div>
      <div className={styles.stepsCounter}>{index+1}/{maxIndex}</div>
      <ExplanationText operatorType={currentExplanation.type} explanationCase={currentExplanation.case}/>
      <CharactersArray data={infix} name={"Characters array:"} current={index-1} fixed="true"/>
      <CharactersArray data={currentStringNumberIteration} name={"String number:"} fixed="true"/>
      <CharactersArray data={currentStackStep} name={"Stack array:"} fixed="true"/>
      <CharactersArray data={currentOutputStep} name={"Output array:"} fixed="true"/>
    </Modal>
  );
};

export default Explanation;
