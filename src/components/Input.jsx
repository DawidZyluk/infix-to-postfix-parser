import React, { useState } from "react";
import styles from "./Input.module.css";

const Input = ({onSetExpression}) => {
  const [enteredExpression, setEnteredExpression] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    onSetExpression(enteredExpression)
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={enteredExpression}
        onChange={(event) => setEnteredExpression(event.target.value)}
      />
      <button>Calculate</button>
    </form>
  );
};

export default Input;
