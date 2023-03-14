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


//1+2*3-4
// 1 2 3 * + 4 -
export function toPostfix(expression) {
  let output = [];
  let stack = [];
  let stringNumber = "";
  for (let char of expression) {
    if (char >= "0" && char <= "9") stringNumber += char;
    if (precedence.has(char)) {
      if(stringNumber.length > 0) {
        output.push(stringNumber);
        stringNumber = "";
      }
      while (
        stack[stack.length - 1] !== undefined &&
        stack[stack.length - 1] !== "(" &&
        precedence.get(stack[stack.length - 1]) >= precedence.get(char)
      ) {
        output.push(stack.pop());
      }
      stack.push(char);
    }
    if(char === '(') stack.push(char)
    if(char === ')') {
      while(stack[stack.length - 1] !== "(" && stack.length > 0){
        output.push(stack.pop())
      }
      stack.pop();
    }
  }
  while (stack.length > 0) output.push(stack.pop());
  return output;
}
