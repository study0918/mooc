const Koa = require('koa');

const app = new Koa();

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
    let postData = await parsePostData(ctx)
    // 特殊字符将会被编码
    ctx.body = postData;
  } else {
    ctx.body = '<h1>404!</h1>'
  }
})

function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = "";
      // 有数据传入的时候
      ctx.req.addListener('data', (data) => {
        postdata += data;
      })
      ctx.req.on('end', function () {
        resolve(postdata)
      })
    } catch (error) {
      reject(error)
    }
  })
}
app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000')
})