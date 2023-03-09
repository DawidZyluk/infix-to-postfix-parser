import React from "react";
import CharactersArray from "./CharactersArray";
import styles from "./InfixArray.module.css";

const InfixArray = ({ expression }) => {
  let output = [];
  let numberString = "";
  for (let char of expression) {
    if (char === "+" || char === "-" || char === "/" || char === "*") {
      if (numberString.length > 0) output.push(numberString);
      output.push(char);
      numberString = "";
    } else {
      numberString += char;
    }
  }
  if (numberString.length > 0) output.push(numberString);

  console.log(output);

  return <CharactersArray data={output} name={"Infix"} />;
};

export default InfixArray;
