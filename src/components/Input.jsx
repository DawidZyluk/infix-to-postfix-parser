import React, { useState } from "react";
import styles from "./Input.module.css";

const Input = () => {
  const [expression, setExpression] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    setExpression("");
    console.log(expression);
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
