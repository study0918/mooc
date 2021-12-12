function getSomething() {
  return 'something'
}
async function testAsync() {
  return 'Hello async'
}

// await不仅可以接收promise对象
// await 也可以接收普通的返回值
// await 必须在async中
async function test() {
  const v1 = await getSomething()
  const v2 = await testAsync()
  console.log(v1, v2)
}
const result = testAsync();
console.log(result)