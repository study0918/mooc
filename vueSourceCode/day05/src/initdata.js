// 响应式化的部分
let ARRAY_METHOD = [
  "push",
  "pop",
  "shift",
  "unshift",
  "reverse",
  "sort",
  "splice",
];

let array_methods = Object.create(Array.prototype);
