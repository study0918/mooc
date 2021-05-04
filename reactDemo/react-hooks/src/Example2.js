import React, { useState } from "react";

function Example2() {
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("男");
  const [work, setWork] = useState("前端程序员");
  return (
    <div>
      <p>JSPang今年:{age}岁</p>
      <p>性别:{sex}岁</p>
      <p>工作是:{work}岁</p>
    </div>
  );
}
export default Example2;
