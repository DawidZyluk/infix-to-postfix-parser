import React from "react";
import CharactersArray from "./CharactersArray";

const PostfixArray = ({ expression }) => {
  const precedence = new Map([
    ["+", 1],
    ["-", 1],
    ["/", 2],
    ["*", 3],
    ["(", 10],
    [")", 10],
  ]);

  let output = [];
  let stack = [];
  let numberString = "";
  for (let char of expression) {
    if ((char >= "0" && char <= "9") || char === "." || char === ",")
      numberString += char;
    if (precedence.has(char)) {
      if (numberString.length > 0) {
        output.push(numberString);
        numberString = "";
      }
      while (
        stack[stack.length-1] !== '(' &&
        precedence.get(stack[stack.length - 1]) > precedence.get(char)
      ) {
        output.push(stack.pop());
      }
      if(char !== ')') stack.push(char);
      // stack.push(char);
    }
    if (char === "(") stack.push(char);
    if (char === ")") {
      while (stack[stack.length - 1] != "(" || stack.length === 0) output.push(stack.pop());
      stack.pop();
      stack.pop();
    }
    // 12-2+ 12/(2*2)*3
  }
  if(numberString !== '') output.push(numberString);
  while (stack.length > 0) output.push(stack.pop());

  console.log(output);
  return <CharactersArray data={output} name={"Postfix"} />;
};

export default PostfixArray;
