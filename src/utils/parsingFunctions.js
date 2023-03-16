const precedence = new Map([
  ["+", 2],
  ["-", 2],
  ["/", 3],
  ["*", 3],
]);

const explanation = {
  digit:
    "If character is a digit append it to the strign number representation",
  negation:
    'If "-" appears at the beggining of the expression or "(" is at the top of the operator stack and the incoming character is "-" or incoming char is not "(" and any other operator is at the top of the operator stack then prepend "-" to the string number representatnion',
  operator:
    'If character is an operator check if string number representatnion holds any number. If it does push the number to the optput array and clear the string. Then while stack has any operators in it and "(" is not at the top of the stack and precedence of the operator at the top of the stack is greater than precedence of incominc operator push what\'s on the top of the stack to the output array. Then push the incoming operator to the operator stack',
  leftParenthesis:
    "If character is a left parenthesis then push it to the operator stack",
  rightParenthesis:
    'If character is a right parenthesis push string number to the output array then while character at the top of the stack is not "(" and stack is not empty push operator at the top of the stack to the output array then delete the left parenthesis',
  end: "The End",
};

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

    let whichCaseOfRightParenthesis;
    let whichCaseOfNegation;
    let whichCaseOfOperator;

    if (char >= "0" && char <= "9") {
      stringNumber += char;
      explanationsLog.push({ type: "Digit", text: explanation.digit });
    }
    if (
      (char === "-" && index === 0) ||
      (stack[stack.length - 1] === "(" && char === "-") ||
      (precedence.has(stack[stack.length - 1]) &&
        stringNumber.length === 0 &&
        char !== "(")
    ) {
      whichCaseOfNegation = evalOr(
        char === "-" && index === 0,
        stack[stack.length - 1] === "(" && char === "-",
        precedence.has(stack[stack.length - 1]) &&
          stringNumber.length === 0 &&
          char !== "("
      );
      stringNumber += "-";
      explanationsLog.push({ type: "Negation", text: explanation.negation });
    } else if (precedence.has(char)) {
      whichCaseOfOperator = {
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
      explanationsLog.push({ type: "Operator", text: explanation.operator });
    }
    if (char === "(") {
      stack.push(char);
      explanationsLog.push({
        type: "Left parenthesis",
        text: explanation.leftParenthesis,
      });
    }
    if (char === ")") {
      whichCaseOfRightParenthesis = {
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
      explanationsLog.push({
        type: "Right parenthesis",
        text: explanation.rightParenthesis,
      });
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
  explanationsLog.push({ type: "The End", text: explanation.end });

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
