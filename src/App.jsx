import { useState } from "react";
import "./App.css";
import CharactersArray from "./components/CharactersArray";
import Input from "./components/Input";
import Wrapper from "./components/Wrapper";
import { toInfix, toPostfix } from "./utils/parsingFunctions";

function App() {
  const [expression, setExpression] = useState("");

  const setExpressionHandler = (expression) => {
    setExpression(expression);
  }

  return (
    <Wrapper>
      <Input onSetExpression={setExpressionHandler}/>
      <CharactersArray data={toInfix(expression)} name={"Infix"} />;
      <CharactersArray data={toPostfix(expression)} name={"Postfix"} />;
    </Wrapper>
  );
}

export default App;
