const Koa = require('koa');
const Router = require('koa-router')

const app = new Koa();

// 子路由
let home = new Router();
home.get('/jspang', async (ctx) => {
  ctx.body = 'Home JSPang page';
}).get('/todo', async (ctx) => {
  ctx.body = 'Home toDo Page'
})

let page = new Router();
page.get('/jspang', async (ctx) => {
  ctx.body = 'Page JSPang page';
}).get('/todo', async (ctx) => {
  ctx.body = 'Page toDo Page'
})
// 父级路由
let router = new Router();
// 装载路由,使用中间件的形式
// http://localhost:3000/home/jspang
http: //localhost:3000/home/todo
  router.use('/home', home.routes(), home.allowedMethods())
// http://localhost:3000/home/jspang
router.use('/page', page.routes(), page.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())


app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000')
})