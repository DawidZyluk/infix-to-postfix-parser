import {
  iterateAndPushToArray,
  caseOfNegation,
  caseOfOperator,
  caseOfRightParenthesis,
  caseOfOutputing,
} from "./helperFunctions";

export const precedence = new Map([
  ["+", 2],
  ["-", 2],
  ["/", 3],
  ["*", 3],
  ["^", 4],
  ["sin", 5],
  ["cos", 5],
  ["tan", 5],
  ["ctg", 5],
  ["ln", 5],
]);

export function toInfix(expression) {
  let output = [];
  let numberString = "";
  const operators = new Set(["+", "-", "/", "*", "(", ")", "^"]);
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
  const functionStringIterations = [];
  const explanationsLog = [];
  const output = [];
  const stack = [];
  let stringNumber = "";
  let functionString = "";

  explanationsLog.push({ type: "Start" });
  for (let index = 0; index < expression.length; index++) {
    const char = expression[index];

    if (char >= "0" && char <= "9") {
      stringNumber += char;
      explanationsLog.push({ type: "Digit" });
    }
    if (char >= "a" && char <= "z") {
      functionString += char;
      explanationsLog.push({ type: "Letter" });
    }
    if (
      (char === "-" && index === 0) ||
      (stack[stack.length - 1] === "(" &&
        char === "-" &&
        (stringNumber.length === 0 || stringNumber === "-")) ||
      (precedence.has(stack[stack.length - 1]) &&
        stringNumber.length === 0 &&
        char === "-")
    ) {
      explanationsLog.push({
        type: "Negation",
        case: caseOfNegation(stringNumber, stack, precedence, char, index),
      });
      if (!stringNumber.includes("-")) stringNumber += "-";
      else stringNumber = "";
    } else if (precedence.has(char)) {
      explanationsLog.push({
        type: "Operator",
        case: caseOfOperator(stringNumber, stack, precedence, char),
      });
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
      explanationsLog.push({
        type: "Left parenthesis",
        case: functionString.length > 0 ? true : false,
      });
      if (functionString.length > 0) {
        stack.push(functionString);
        functionString = "";
      }
      if (functionString.length > 0) {
        stack.push(functionString);
        functionString = "";
      }
      stack.push(char);
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
    iterateAndPushToArray(functionString, functionStringIterations);
    iterateAndPushToArray(stack, stackIterations);
    iterateAndPushToArray(output, outputIterations);
  }
  explanationsLog.push({
    type: "Outputing",
    case: caseOfOutputing(stringNumber, stack),
  });
  if (stringNumber.length > 0) output.push(stringNumber);
  while (stack.length > 0) output.push(stack.pop());
  stackIterations.push(stack);
  outputIterations.push(output);
  explanationsLog.push({ type: "The End" });

  return {
    output,
    stringNumberIterations,
    functionStringIterations,
    functionStringIterations,
    stackIterations,
    outputIterations,
    explanationsLog,
  };
}

export function calculatePostfix(postfix) {
  const stack = [];
  const stackIterations = [[]];

  let right;
  let left;

  for (let element of postfix) {
    if (!isNaN(element)) {
      parseFloat(element);
      stack.push(element);
    } else {
      right = parseFloat(stack.pop());
      if (element.length === 1) left = parseFloat(stack.pop());

      switch (element) {
        case "+":
          stack.push(left + right);
          break;
        case "-":
          stack.push(left - right);
          break;
        case "*":
          stack.push(left * right);
          break;
        case "/":
          stack.push(left / right);
          break;
        case "^":
          stack.push(left ** right);
          break;
        case "sin":
          stack.push(Math.sin(right));
          break;
        case "cos":
          stack.push(Math.cos(right));
          break;
        case "tan":
          stack.push(Math.tan(right));
          break;
        case "ctg":
          stack.push((1 / Math.tan(right)));
          break;
        case "ln":
          stack.push(Math.log(right));
          break;
        default:
          throw new Error(`Invalid element: ${element}`);
      }
    }
    iterateAndPushToArray(stack, stackIterations);
  }

  stackIterations.push([], []);
  return {
    answer: stack.pop(),
    stackIterations,
  };
}
