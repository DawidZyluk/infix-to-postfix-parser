import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { storeExpression } from "../services/reducers/expressionReducer";
import styles from "./Input.module.css";

const Input = ({onSetExpression}) => {
  const [enteredExpression, setEnteredExpression] = useState("");

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
      <button>Calculate</button>
    </form>
  );
};

export default Input;
