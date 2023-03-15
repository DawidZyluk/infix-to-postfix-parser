import React, { useState } from "react";
import CharactersArray from "./CharactersArray";
import styles from "./Explanation.module.css";

const Explanation = ({ infix, postfixData }) => {
  const [index, setIndex] = useState(0);

  const currentStringNumberIteration = postfixData.stringNumberIterations[index]
  const currentStackStep = postfixData.stackIterations[index]
  const currentOutputStep = postfixData.outputIterations[index]

  const maxIndex = postfixData.stackIterations.length;

  const clickHandler = (step) => {
    if(index + step >= 0 && index + step < maxIndex) setIndex(prevState => prevState + step)
  }

  return (
    <>
      <div className={styles.controls}>
        <button onClick={() => setIndex(0)}>{`<<`}</button>
        <button onClick={() => clickHandler(-1)}>{`<`}</button>
        <button onClick={() => clickHandler(1)}>{`>`}</button>
        <button onClick={() => setIndex(maxIndex-1)}>{`>>`}</button>
      </div>
      <CharactersArray data={infix} name={"Characters"} current={index} fixed="true"/>
      <CharactersArray data={currentStringNumberIteration} name={"String"} fixed="true"/>
      <CharactersArray data={currentStackStep} name={"Stack"} fixed="true"/>
      <CharactersArray data={currentOutputStep} name={"Output"} fixed="true"/>
    </>
  );
};

export default Explanation;
