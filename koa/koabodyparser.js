// 将post请求转换到request.body中
const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser')
app.use(bodyparser());

app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    // 显示表单页面
    let html = `
      <h1>JSPang Koa2 request POST</h1>
      <form method='POST' action='/'>
        <p>userName</p>
        <input name='userName'/><br/>
        <p>age</p>
        <input name='age'/><br/>
        <p>website</p>
        <input name='website'/><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html;
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let postData = ctx.request.body;
    // 特殊字符将会被编码
    ctx.body = postData;
  } else {
    ctx.body = '<h1>404!</h1>'
  }
})




app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000')
})