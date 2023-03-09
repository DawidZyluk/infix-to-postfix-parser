import { useState } from "react";
import "./App.css";
import CharactersArray from "./components/CharactersArray";
import Input from "./components/Input";
import InfixArray from "./components/InfixArray";
import Wrapper from "./components/Wrapper";

function App() {
  const [expression, setExpression] = useState("");

  const setExpressionHandler = (expression) => {
    setExpression(expression);
  }

  return (
    <Wrapper>
      <Input onSetExpression={setExpressionHandler}/>
      {/* <CharactersArray data={expression} name={"Characters"}/> */}
      <InfixArray expression={expression}/>
    </Wrapper>
  );
}

export default App;
