// 传参
const Koa = require('koa');
const Router = require('koa-router')

const app = new Koa();
const router = new Router();

router.get('/', function (ctx, next) {
  // ctx.body = '11111'
  ctx.body = ctx.query;
})

// 装载路由
app.use(router.routes())
  .use(router.allowedMethods());

// http://127.0.0.1:3000/?name=jspang&age=18
app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000')
})