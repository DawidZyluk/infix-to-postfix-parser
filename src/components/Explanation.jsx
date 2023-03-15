import React, { useState } from "react";
import CharactersArray from "./CharactersArray";
import styles from "./Explanation.module.css";

const Explanation = ({ infix, postfixData }) => {
  const [index, setIndex] = useState(0);

  const clickHandler = (step) => {
    if(index + step >= 0 && index + step < infix.length) setIndex(prevState => prevState + step)
  }

  const currentStackStep = postfixData.stackIterations[index-1]
  const currentOutputStep = postfixData.outputIterations[index]

  console.log(postfixData)

  return (
    <>
      <div className={styles.controls}>
        <button onClick={() => setIndex(0)}>{`<<`}</button>
        <button onClick={() => clickHandler(-1)}>{`<`}</button>
        <button onClick={() => clickHandler(1)}>{`>`}</button>
        <button onClick={() => setIndex(infix.length-1)}>{`>>`}</button>
      </div>
      <CharactersArray data={infix} name={"Infix"} current={index} fixed="true"/>
      <CharactersArray data={currentStackStep} name={"Stack"} fixed="true"/>
      <CharactersArray data={currentOutputStep} name={"Output"} fixed="true"/>
    </>
  );
};

export default Explanation;
