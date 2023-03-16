import React, { useState } from "react";
import styles from "./Input.module.css";

const Input = ({onSetExpression}) => {
  const [enteredExpression, setEnteredExpression] = useState("(1+2)-(2*2)");

  const submitHandler = (event) => {
    event.preventDefault();
    onSetExpression(enteredExpression)
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
