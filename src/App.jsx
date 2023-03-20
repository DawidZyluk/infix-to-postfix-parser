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
// CALCULATION EXPLANATION 
// OTHER OPERATORS AND FUNCTIONS
  
function App() {
  const [expression, setExpression] = useState("4+3+2+1");

  const setExpressionHandler = (expression) => {
    setExpression(expression);
  }
  
  return (
    <Wrapper>
      <Input onSetExpression={setExpressionHandler}/>
      <CharactersArray data={toInfix(expression)} name={"Infix array:"} />
      <PostfixArray expression={expression}/>
      <Answer expression={expression}/>    
    </Wrapper>
  );
}

export default App;
