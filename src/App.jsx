import { useState } from "react";
import "./App.css";
import CharactersArray from "./components/CharactersArray";
import Input from "./components/UI/Input";
import Wrapper from "./components/UI/Wrapper";
import { toInfix, toPostfix, calculatePostfix } from "./utils/parsingFunctions";
import PostfixArray from "./components/Postfix/PostfixArray";
import Answer from "./components/Answer/Answer";

function App() {
  const [expression, setExpression] = useState("sin(2)+1/3-ln(2)");
  const [isValid, setIsValid] = useState(true);

  const setExpressionHandler = (expression) => {
    setExpression(expression);
  };

  const setIsValidHandler = (value) => {
    setIsValid(value);
  };

  return (
    <Wrapper>
      <Input
        onSetExpression={setExpressionHandler}
        onSetValidity={setIsValidHandler}
      />
      {isValid ? (
        <>
          <div className="infix">
            <CharactersArray data={toInfix(expression)} name={"Infix array:"} />
          </div>
          <PostfixArray expression={expression} />
          <Answer expression={expression} />{" "}
        </>
      ) : (
        <h1>Invalid input</h1>
      )}
    </Wrapper>
  );
}

export default App;
