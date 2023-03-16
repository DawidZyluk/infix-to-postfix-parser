import { useState } from "react";
import "./App.css";
import CharactersArray from "./components/CharactersArray";
import Input from "./components/Input";
import Wrapper from "./components/Wrapper";
import Explanation from "./components/Explanation";
import { toInfix, toPostfix } from "./utils/parsingFunctions";

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
      <button className="explanation-button" onClick={() => setShowExplanation(!showExplanation)}>Show Explanation</button>
      {showExplanation ? <Explanation infix={expression} postfixData={postfixData}/> : null}
    </Wrapper>
  );
}

export default App;
