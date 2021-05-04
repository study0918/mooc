import React, { useState,createContext,useContext } from "react";

const CountContext = createContext()

function Counter() {
    let count = useContext(CountContext)
    // console.log('count',count)
    return <h2>{count}</h2>
}
function Example4() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <CountContext.Provider value={count}>
        <Counter></Counter>
      </CountContext.Provider>
    </div>
  );
}
export default Example4;
