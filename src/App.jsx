import { useState } from "react";
import "./App.css";
import CharactersArray from "./components/CharactersArray";
import Input from "./components/Input";
import Wrapper from "./components/Wrapper";
import Explanation from "./components/Explanation";
import { toInfix, toPostfix } from "./utils/parsingFunctions";

function App() {
  const [expression, setExpression] = useState("1+2*3-4");
  const [showExplanation, setShowExplanation] = useState(false)

  const setExpressionHandler = (expression) => {
    setExpression(expression);
  }

  return (
    <Wrapper>
      <Input onSetExpression={setExpressionHandler}/>
      <CharactersArray data={toInfix(expression)} name={"Infix"} />
      <CharactersArray data={toPostfix(expression)} name={"Postfix"} /> 
      <button className="explanation-button" onClick={() => setShowExplanation(!showExplanation)}>Show Explanation</button>
      {showExplanation ? <Explanation data={toInfix(expression)}/> : null}
    </Wrapper>
  );
}

export default App;
