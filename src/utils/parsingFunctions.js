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

  function iterateAndPushToArray(from, to) {
    function* arrayIterator(array) {
      for (let element of array) {
        yield element;
      }
    }

    let singleIteration = [];
    for (let result of arrayIterator(from)) {
      singleIteration.push(result);
    }
    to.push(singleIteration);
  }

  for (let index = 0; index < expression.length; index++) {
    const char = expression[index];

    let caseOfRightParenthesis;
    let caseOfNegation;
    let caseOfOperator;

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
      caseOfNegation = evalOr(
        char === "-" && index === 0,
        stack[stack.length - 1] === "(" && char === "-",
        precedence.has(stack[stack.length - 1]) &&
          stringNumber.length === 0 &&
          char !== "("
      );
      stringNumber += "-";
      explanationsLog.push(
        { type: "Negation", case: caseOfNegation },
        
      );
    } else if (precedence.has(char)) {
      caseOfOperator = {
        stringHasValue: stringNumber.length > 0,
        shouldProceed: evalAnd(
          stack[stack.length - 1] !== undefined,
          stack[stack.length - 1] !== "(",
          precedence.get(stack[stack.length - 1]) >= precedence.get(char)
        ),
      };
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
      explanationsLog.push(
        { type: "Operator", case: caseOfOperator },
        
      );
    }
    if (char === "(") {
      stack.push(char);
      explanationsLog.push({
        type: "Left parenthesis",
      });
    }
    if (char === ")") {
      caseOfRightParenthesis = {
        stringHasValue: stringNumber.length > 0,
        shouldProceed: evalAnd(
          stack[stack.length - 1] !== "(",
          stack.length > 0
        ),
      };
      if (stringNumber.length > 0) {
        output.push(stringNumber);
        stringNumber = "";
      }
      while (stack[stack.length - 1] !== "(" && stack.length > 0) {
        output.push(stack.pop());
      }
      stack.pop();
      explanationsLog.push(
        {
          type: "Right parenthesis",
          case: caseOfRightParenthesis
        },
        
      );
    }

    iterateAndPushToArray(stringNumber, stringNumberIterations);
    iterateAndPushToArray(stack, stackIterations);
    iterateAndPushToArray(output, outputIterations);

    // console.log(`Stack for ${index} iteration:`,stack)
    // console.log(`Output for ${index} iteration:`,output)
  }
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

function evalOr(...statements) {
  const trueStatements = [];
  let value = false;
  for (let index = 0; index < statements.length; index++) {
    if (statements[index]) trueStatements.push(index);
  }
  if (trueStatements.length > 0) value = true;
  return { value, trueStatements };
}

function evalAnd(...statements) {
  const trueStatements = [];
  let value = false;
  for (let index = 0; index < statements.length; index++) {
    if (statements[index]) trueStatements.push(index);
  }
  if (trueStatements.length === statements.length) value = true;
  return { value, trueStatements };
}
