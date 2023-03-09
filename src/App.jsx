import { useState } from "react";
import "./App.css";
import InfixArray from "./components/InfixArray";
import Input from "./components/Input";
import Wrapper from "./components/Wrapper";

function App() {
  const [expression, setExpression] = useState("");

  const setExpressionHandler = (expression) => {
    setExpression(expression);
  }

  return (
    <Wrapper>
      <Input onSetExpression={setExpressionHandler}/>
      <InfixArray expression={expression}/>
    </Wrapper>
  );
}

export default App;
