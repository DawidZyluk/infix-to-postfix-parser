export function iterateAndPushToArray(from, to) {
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

export function caseOfNegation(stringNumber, stack, precedence, char, index) {
  return {
    stringHasValue: stringNumber.length > 0,
    shouldProceed: evalOr(
      char === "-" && index === 0,
      stack[stack.length - 1] === "(" && char === "-",
      precedence.has(stack[stack.length - 1]) &&
        stringNumber.length === 0 &&
        char !== "("),
    isNegative: evalOr(!stringNumber.includes('-'))
  }
}


export function caseOfOperator(stringNumber, stack, precedence, char) {
  return {
    stringHasValue: stringNumber.length > 0,
    shouldProceed: evalAnd(
      stack[stack.length - 1] !== undefined,
      stack[stack.length - 1] !== "(",
      precedence.get(stack[stack.length - 1]) >= precedence.get(char)
    ),
  };
}

export function caseOfRightParenthesis(stringNumber, stack) {
  return {
    stringHasValue: stringNumber.length > 0,
    shouldProceed: evalAnd(stack[stack.length - 1] !== "(", stack.length > 0),
  };
}

export function caseOfOutputing(stringNumber, stack) {
  return {
    stringHasValue: stringNumber.length > 0,
    stackHasValue: stack.length > 0,
  };
}

export function evalOr(...statements) {
  const trueStatements = [];
  let value = false;
  for (let index = 0; index < statements.length; index++) {
    if (statements[index]) trueStatements.push(index);
  }
  if (trueStatements.length > 0) value = true;
  return { value, trueStatements };
}

export function evalAnd(...statements) {
  const trueStatements = [];
  let value = false;
  for (let index = 0; index < statements.length; index++) {
    if (statements[index]) trueStatements.push(index);
  }
  if (trueStatements.length === statements.length) value = true;
  return { value, trueStatements };
}
