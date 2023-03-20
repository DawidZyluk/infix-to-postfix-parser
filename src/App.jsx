import { useState } from "react";
import "./App.css";
import CharactersArray from "./components/CharactersArray";
import Input from "./components/UI/Input";
import Wrapper from "./components/UI/Wrapper";
import { toInfix, toPostfix, calculatePostfix } from "./utils/parsingFunctions";
import PostfixArray from "./components/Postfix/PostfixArray";

// TODO:
// MAKE EXPLANATION A REUSABLE COMPONENT 
// MAKE EXPLANATION TEXT COMPONENT CUSTOM FOR EVERY TYPE OF EXPLANATION

// INPUT VALIDATION
// CALCULATION EXPLANATION 
// OTHER OPERATORS AND FUNCTIONS
  
function App() {
  const [expression, setExpression] = useState("(-1+2)-(2*2)");

  const setExpressionHandler = (expression) => {
    setExpression(expression);
  }
  const postfixData = toPostfix(expression);
  
  return (
    <Wrapper>
      <Input onSetExpression={setExpressionHandler}/>
      <CharactersArray data={toInfix(expression)} name={"Infix array:"} />
      <PostfixArray expression={expression}/>
      <div className="result">Answer: {calculatePostfix(postfixData.output)}</div>
      
    </Wrapper>
  );
}

export default App;
