const Koa = require('koa');

const app = new Koa();
app.use(async (ctx) => {
  // 得到url
  let url = ctx.url;
  // 浏览器发送的请求
  // 从request中接收Get请求
  let request = ctx.request;
  let req_query = request.query;
  let req_querystring = request.querystring;

  // 从上下文中直接获取Get请求
  // let ctx_query = ctx.query;
  // let ctx_querystring = ctx.querystring;
  // 打印到页面
  ctx.body = {
    url,
    req_query,
    req_querystring
    // ctx_query,
    // ctx_querystring
  }
})

// http://localhost:3000/?user=jspang&age=18
app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000')
})