import React, { useState } from "react";
import CharactersArray from "./CharactersArray";
import styles from "./Explanation.module.css";

const Explanation = ({ data }) => {
  const [index, setIndex] = useState(0);

  const clickHandler = (step) => {
    if(index + step >= 0 && index + step < data.length) setIndex(prevState => prevState + step)
  }

  return (
    <>
      <div className={styles.controls}>
        <button onClick={() => setIndex(0)}>{`<<`}</button>
        <button onClick={() => clickHandler(-1)}>{`<`}</button>
        <button onClick={() => clickHandler(1)}>{`>`}</button>
        <button onClick={() => setIndex(data.length-1)}>{`>>`}</button>
      </div>
      <CharactersArray data={data} name={"Infix"} current={index} fixed="true"/>
      <CharactersArray data={data} name={"Stack"} fixed="true"/>
      <CharactersArray data={data} name={"Output"} fixed="true"/>
    </>
  );
};

export default Explanation;
