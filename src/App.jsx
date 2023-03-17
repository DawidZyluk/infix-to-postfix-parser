import { useState } from "react";
import "./App.css";
import CharactersArray from "./components/CharactersArray";
import Input from "./components/Input";
import Wrapper from "./components/Wrapper";
import Explanation from "./components/Explanation";
import { toInfix, toPostfix, calculatePostfix } from "./utils/parsingFunctions";

// CLEAN APP.JSX FILE
// ADD INPUT VALIDATION, CALCULATION EXPLANATION, OTHER OPERATORS AND FUNCTIONS
// ADD DIFFIRENT STYLES FOR CHARACTERS ARRAY EG. QUOTATIONS, ARRAY, TEXT
  
function App() {
  const [expression, setExpression] = useState("(-1+2)-(2*2)");
  const [showExplanation, setShowExplanation] = useState(false)

  const setExpressionHandler = (expression) => {
    setExpression(expression);
  }

  const postfixData = toPostfix(expression);
  
  return (
    <Wrapper>
      <Input onSetExpression={setExpressionHandler}/>
      <CharactersArray data={toInfix(expression)} name={"Infix array:"} />
      <CharactersArray data={postfixData.output} name={"Postfix array:"} /> 
      <div className="result">Answer: {calculatePostfix(postfixData.output)}</div>
      <button className="explanation-button" onClick={() => setShowExplanation(!showExplanation)}>{showExplanation ? "Close Explanation" : "Show Explanation"}</button>
      {showExplanation && <Explanation infix={expression} postfixData={postfixData} onClose={() => setShowExplanation(!showExplanation)}/> }
    </Wrapper>
  );
}

export default App;
