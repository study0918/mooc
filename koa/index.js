const Koa = require('koa');
const app = new Koa()
app.use(async (ctx) => {
  // ctx是Koa自带的一个对象
  ctx.body = 'Hello JSPang'
})

app.listen(3000)
console.log('app is starting at port 3000')