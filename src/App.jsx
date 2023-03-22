import { useState } from "react";
import "./App.css";
import CharactersArray from "./components/CharactersArray";
import Input from "./components/UI/Input";
import Wrapper from "./components/UI/Wrapper";
import { toInfix, toPostfix, calculatePostfix } from "./utils/parsingFunctions";
import PostfixArray from "./components/Postfix/PostfixArray";
import Answer from "./components/Answer/Answer";

// TODO:
// INPUT VALIDATION
// OTHER OPERATORS AND FUNCTIONS
  
function App() {
  const [expression, setExpression] = useState("3*2-(2*-2)");
  const [isValid, setIsValid] = useState(true);

  const setExpressionHandler = (expression) => {
    setExpression(expression);
  }

  const setIsValidHandler = (value) => {
    setIsValid(value)
  }
  
  return (
    <Wrapper>
      <Input onSetExpression={setExpressionHandler} onSetValidity={setIsValidHandler}/>
      {isValid ? <><CharactersArray data={toInfix(expression)} name={"Infix array:"} />
      <PostfixArray expression={expression}/>
      <Answer expression={expression}/> </> : <h1>Invalid input</h1>}   
    </Wrapper>
  );
}

export default App;
