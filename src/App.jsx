import { useState } from "react";
import "./App.css";
import CharactersArray from "./components/CharactersArray";
import Input from "./components/Input";
// import PostfixArray from "./components/PostfixArray";
import Wrapper from "./components/Wrapper";

function App() {
  const [expression, setExpression] = useState("");

  const setExpressionHandler = (expression) => {
    setExpression(expression);
  }

  return (
    <Wrapper>
      <Input onSetExpression={setExpressionHandler}/>
      <CharactersArray data={expression} name={"Infix"}/>
      {/* <PostfixArray expression={expression}/> */}
    </Wrapper>
  );
}

export default App;
