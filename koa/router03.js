const Koa = require('koa');
const Router = require('koa-router')

const app = new Koa();
const router = new Router({
  prefix: "/jspang"
});

// get接收 
router.get('/', (ctx, next) => {
  ctx.body = 'Hello JSpang';
}).get('/todo', (ctx, next) => {
  ctx.body = 'Todo page';
})

// 装载路由
// allowedMethods:就是当前接口运行的method。 比如，一个提供数据的接口，就可以设置为GET， 当客户端发送POST请求时，就会直接返回失败
// https://segmentfault.com/q/1010000008703786
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000')
})