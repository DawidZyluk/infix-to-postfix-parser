import { useState } from "react";
import "./App.css";
import CharactersArray from "./components/CharactersArray";
import Input from "./components/Input";
import InfixArray from "./components/InfixArray";
import Wrapper from "./components/Wrapper";
import PostfixArray from "./components/PostfixArray";

function App() {
  const [expression, setExpression] = useState("");

  const setExpressionHandler = (expression) => {
    setExpression(expression);
  }

  return (
    <Wrapper>
      <Input onSetExpression={setExpressionHandler}/>
      <InfixArray expression={expression}/>
      <PostfixArray expression={expression}/>
    </Wrapper>
  );
}

export default App;
