import React from "react";
import CharactersArray from "./CharactersArray";

const PostfixArray = ({ expression }) => {
  const precedence = new Map([
    ["+", 1],
    ["-", 1],
    ["*", 2],
    ["/", 2],
  ]);

  let output = [];
  let stack = [];
  let numberString = "";
  for (let char of expression) {
    if (precedence.has(char)) {
      if (numberString.length > 0) output.push(numberString);
      numberString = "";
      while (stack.length > 0 && precedence[-1] > precedence[char]) {
        output.push(stack.pop());
      }
      stack.push(char);
    } else {
      numberString += char;
    }
    if(char === '(') stack.push(char)
    if(char === ')') {
      while(stack[-1] != '(') output.push(stack.pop());
      stack.pop();
    }
  }
  output.push(numberString);
  while (stack.length > 0) output.push(stack.pop());
  return <CharactersArray data={output} name={"Postfix"} />;
};

export default PostfixArray;
