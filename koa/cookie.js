const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  if (ctx.url === '/index') {
    ctx.cookies.set('MyName', 'JSPang', {
      domain: '127.0.0.1',
      // 访问哪个路径才能读出cookie
      // path: '/index',
      // cookie最长有效时间
      maxAge: 1000 * 60 * 60,
      // 失效时间
      expires: new Date('2021-12-31'),
      // 只在http有效，其他无效
      httpOnly: false,
      // 是否允许重写，一般是false，因为重写有安全性
      overwrite: false
    })
    ctx.body = 'Cookie is ok'
  } else {
    if (ctx.cookies.get('MyName')) {
      ctx.body = ctx.cookies.get('MyName')
    } else {
      ctx.body = 'cookie is none'
    }
  }

})


app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000')
})