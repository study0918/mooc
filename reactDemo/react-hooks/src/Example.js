import React, { useState,useEffect } from "react";
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'

function Index() {
  useEffect(()=>{
    console.log('userEffect=>老弟，你来了！Index')
    //组件卸载时解绑
    // 有副作用，状态发生变化也会执行解绑函数，需要在useEffect中传入一个空数组可以解决
    return ()=>{
      console.log("老弟，你走了!Index")
    }
  },[])
  return <h2>JSPang.com</h2>
}

function List() {
  useEffect(()=>{
    console.log('userEffect=>老弟，你来了！List')
  })
  return <h2>List Page</h2>
}
function Example() {
  const [count, setCount] = useState(0);
  // useEffect是异步的
  useEffect(()=>{
    console.log(`useEffect=>You clicked ${count} times`)
    return () =>{
      console.log('============')
    }
  },[count])
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <Router>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/list/">列表</Link>
          </li>
        </ul>
        <Route path="/" exact component={Index}></Route>
        <Route path="/list/" component={List}></Route>
      </Router>
    </div>
  );
}
export default Example;
