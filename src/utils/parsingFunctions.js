import {
  iterateAndPushToArray,
  caseOfNegation,
  caseOfOperator,
  caseOfRightParenthesis,
  caseOfOutputing,
} from "./helperFunctions";

const precedence = new Map([
  ["+", 2],
  ["-", 2],
  ["/", 3],
  ["*", 3],
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
  const stackIterations = [];
  const outputIterations = [];
  const stringNumberIterations = [];
  const explanationsLog = [];
  const output = [];
  const stack = [];
  let stringNumber = "";

  explanationsLog.push({ type: "Start" });
  for (let index = 0; index < expression.length; index++) {
    const char = expression[index];

    if (char >= "0" && char <= "9") {
      stringNumber += char;
      explanationsLog.push({ type: "Digit" });
    }
    if (
      (char === "-" && index === 0) ||
      (stack[stack.length - 1] === "(" && char === "-") ||
      (precedence.has(stack[stack.length - 1]) &&
        stringNumber.length === 0 &&
        char !== "(")
    ) {
      explanationsLog.push({ type: "Negation", case: caseOfNegation(stringNumber, stack, precedence, char, index) });
      stringNumber += "-";
    } else if (precedence.has(char)) {
      explanationsLog.push({ type: "Operator", case: caseOfOperator(stringNumber, stack, precedence, char) });
      if (stringNumber.length > 0) {
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
    if (char === "(") {
      stack.push(char);
      explanationsLog.push({
        type: "Left parenthesis",
      });
    }
    if (char === ")") {
      explanationsLog.push({
        type: "Right parenthesis",
        case: caseOfRightParenthesis(stringNumber, stack),
      });
      if (stringNumber.length > 0) {
        output.push(stringNumber);
        stringNumber = "";
      }
      while (stack[stack.length - 1] !== "(" && stack.length > 0) {
        output.push(stack.pop());
      }
      stack.pop();
    }

    iterateAndPushToArray(stringNumber, stringNumberIterations);
    iterateAndPushToArray(stack, stackIterations);
    iterateAndPushToArray(output, outputIterations);
  }
  explanationsLog.push({ type: "Outputing", case: caseOfOutputing(stringNumber, stack) });
  if (stringNumber.length > 0) output.push(stringNumber);
  while (stack.length > 0) output.push(stack.pop());
  stackIterations.push(stack);
  outputIterations.push(output);
  explanationsLog.push({ type: "The End" });

  return {
    output,
    stringNumberIterations,
    stackIterations,
    outputIterations,
    explanationsLog,
  };
}
