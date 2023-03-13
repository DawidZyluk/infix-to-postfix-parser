import React from "react";
import CharactersArray from "./CharactersArray";
import styles from "./InfixArray.module.css";

const InfixArray = ({ expression }) => {
  let output = [];
  let numberString = "";
  const operators = new Set(['+','-','/','*','(',')']);
  for (let char of expression) {
    if (operators.has(char)) {
      if (numberString.length > 0) output.push(numberString);
      output.push(char);
      numberString = "";
    } else {
      numberString += char;
    }
  }
  if (numberString.length > 0) output.push(numberString);

  // console.log(output);

  return <CharactersArray data={output} name={"Infix"} />;
};

export default InfixArray;
