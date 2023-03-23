import React, { useState } from "react";
import { toPostfix, calculatePostfix } from "../../utils/parsingFunctions";
import styles from "./Input.module.css";

const Input = ({onSetExpression, onSetValidity}) => {
  const [enteredExpression, setEnteredExpression] = useState("3*2-(2*-2)");

  const submitHandler = (event) => {
    event.preventDefault();
    onSetExpression(enteredExpression)

    try {
      const res = calculatePostfix(toPostfix(enteredExpression).output)
      if(isNaN(res.answer)) throw new Error("Invalid input")
      else onSetValidity(true)
    } catch(err) {
      console.log(err)
      onSetValidity(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <input
        type="text"
        className={styles.input}
        value={enteredExpression}
        onChange={(event) => setEnteredExpression(event.target.value)}
      />
      <button className={styles["calculate-button"]}>Calculate</button>
    </form>
  );
};

export default Input;
