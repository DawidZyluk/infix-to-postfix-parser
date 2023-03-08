import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { storeExpression } from "../services/reducers/expressionReducer";
import styles from "./Input.module.css";

const Input = () => {
  const [expression, setExpression] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(storeExpression(expression))
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={expression}
        onChange={(event) => setExpression(event.target.value)}
      />
      <button>Calculate</button>
    </form>
  );
};

export default Input;
