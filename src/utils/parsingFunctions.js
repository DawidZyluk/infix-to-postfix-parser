const precedence = new Map([
  ["+", 2],
  ["-", 2],
  ["/", 3],
  ["*", 3],
  // ["(", 10],
  // [")", 10],
]);

export function toInfix(expression) {
  let output = [];
  let numberString = "";
  const operators = new Set(["+", "-", "/", "*", "(", ")"]);
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
  return output;
}

export function toPostfix(expression) {
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
        stack[stack.length - 1] !== "(" &&
        precedence.get(stack[stack.length - 1]) > precedence.get(char)
      ) {
        output.push(stack.pop());
      }
      // if(char !== ')') stack.push(char);
      stack.push(char);
    }
    if (char === "(") stack.push(char);
    if (char === ")") {
      while (stack[stack.length - 1] != "(" || stack.length === 0)
        output.push(stack.pop());
        if(stack[stack.length - 1] === '(') stack.pop();
    }

    // 4/(2+2)*2
    // 4 2 2 + / 2 *
  }
  if (numberString !== "") output.push(numberString);
  while (stack.length > 0) output.push(stack.pop());

  return output;
}

