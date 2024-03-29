import React, { useState } from "react";
import { toPostfix, calculatePostfix } from "../../utils/parsingFunctions";
import styles from "./Input.module.css";

const Input = ({onSetExpression, onSetValidity}) => {
  const [enteredExpression, setEnteredExpression] = useState("sin(2)+1/3-ln(2)");

  // console.log(calculatePostfix(toPostfix(enteredExpression).output))

  const submitHandler = (event) => {
    event.preventDefault();
    onSetExpression(enteredExpression)

    try {
      const res = calculatePostfix(toPostfix(enteredExpression).output)
      if(isNaN(res.answer)) throw new Error("Invalid input")
      onSetValidity(true)
    } catch(err) {
      // console.log(err)
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
      <button className={styles["calculate-button"]}>=</button>
    </form>
  );
};

export default Input;
